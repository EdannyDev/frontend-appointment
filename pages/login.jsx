import { useRouter } from "next/router";
import { logger } from "@/utils/logger";
import api from "@/lib/axiosInstance";
import { useState } from "react";
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
  ForgotLink,
} from "@/styles/login.styles";
import Modal from "@/components/modal";
import { Notification } from "@/components/notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEye, faEyeSlash, faLock } from "@fortawesome/free-solid-svg-icons";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reactivateModal, setReactivateModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    try {
      const res = await api.post("/auth/login", formData);
      if (res.data.success) {
        const me = await api.get("/auth/me");
        const role = me.data.data.role;
        Notification.success("Inicio de sesión exitoso");
        router.push(role === "ADMIN" ? "/dashboard" : "/home");
      }
    } catch (err) {
      logger.error("Error al iniciar sesión:", err);
      if (err.response?.data?.code === "ACCOUNT_DEACTIVATED") {
        setReactivateModal(true);
        setIsLoading(false);
        return;
      }
      Notification.error(err.response?.data?.message || "Error al iniciar sesión");
      setIsLoading(false);
    }
  };

  const handleReactivate = async () => {
    try {
      const res = await api.post("/auth/reactivate-account", formData);
      if (res.data.success) {
        const me = await api.get("/auth/me");
        const role = me.data.data.role;
        Notification.success("¡Cuenta reactivada! Bienvenido de nuevo");
        router.push(role === "ADMIN" ? "/dashboard" : "/home");
      }
    } catch (err) {
      logger.error("Error al reactivar la cuenta:", err);
      Notification.error(err.response?.data?.message || "Error al reactivar la cuenta");
    } finally {
      setReactivateModal(false);
      setIsLoading(false);
    }
  };

  return (
    <Page>
      <Card>
        <CardBody>
          <Header>
            <Title>Iniciar sesión</Title>
            <Subtitle>Nos alegra verte otra vez, ingresa tus datos para continuar.</Subtitle>
          </Header>

          <Form onSubmit={handleSubmit}>
            <FieldGroup>
              <Label htmlFor="email">Correo electrónico</Label>
              <Field>
                <IconWrapper><FontAwesomeIcon icon={faEnvelope} /></IconWrapper>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="tu@correo.com"
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
                  placeholder="Tu contraseña"
                  autoComplete="current-password"
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
            </FieldGroup>

            <ForgotLink
              type="button"
              onClick={() => !isLoading && router.push("/forgotPassword")}
            >
              ¿Olvidaste tu contraseña?
            </ForgotLink>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Procesando..." : "Ingresar"}
            </Button>
          </Form>

          <Footer>
            ¿No tienes cuenta?{" "}
            <LinkText onClick={() => !isLoading && router.push("/register")}>Regístrate</LinkText>
          </Footer>
        </CardBody>
      </Card>

      <Modal
        visible={reactivateModal}
        title="Cuenta desactivada"
        message="Tu cuenta está desactivada. Puedes reactivarla ahora mismo e iniciar sesión de nuevo. ¿Deseas continuar?"
        onConfirm={handleReactivate}
        onCancel={() => { setReactivateModal(false); setIsLoading(false); }}
      />
    </Page>
  );
}