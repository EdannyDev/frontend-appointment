import { useRouter } from "next/router";
import api from "@/lib/axiosInstance";
import { useState } from "react";
import {
  Page,
  Card,
  Header,
  Title,
  Subtitle,
  Form,
  FieldGroup,
  Label,
  Field,
  IconWrapper,
  Input,
  Button,
  Message,
  Footer,
  LinkText
} from "@/styles/login.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const res = await api.post("/auth/login", formData);

    if (res.data.success) {
      const me = await api.get("/auth/me");
      const role = me.data.data.role;

      if (role === "ADMIN") {
        router.push("/dashboard");
      } else {
        router.push("/home");
      }
    }
  } catch (err) {
    setError(err.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <Page>
      <Card>
        <Header>
          <Title>Iniciar sesión</Title>
          <Subtitle>
            Nos alegra verte otra vez, ingresa tus datos para continuar.
          </Subtitle>
        </Header>

        <Form onSubmit={handleSubmit}>
          <FieldGroup>
            <Label htmlFor="email">Correo electrónico</Label>
            <Field>
              <IconWrapper>
                <FontAwesomeIcon icon={faEnvelope} />
              </IconWrapper>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="ejemplo@correo.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Label htmlFor="password">Contraseña</Label>
            <Field>
              <IconWrapper>
                <FontAwesomeIcon icon={faLock} />
              </IconWrapper>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Tu contraseña"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Field>
          </FieldGroup>

          <Button type="submit">Ingresar</Button>

          {error && <Message type="error">{error}</Message>}
        </Form>

        <Footer>
          ¿No tienes cuenta?{" "}
          <LinkText onClick={() => router.push("/register")}>
            Regístrate
          </LinkText>
        </Footer>
      </Card>
    </Page>
  );
}