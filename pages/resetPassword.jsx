import { useState, useEffect } from "react";
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
  StrengthLabel,
  ErrorBox
} from "@/styles/resetPassword.styles";
import { Notification } from "@/components/notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEye, faEyeSlash, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getPasswordStrength, STRENGTH_LABELS, STRENGTH_COLORS } from "@/utils/passwordStrength";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { token } = router.query;
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);
  const strength = getPasswordStrength(newPassword);

  useEffect(() => {
    if (router.isReady && !token) {
      setTokenValid(false);
    }
  }, [router.isReady, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    if (!newPassword || !confirmPassword) {
      Notification.error("Todos los campos son obligatorios");
      return;
    }

    if (newPassword !== confirmPassword) {
      Notification.error("Las contraseñas no coinciden");
      return;
    }

    setIsLoading(true);
    try {
      await api.post("/auth/reset-password", { token, newPassword });
      Notification.success("Contraseña restablecida correctamente");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      logger.error("Error al restablecer la contraseña:", err);
      Notification.error(err.response?.data?.message || "No se pudo restablecer la contraseña");
      if (err.response?.status === 400) setTokenValid(false);
      setIsLoading(false);
    }
  };

  return (
    <Page>
      <Card>
        <CardBody>
          <Header>
            <Title>Nueva contraseña</Title>
            <Subtitle>
              {tokenValid
                ? "Elige una contraseña segura para tu cuenta."
                : "El enlace es inválido o ha expirado."}
            </Subtitle>
          </Header>

          {!tokenValid ? (
            <>
              <ErrorBox>
                Este enlace de restablecimiento ya no es válido. Puede que haya expirado
                (los enlaces duran 10 minutos) o ya fue utilizado.
              </ErrorBox>
              <Footer>
                <LinkText onClick={() => router.push("/forgotPassword")}>
                  Solicitar un nuevo enlace
                </LinkText>
              </Footer>
            </>
          ) : (
            <>
              <Form onSubmit={handleSubmit}>
                <FieldGroup>
                  <Label htmlFor="newPassword">Nueva contraseña</Label>
                  <Field>
                    <IconWrapper>
                      <FontAwesomeIcon icon={faLock} />
                    </IconWrapper>
                    <Input
                      id="newPassword"
                      type={showNew ? "text" : "password"}
                      placeholder="Ingresa tu nueva contraseña"
                      autoComplete="new-password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      disabled={isLoading}
                      required
                    />
                    <TogglePassword
                      type="button"
                      onClick={() => setShowNew((p) => !p)}
                      title={showNew ? "Ocultar" : "Mostrar"}
                      disabled={isLoading}
                    >
                      <FontAwesomeIcon icon={showNew ? faEye : faEyeSlash} />
                    </TogglePassword>
                  </Field>

                  {newPassword.length > 0 && (
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

                <FieldGroup>
                  <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                  <Field>
                    <IconWrapper>
                      <FontAwesomeIcon icon={faLock} />
                    </IconWrapper>
                    <Input
                      id="confirmPassword"
                      type={showConfirm ? "text" : "password"}
                      placeholder="Confirma la nueva contraseña"
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={isLoading}
                      required
                    />
                    <TogglePassword
                      type="button"
                      onClick={() => setShowConfirm((p) => !p)}
                      title={showConfirm ? "Ocultar" : "Mostrar"}
                      disabled={isLoading}
                    >
                      <FontAwesomeIcon icon={showConfirm ? faEye : faEyeSlash} />
                    </TogglePassword>
                  </Field>
                </FieldGroup>

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Procesando..." : "Restablecer contraseña"}
                </Button>
              </Form>

              <Footer>
                <LinkText onClick={() => router.push("/login")}>
                  <FontAwesomeIcon icon={faArrowLeft} /> Volver al inicio de sesión
                </LinkText>
              </Footer>
            </>
          )}
        </CardBody>
      </Card>
    </Page>
  );
}