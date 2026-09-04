import { withRetry } from "@/lib/withRetry";
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
  SuccessBox
} from "@/styles/forgotPassword.styles";
import { Notification } from "@/components/notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

// Página para solicitar el restablecimiento de contraseña
export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSlowLoading, setIsSlowLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    const slowTimer = setTimeout(() => setIsSlowLoading(true), 4000);

    try {
      await withRetry(() => api.post("/auth/forgot-password", { email }));
      setSent(true);
    } catch (err) {
      logger.error("Error al solicitar restablecimiento:", err);
      Notification.error(err.response?.data?.message || "Error al enviar el correo");
    } finally {
      clearTimeout(slowTimer);
      setIsSlowLoading(false);
      setIsLoading(false);
    }
  };

  return (
    <Page>
      <Card>
        <CardBody>
          <Header>
            <Title>¿Olvidaste tu contraseña?</Title>
            <Subtitle>
              {sent
                ? "Revisa tu correo electrónico."
                : "Ingresa tu correo y te enviaremos un enlace para restablecerla."}
            </Subtitle>
          </Header>

          {sent ? (
            <SuccessBox>
              <p>
                Si el correo <strong>{email}</strong> está registrado, recibirás
                un enlace para restablecer tu contraseña en los próximos minutos.
              </p>
              <p>El enlace expirará en <strong>10 minutos</strong>.</p>
            </SuccessBox>
          ) : (
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
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </Field>
              </FieldGroup>

              <Button type="submit" disabled={isLoading}>
                {isLoading
                  ? (isSlowLoading ? "Iniciando el servidor, esto puede tardar unos segundos..." : "Procesando...")
                  : "Enviar enlace"}
              </Button>
            </Form>
          )}

          <Footer>
            <LinkText onClick={() => router.push("/login")}>
              <FontAwesomeIcon icon={faArrowLeft} /> Volver al inicio de sesión
            </LinkText>
          </Footer>
        </CardBody>
      </Card>
    </Page>
  );
}