import { useEffect, useState, useMemo, useCallback } from "react";
import RescheduleModal from "@/components/modalReschedule";
import { STATUS_LABELS } from "@/utils/statusLabels";
import { useAuth } from "@/context/authContext";
import { logger } from "@/utils/logger";
import Modal from "@/components/modal";
import api from "@/lib/axiosInstance";
import {
  formatDuration,
  formatAppointmentStart,
  formatAppointmentDateTime,
  formatTodayHeader,
  formatTime12h
} from "@/utils/time";
import {
  Container,
  Grid,
  BookingActions,
  BookingCard,
  StatsCardWrapper,
  Card,
  Title,
  WelcomeSection,
  Greeting,
  TimeBadge,
  Hero,
  HeroInfo,
  HeroTitle,
  HeroDate,
  HeroStatus,
  RescheduleHeroButton,
  Row,
  Select,
  Input,
  SlotSection,
  SlotLabel,
  SlotsGrid,
  Slot,
  DurationText,
  DurationLeft,
  SelectedHour,
  EmptyState,
  DarkButton,
  StatGrid,
  StatCard,
  TipBox,
  AppointmentItem,
  AppointmentInfo,
  Status,
  RescheduleButton,
  CancelAppointment,
  CancelButton,
  CancelBooking
} from "@/styles/home.styles";
import {
  faClock,
  faCheckCircle,
  faFlagCheckered,
  faTimesCircle,
  faCalendarPlus,
  faChartPie,
  faLightbulb,
  faListCheck,
  faCalendarMinus,
  faCalendarXmark,
  faRotate,
  faCalendarDay,
  faCalendarDays,
  faCalendar
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "@/components/pagination";
import { Notification } from "@/components/notification";
import { useAvailableSlots } from "@/hooks/useAvailableSlots";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PAGE_SIZE = 5;

const STATUS_ICONS = {
  PENDING: faClock,
  CONFIRMED: faCheckCircle,
  COMPLETED: faFlagCheckered,
  CANCELLED: faTimesCircle
};

// Página principal del cliente para gestionar sus citas y ver el resumen de su actividad
export default function HomePage() {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [nextAppointment, setNextAppointment] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [historyPagination, setHistoryPagination] = useState({ totalPages: 1 });
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState({ serviceId: "", date: "", slot: "" });
  const [modal, setModal] = useState({ visible: false, message: "", action: null });
  const [rescheduleModal, setRescheduleModal] = useState({ visible: false, appointment: null });
  const [stats, setStats] = useState({ active: 0, completed: 0, cancelled: 0 });

  const { slots, isClosedDay, fetchSlots } = useAvailableSlots({
    serviceId: form.serviceId,
    date: form.date,
    enabled: true,
  });

  useEffect(() => {
    setForm((prev) =>
      prev.slot && !slots.includes(prev.slot) ? { ...prev, slot: "" } : prev
    );
  }, [slots]);

  const getGreeting = useCallback(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "¡Buenos días";
    if (hour < 19) return "¡Buenas tardes";
    return "¡Buenas noches";
  }, []);

  const loadServices = useCallback(async () => {
    try {
      const res = await api.get("/services");
      setServices(res.data.data);
    } catch (err) {
      logger.error("Error al cargar los servicios:", err);
      Notification.error(err.response?.data?.message || "Error al cargar los servicios");
    }
  }, []);

  const loadOverview = useCallback(async () => {
    try {
      const farFuture = new Date();
      farFuture.setFullYear(farFuture.getFullYear() + 2);
      const farPast = new Date();
      farPast.setFullYear(farPast.getFullYear() - 2);

      const res = await api.get("/appointments/my", {
        params: {
          start: farPast.toISOString().slice(0, 10),
          end: farFuture.toISOString().slice(0, 10),
        },
      });

      const all = res.data.data || [];
      const now = new Date();

      const next = all
        .filter((a) => ["PENDING", "CONFIRMED"].includes(a.status) && new Date(a.start) > now)
        .sort((a, b) => new Date(a.start) - new Date(b.start))[0] || null;

      setNextAppointment(next);
      setStats({
        active: all.filter((a) => !["CANCELLED", "COMPLETED"].includes(a.status)).length,
        completed: all.filter((a) => a.status === "COMPLETED").length,
        cancelled: all.filter((a) => a.status === "CANCELLED").length,
      });
    } catch (err) {
      logger.error("Error al cargar el resumen de citas:", err);
      Notification.error(err.response?.data?.message || "Error al cargar el resumen de citas");
    }
  }, []);

  const loadHistory = useCallback(async () => {
    try {
      const res = await api.get("/appointments/my", {
        params: { page: currentPage, limit: PAGE_SIZE },
      });
      setAppointments(res.data.data || []);
      setHistoryPagination(res.data.pagination || { totalPages: 1 });
    } catch (err) {
      logger.error("Error al cargar el historial de citas:", err);
      Notification.error(err.response?.data?.message || "Error al cargar el historial de citas");
    }
  }, [currentPage]);

  useEffect(() => {
    loadServices();
    loadOverview();
  }, [loadServices, loadOverview]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const refreshAll = useCallback(() => {
    loadOverview();
    loadHistory();
  }, [loadOverview, loadHistory]);

  const handleDateChange = (e) => {
    const selected = e.target.value;
    if (isClosedDay(selected)) {
      Notification.error("El negocio no atiende ese día. Por favor elige otra fecha.");
      return;
    }
    setForm({ ...form, date: selected, slot: "" });
  };

  const selectedService = useMemo(
    () => services.find((s) => String(s.id) === String(form.serviceId)),
    [services, form.serviceId]
  );

  const handleCreateAppointment = async () => {
    if (!form.slot || isCreating) return;
    setIsCreating(true);
    try {
      await api.post("/appointments", {
        service_id: form.serviceId,
        date: form.date,
        start_time: form.slot,
      });
      Notification.success("Cita agendada correctamente");
      setForm({ serviceId: "", date: "", slot: "" });
      setCurrentPage(1);
      refreshAll();
    } catch (err) {
      logger.error("Error al agendar la cita:", err);
      Notification.error(err.response?.data?.message || "No se pudo agendar la cita");
      fetchSlots();
    } finally {
      setIsCreating(false);
    }
  };

  const resetBookingForm = () => {
    setForm({ serviceId: "", date: "", slot: "" });
  };

  const handleCancelAppointment = (appointment) => {
    setModal({
      visible: true,
      message: "¿Deseas cancelar tu cita? Recuerda hacerlo con 12 horas de anticipación.",
      action: async () => {
        try {
          await api.put(`/appointments/${appointment.id}/cancel`);
          Notification.success("Cita cancelada correctamente");
          refreshAll();
        } catch (err) {
          logger.error("Error al cancelar la cita:", err);
          Notification.error(err.response?.data?.message || "Error al cancelar la cita");
        } finally {
          setModal((prev) => ({ ...prev, visible: false }));
        }
      },
    });
  };

  const isServiceAvailable = useCallback(
    (serviceId) => services.some((s) => s.id === serviceId),
    [services]
  );

  return (
    <Container>
      <WelcomeSection>
        <Greeting>
          {user ? `${getGreeting()}, ${user.name.split(" ")[0]}!` : "¡Bienvenido!"}
          <span>
            {nextAppointment
              ? "Tienes compromisos próximos en tu agenda."
              : "No tienes citas pendientes por ahora."}
          </span>
        </Greeting>
        <TimeBadge>
          <FontAwesomeIcon icon={faCalendarDays} />
          {formatTodayHeader()}
        </TimeBadge>
      </WelcomeSection>

      {nextAppointment && (
        <Hero>
          <HeroInfo>
            <div>
              <span>PRÓXIMA CITA</span>
              <HeroTitle>{nextAppointment.service_name}</HeroTitle>
              <HeroDate>
                <FontAwesomeIcon icon={faCalendarDay} />
                {formatAppointmentStart(nextAppointment.start)}
              </HeroDate>
            </div>
            <HeroStatus status={nextAppointment.status}>
              <FontAwesomeIcon icon={STATUS_ICONS[nextAppointment.status]} />
              {STATUS_LABELS[nextAppointment.status]}
            </HeroStatus>
          </HeroInfo>

          <Row>
            {nextAppointment.canModify && (
              <>
                {isServiceAvailable(nextAppointment.service_id) && (
                  <RescheduleHeroButton
                    onClick={() => setRescheduleModal({ visible: true, appointment: nextAppointment })}
                  >
                    Reprogramar
                  </RescheduleHeroButton>
                )}
                <CancelButton onClick={() => handleCancelAppointment(nextAppointment)}>
                  Cancelar
                </CancelButton>
              </>
            )}
          </Row>
        </Hero>
      )}

      <Grid>
        <BookingCard>
          <Title color="booking">
            <FontAwesomeIcon icon={faCalendarPlus} /> Agendar nueva cita
          </Title>
          <Row>
            <Select
              value={form.serviceId}
              onChange={(e) => setForm({ ...form, serviceId: e.target.value, slot: "" })}
            >
              <option value="">Selecciona un servicio</option>
              {services.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </Select>
            <Input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={form.date}
              onChange={handleDateChange}
            />
          </Row>

          {selectedService && (
            <DurationText>
              <DurationLeft>
                <FontAwesomeIcon icon={faClock} />
                Duración: <strong>{formatDuration(selectedService.duration)}</strong>
              </DurationLeft>
              {form.slot && <SelectedHour>{formatTime12h(form.slot)}</SelectedHour>}
            </DurationText>
          )}

          {form.date && (
            <SlotSection>
              <SlotLabel>Horarios disponibles:</SlotLabel>
              {slots.length === 0 ? (
                <EmptyState>No hay horarios disponibles para este día</EmptyState>
              ) : (
                <SlotsGrid>
                  {slots.map((s) => (
                    <Slot
                      key={s}
                      selected={form.slot === s}
                      onClick={() => setForm({ ...form, slot: s })}
                    >
                      {s}
                    </Slot>
                  ))}
                </SlotsGrid>
              )}
            </SlotSection>
          )}

          <BookingActions>
            <DarkButton disabled={!form.slot || isCreating} onClick={handleCreateAppointment}>
              {isCreating ? "Procesando..." : "Confirmar reservación"}
            </DarkButton>
            {(form.serviceId || form.date || form.slot) && (
              <CancelBooking type="button" onClick={resetBookingForm}>
                Cancelar reservación
              </CancelBooking>
            )}
          </BookingActions>
        </BookingCard>

        <StatsCardWrapper>
          <Title>
            <FontAwesomeIcon icon={faChartPie} /> Resumen de citas
          </Title>
          <StatGrid>
            <StatCard type="active">
              <strong>{stats.active}</strong>
              <div>Agendadas</div>
            </StatCard>
            <StatCard type="completed">
              <strong>{stats.completed}</strong>
              <div>Completadas</div>
            </StatCard>
            <StatCard type="cancelled">
              <strong>{stats.cancelled}</strong>
              <div>Canceladas</div>
            </StatCard>
          </StatGrid>
          <TipBox>
            <FontAwesomeIcon icon={faLightbulb} />
            <span><strong>Tip:</strong> Solo tienes 12 horas de anticipación para cancelar una cita</span>
          </TipBox>
        </StatsCardWrapper>
      </Grid>

      <Card>
        <Title>
          <FontAwesomeIcon icon={faListCheck} /> Historial de citas
        </Title>
        {appointments.length === 0 ? (
          <EmptyState>
            <FontAwesomeIcon icon={faCalendarMinus} />
            No hay citas registradas
          </EmptyState>
        ) : (
          <>
            {appointments.map((a) => (
              <AppointmentItem key={a.id} status={a.status} canModify={a.canModify}>
                <AppointmentInfo>
                  <strong>{a.service_name}</strong>
                  <div>
                    <FontAwesomeIcon icon={faCalendar} />
                    {formatAppointmentDateTime(
                      a.date,
                      a.start_time,
                      a.end_time
                    )}
                  </div>
                </AppointmentInfo>
                <Row>
                  <Status status={a.status}>
                    <FontAwesomeIcon icon={STATUS_ICONS[a.status]} />
                    {STATUS_LABELS[a.status]}
                  </Status>
                  {a.canModify && (
                    <>
                      {isServiceAvailable(a.service_id) && (
                        <RescheduleButton
                          onClick={() => setRescheduleModal({ visible: true, appointment: a })}
                        >
                          <FontAwesomeIcon icon={faRotate} />
                          Reprogramar
                        </RescheduleButton>
                      )}
                      <CancelAppointment onClick={() => handleCancelAppointment(a)}>
                        <FontAwesomeIcon icon={faCalendarXmark} /> Cancelar
                      </CancelAppointment>
                    </>
                  )}
                </Row>
              </AppointmentItem>
            ))}
            <Pagination
              totalPages={historyPagination.totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </Card>

      <Modal
        visible={modal.visible}
        message={modal.message}
        onConfirm={modal.action}
        onCancel={() => setModal((prev) => ({ ...prev, visible: false }))}
      />

      <RescheduleModal
        visible={rescheduleModal.visible}
        appointment={rescheduleModal.appointment}
        onClose={() => setRescheduleModal({ visible: false, appointment: null })}
        onSuccess={refreshAll}
      />
    </Container>
  );
}