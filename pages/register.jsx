import { useState, useMemo } from "react";
import { useRouter } from "next/router";
import { logger } from "@/utils/logger";
import api from "@/lib/axiosInstance";
import {
  Page,
  Card,
  CardBody,
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
  Footer,
  LinkText,
  TogglePassword,
  StrengthBar,
  StrengthSegment,
  StrengthLabel
} from "@/styles/register.styles";
import { Notification } from "@/components/notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getPasswordStrength, STRENGTH_LABELS, STRENGTH_COLORS } from "@/utils/passwordStrength";
import { faUser, faEnvelope, faLock, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const strength = useMemo(() => getPasswordStrength(formData.password), [formData.password]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    try {
      const res = await api.post("/auth/register", formData);
      if (res.data.success) {
        Notification.success("Cuenta creada correctamente. Redirigendo...");
        setTimeout(() => router.push("/login"), 2000);
      }
    } catch (err) {
      logger.error("Error al registrar el usuario:", err);
      Notification.error(err.response?.data?.message || "Error al registrar el usuario");
      setIsLoading(false);
    }
  };

  return (
    <Page>
      <Card>
        <CardBody>
          <Header>
            <Title>Crear cuenta</Title>
            <Subtitle>¿Primera vez aquí? Regístrate para gestionar tus citas de forma sencilla.</Subtitle>
          </Header>

          <Form onSubmit={handleSubmit}>
            <FieldGroup>
              <Label htmlFor="name">Nombre</Label>
              <Field>
                <IconWrapper><FontAwesomeIcon icon={faUser} /></IconWrapper>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Tu nombre completo"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </Field>
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="email">Correo electrónico</Label>
              <Field>
                <IconWrapper><FontAwesomeIcon icon={faEnvelope} /></IconWrapper>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="ejemplo@correo.com"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </Field>
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="password">Contraseña</Label>
              <Field>
                <IconWrapper><FontAwesomeIcon icon={faLock} /></IconWrapper>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Ingresa una contraseña segura"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
                <TogglePassword
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  disabled={isLoading}
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </TogglePassword>
              </Field>

              {formData.password.length > 0 && (
                <>
                  <StrengthBar>
                    {[1, 2, 3, 4].map((i) => (
                      <StrengthSegment
                        key={i}
                        active={i <= strength}
                        color={STRENGTH_COLORS[strength]}
                      />
                    ))}
                  </StrengthBar>
                  <StrengthLabel color={STRENGTH_COLORS[strength]}>
                    {STRENGTH_LABELS[strength]}
                  </StrengthLabel>
                </>
              )}
            </FieldGroup>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Procesando..." : "Registrarse"}
            </Button>
          </Form>

          <Footer>
            ¿Ya tienes cuenta?{" "}
            <LinkText onClick={() => !isLoading && router.push("/login")}>Inicia sesión</LinkText>
          </Footer>
        </CardBody>
      </Card>
    </Page>
  );
}