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
} from "@/styles/register.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    name: "",
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
    setSuccess("");

    try {
      const res = await api.post("/auth/register", formData);

      if (res.data.success) {
        setSuccess("Cuenta creada correctamente. Redirigiendo...");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Error al registrar el usuario"
      );
    }
  };

  return (
    <Page>
      <Card>
        <Header>
          <Title>Crear cuenta</Title>
          <Subtitle>
            ¿Primera vez aquí? Regístrate para gestionar tus citas de forma sencilla.
          </Subtitle>
        </Header>

        <Form onSubmit={handleSubmit}>
          <FieldGroup>
            <Label htmlFor="name">Nombre</Label>
            <Field>
              <IconWrapper>
                <FontAwesomeIcon icon={faUser} />
              </IconWrapper>
              <Input
                id="name"
                type="text"
                name="name"
                placeholder="Tu nombre completo"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Field>
          </FieldGroup>

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
                placeholder="Mínimo 8 caracteres"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Field>
          </FieldGroup>

          <Button type="submit">Registrarse</Button>

          {error && <Message type="error">{error}</Message>}
          {success && <Message type="success">{success}</Message>}
        </Form>

        <Footer>
          ¿Ya tienes cuenta?{" "}
          <LinkText onClick={() => router.push("/login")}>
            Inicia sesión
          </LinkText>
        </Footer>
      </Card>
    </Page>
  );
}