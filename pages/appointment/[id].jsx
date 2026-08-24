import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { logger } from "@/utils/logger";
import Modal from "@/components/modal";
import api from "@/lib/axiosInstance";
import {
  faCalendarCheck,
  faClock,
  faFileLines,
  faChevronLeft,
  faCircleInfo,
  faCalendarXmark,
  faCalendarDay,
} from "@fortawesome/free-solid-svg-icons";
import {
  DetailsWrapper,
  HeaderSection,
  BackButton,
  TitleRow,
  MainTitle,
  StatusTag,
  ContentGrid,
  CardsContainer,
  InfoCard,
  CardHeader,
  DataRow,
  Label,
  Value,
  ActionSidebar,
  SidebarTitle,
  PrimaryAction,
  SecondaryAction,
  PolicyBox
} from "@/styles/appointmentDetails.styles";
import { Notification } from "@/components/notification";
import RescheduleModal from "@/components/modalReschedule";
import { formatDateLong, formatTime12h } from "@/utils/time";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const STATUS_MAP = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmada",
  COMPLETED: "Completada",
  CANCELLED: "Cancelada"
};

const BLOCKED_STATUS = ["CANCELLED", "COMPLETED"];

export default function AppointmentDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [appointment, setAppointment] = useState(null);
  const [isServiceActive, setIsServiceActive] = useState(true);
  const [cancelModal, setCancelModal] = useState(false);
  const [rescheduleModal, setRescheduleModal] = useState(false);

  const fetchDetail = useCallback(async () => {
    if (!id) return;
    try {
      const { data: resApp } = await api.get(`/appointments/${id}`);
      setAppointment(resApp.data);
      const { data: resServ } = await api.get("/services");
      const active = resServ.data.some((s) => s.id === resApp.data.service_id);
      setIsServiceActive(active);
    } catch (err) {
      logger.error("Error al cargar el detalle de la cita:", err);
      Notification.error(err.response?.data?.message || "No se pudo cargar la información de la cita");
      router.push("/calendar");
    }
  }, [id, router]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  const handleCancel = async () => {
    try {
      await api.put(`/appointments/${id}/cancel`);
      Notification.success("Tu cita ha sido cancelada correctamente");
      setCancelModal(false);
      fetchDetail();
    } catch (err) {
      logger.error("Error al cancelar la cita:", err);
      Notification.error(err.response?.data?.message || "Error al procesar la cancelación");
    }
  };

  if (!appointment) return null;

  return (
    <DetailsWrapper>
      <HeaderSection>
        <BackButton onClick={() => router.push("/calendar")}>
          <FontAwesomeIcon icon={faChevronLeft} /> Regresar al calendario
        </BackButton>
        <TitleRow>
          <MainTitle>
            {BLOCKED_STATUS.includes(appointment.status) ? "Detalle de Cita" : "Gestionar Cita"}
          </MainTitle>
          <StatusTag status={appointment.status}>
            {STATUS_MAP[appointment.status] || appointment.status}
          </StatusTag>
        </TitleRow>
      </HeaderSection>

      <ContentGrid>
        <CardsContainer>
          <InfoCard>
            <CardHeader>
              <FontAwesomeIcon icon={faFileLines} /> Detalles del servicio
            </CardHeader>
            <DataRow>
              <Label>Servicio seleccionado:</Label>
              <Value>{appointment.service_name}</Value>
            </DataRow>
            <DataRow>
              <Label>Descripción:</Label>
              <Value>{appointment.service_description}</Value>
            </DataRow>
            <DataRow>
              <Label>Tiempo estimado:</Label>
              <Value>{appointment.duration} minutos</Value>
            </DataRow>
            <DataRow>
              <Label>Precio del servicio:</Label>
              <Value highlight>${appointment.price}</Value>
            </DataRow>
          </InfoCard>

          <InfoCard>
            <CardHeader>
              <FontAwesomeIcon icon={faCalendarCheck} /> Horario agendado
            </CardHeader>
            <DataRow>
              <Label>Fecha reservada:</Label>
              <Value>{formatDateLong(appointment.date)}</Value>
            </DataRow>
            <DataRow>
              <Label>Hora asignada:</Label>
              <Value>
                <FontAwesomeIcon icon={faClock} />
                &nbsp;{formatTime12h(appointment.start_time)} – {formatTime12h(appointment.end_time)}
              </Value>
            </DataRow>
          </InfoCard>
        </CardsContainer>

        <ActionSidebar>
          <SidebarTitle>
            {BLOCKED_STATUS.includes(appointment.status)
              ? "No se permiten cambios"
              : "¿Necesitas un cambio?"}
          </SidebarTitle>

          {appointment.canModify && (
            <>
              {isServiceActive && (
                <PrimaryAction onClick={() => setRescheduleModal(true)}>
                  <FontAwesomeIcon icon={faCalendarDay} /> Reprogramar cita
                </PrimaryAction>
              )}
              <SecondaryAction onClick={() => setCancelModal(true)}>
                <FontAwesomeIcon icon={faCalendarXmark} /> Cancelar cita
              </SecondaryAction>
            </>
          )}

          {(!appointment.canModify || !isServiceActive) && (
            <PolicyBox>
              <FontAwesomeIcon icon={faCircleInfo} />
              <span>
                {BLOCKED_STATUS.includes(appointment.status)
                  ? "La cita fue completada o cancelada. No se permiten cambios."
                  : !isServiceActive
                    ? "El servicio no está disponible. Puedes mantener tu cita o cancelarla."
                    : "Solo puedes reprogramar o cancelar tu cita con 12 horas de anticipación."}
              </span>
            </PolicyBox>
          )}
        </ActionSidebar>
      </ContentGrid>

      <Modal
        visible={cancelModal}
        message="¿Deseas cancelar tu cita? Esta acción no se puede deshacer."
        onConfirm={handleCancel}
        onCancel={() => setCancelModal(false)}
      />

      <RescheduleModal
        visible={rescheduleModal}
        appointment={appointment}
        onClose={() => setRescheduleModal(false)}
        onSuccess={() => {
          fetchDetail();
          Notification.success("¡Tu cita se ha reprogramado con éxito!");
        }}
      />
    </DetailsWrapper>
  );
}