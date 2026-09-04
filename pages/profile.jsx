import { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/router";
import { logger } from "@/utils/logger";
import Modal from "@/components/modal";
import api from "@/lib/axiosInstance";
import {
  Page,
  PageHeader,
  PageTitle,
  PageSubtitle,
  Divider,
  Section,
  SectionHead,
  SectionTitle,
  AccountBlock,
  Avatar,
  AccountInfo,
  AccountName,
  AccountEmail,
  FieldGroup,
  Label,
  FieldWrap,
  FieldIcon,
  Input,
  ToggleBtn,
  SaveButton,
  StrengthBar,
  StrengthSegment,
  StrengthLabel,
  DangerSection,
  DangerDesc,
  DangerButton
} from "@/styles/profile.styles";
import {
  faUser,
  faEnvelope,
  faLock,
  faTriangleExclamation,
  faEye,
  faEyeSlash,
  faFloppyDisk,
  faArrowsRotate,
  faAddressCard,
  faUserShield,
  faUserXmark
} from "@fortawesome/free-solid-svg-icons";
import { Notification } from "@/components/notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getPasswordStrength, exceedsMaxPasswordLength, STRENGTH_LABELS, STRENGTH_COLORS } from "@/utils/passwordStrength";

const getInitials = (name = "") =>
  name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

// Página para que el usuario pueda gestionar su perfil, cambiar su contraseña y desactivar su cuenta
export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, fetchUser } = useAuth();
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deactivateModal, setDeactivateModal] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const profileChanged = useMemo(() => {
    if (name === null || email === null || !user) return false;
      const trimmedName = name.trim();
      const trimmedEmail = email.trim();
      const nameChanged = trimmedName !== "" && trimmedName !== (user.name || "");
      const emailChanged = trimmedEmail !== "" && trimmedEmail !== (user.email || "");
    return nameChanged || emailChanged;
  }, [name, email, user]);

  const strength = useMemo(() => getPasswordStrength(newPassword), [newPassword]);

  const handleUpdateProfile = useCallback(
    async (e) => {
      e.preventDefault();
      if (!profileChanged || isSavingProfile) return;
      setIsSavingProfile(true);
      try {
        await api.patch("/auth/profile", { name: (name ?? "").trim(), email: (email ?? "").trim() });
        Notification.success("Perfil actualizado correctamente");
        await fetchUser();
      } catch (err) {
        logger.error("Error al actualizar el perfil:", err);
        Notification.error(err.response?.data?.message || "Error al actualizar el perfil");
      } finally {
        setIsSavingProfile(false);
      }
    },
    [name, email, profileChanged, fetchUser]
  );

  const handleChangePassword = useCallback(
    async (e) => {
      e.preventDefault();
      if (!currentPassword || !newPassword || !confirmPassword) {
        Notification.error("Todos los campos de contraseña son obligatorios");
        return;
      }
      if (newPassword !== confirmPassword) {
        Notification.error("Las contraseñas nuevas no coinciden");
        return;
      }
      if (newPassword === currentPassword) {
        Notification.error("La nueva contraseña debe ser diferente a la actual");
        return;
      }
      setIsSavingPassword(true);
      try {
        await api.patch("/auth/profile/password", { currentPassword, newPassword });
        Notification.success("Contraseña actualizada. Por seguridad, vuelve a iniciar sesión.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        await logout();
        router.push("/login");
      } catch (err) {
        logger.error("Error al cambiar la contraseña:", err);
        Notification.error(err.response?.data?.message || "Error al cambiar la contraseña");
        setIsSavingPassword(false);
      }
    },
    [currentPassword, newPassword, confirmPassword, logout, router]
  );

  const handleDeactivate = useCallback(async () => {
    setIsDeactivating(true);
    try {
      await api.delete("/auth/deactivate-account");
      Notification.success("Cuenta desactivada correctamente");
      await logout();
      router.push("/login");
    } catch (err) {
      logger.error("Error al desactivar la cuenta:", err);
      Notification.error(err.response?.data?.message || "Error al desactivar la cuenta");
      setIsDeactivating(false);
    }
    setDeactivateModal(false);
  }, [logout, router]);

  return (
    <Page>
      <PageHeader>
        <PageTitle>Configuración de perfil</PageTitle>
        <PageSubtitle>Gestiona tu perfil de manera sencilla. Si deseas desactivar tu cuenta, piénsalo cuidadosamente.</PageSubtitle>
      </PageHeader>

      <Divider />

      <Section>
        <SectionHead>
          <FontAwesomeIcon icon={faAddressCard} />
          <SectionTitle>Información de la cuenta</SectionTitle>
        </SectionHead>

        <AccountBlock>
          <Avatar>{getInitials(user?.name)}</Avatar>
          <AccountInfo>
            <AccountName>{user?.name}</AccountName>
            <AccountEmail>{user?.email}</AccountEmail>
          </AccountInfo>
        </AccountBlock>

        <form onSubmit={handleUpdateProfile}>
          <FieldGroup>
            <Label htmlFor="name">Nombre</Label>
            <FieldWrap>
              <FieldIcon>
                <FontAwesomeIcon icon={faUser} />
              </FieldIcon>
              <Input
                id="name"
                type="text"
                value={name ?? ""}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre completo"
                disabled={isSavingProfile}
              />
            </FieldWrap>
          </FieldGroup>

          <FieldGroup>
            <Label htmlFor="email">Correo electrónico</Label>
            <FieldWrap>
              <FieldIcon>
                <FontAwesomeIcon icon={faEnvelope} />
              </FieldIcon>
              <Input
                id="email"
                type="email"
                value={email ?? ""}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@correo.com"
                disabled={isSavingProfile}
              />
            </FieldWrap>
          </FieldGroup>

          <SaveButton
            type="submit"
            disabled={isSavingProfile || !profileChanged}
            title={!profileChanged ? "No hay cambios para guardar" : undefined}
          >
            <FontAwesomeIcon icon={faFloppyDisk} />
            {isSavingProfile ? "Procesando..." : profileChanged ? "Guardar cambios" : "Sin cambios"}
          </SaveButton>
        </form>
      </Section>

      <Divider />

      <Section>
        <SectionHead>
          <FontAwesomeIcon icon={faUserShield} />
          <SectionTitle>Cambiar contraseña</SectionTitle>
        </SectionHead>

        <form onSubmit={handleChangePassword}>
          <FieldGroup>
            <Label htmlFor="currentPassword">Contraseña actual</Label>
            <FieldWrap>
              <FieldIcon>
                <FontAwesomeIcon icon={faLock} />
              </FieldIcon>
              <Input
                id="currentPassword"
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Tu contraseña actual"
                disabled={isSavingPassword}
              />
              <ToggleBtn
                type="button"
                onClick={() => setShowCurrent((p) => !p)}
                title={showCurrent ? "Ocultar" : "Mostrar"}
              >
                <FontAwesomeIcon icon={showCurrent ? faEye : faEyeSlash} />
              </ToggleBtn>
            </FieldWrap>
          </FieldGroup>

          <FieldGroup>
            <Label htmlFor="newPassword">Nueva contraseña</Label>
            <FieldWrap>
              <FieldIcon>
                <FontAwesomeIcon icon={faLock} />
              </FieldIcon>
              <Input
                id="newPassword"
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Ingresa la nueva contraseña"
                disabled={isSavingPassword}
              />
              <ToggleBtn
                type="button"
                onClick={() => setShowNew((p) => !p)}
                title={showNew ? "Ocultar" : "Mostrar"}
              >
                <FontAwesomeIcon icon={showNew ? faEye : faEyeSlash} />
              </ToggleBtn>
            </FieldWrap>

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
                  {exceedsMaxPasswordLength(newPassword)
                    ? "La contraseña no puede superar los 72 caracteres"
                    : STRENGTH_LABELS[strength]}
                </StrengthLabel>
              </>
            )}
          </FieldGroup>

          <FieldGroup>
            <Label htmlFor="confirmPassword">Confirmar nueva contraseña</Label>
            <FieldWrap>
              <FieldIcon>
                <FontAwesomeIcon icon={faLock} />
              </FieldIcon>
              <Input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirma la nueva contraseña"
                disabled={isSavingPassword}
              />
              <ToggleBtn
                type="button"
                onClick={() => setShowConfirm((p) => !p)}
                title={showConfirm ? "Ocultar" : "Mostrar"}
              >
                <FontAwesomeIcon icon={showConfirm ? faEye : faEyeSlash} />
              </ToggleBtn>
            </FieldWrap>
          </FieldGroup>

          <SaveButton type="submit" disabled={isSavingPassword}>
            <FontAwesomeIcon icon={faArrowsRotate} />
            {isSavingPassword ? "Procesando..." : "Actualizar contraseña"}
          </SaveButton>
        </form>
      </Section>

      <Divider />

      <DangerSection>
        <SectionHead danger>
          <FontAwesomeIcon icon={faTriangleExclamation} />
          <SectionTitle danger>Zona de peligro</SectionTitle>
        </SectionHead>
        <DangerDesc>
          <span>
            Al desactivar tu cuenta, perderás acceso a todos tus datos. 
            Para reactivarla, inicia sesión validando tus credenciales. 
          </span>
        </DangerDesc>
        <DangerButton
          type="button"
          onClick={() => setDeactivateModal(true)}
          disabled={isDeactivating}
        >
          <FontAwesomeIcon icon={faUserXmark} />
          {isDeactivating ? "Procesando..." : "Desactivar cuenta"}
        </DangerButton>
      </DangerSection>

      <Modal
        visible={deactivateModal}
        title="Desactivando cuenta"
        message="¿Deseas desactivar tu cuenta? Piénsalo dos veces antes de continuar."
        onConfirm={handleDeactivate}
        onCancel={() => setDeactivateModal(false)}
      />
    </Page>
  );
}