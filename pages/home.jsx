import { useEffect, useState, useMemo } from "react";
import api from "@/lib/axiosInstance";
import {
  Page,
  Section,
  Title,
  Select,
  Input,
  Slots,
  SlotButton,
  Button,
  Appointments,
  AppointmentCard,
  CancelButton,
  Divider,
  EmptyState,
  NextAppointmentCard,
  StatusBadge
} from "@/styles/home.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faClock, faBriefcase, faXmark, faStar } from "@fortawesome/free-solid-svg-icons";

const capitalize = (text) =>
  text.charAt(0).toUpperCase() + text.slice(1);

const formatDate = (dateString) => {
  const date = new Date(dateString);

  const formatted = date.toLocaleDateString("es-MX", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return capitalize(formatted.replace(",", ""));
};

const formatTime12h = (time) => {
  const [h, m] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(h, m, 0, 0);

  return date.toLocaleTimeString("es-MX", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const formatTimeRange = (start, end) =>
  `${formatTime12h(start)} – ${formatTime12h(end)}`;

const buildAppointmentDateTime = (date, time) => {
  const d = new Date(date);
  const [h, m] = time.split(":").map(Number);
  d.setHours(h, m, 0, 0);
  return d;
};

export default function HomePage() {
  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [serviceId, setServiceId] = useState("");
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("/services").then((res) => {
      setServices(res.data.data);
    });
  }, []);

  const loadAppointments = async () => {
    const res = await api.get("/appointments/my");
    setAppointments(res.data.data);
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  useEffect(() => {
    if (!serviceId || !date) return;

    api
      .get("/appointments/available-slots", {
        params: { service_id: serviceId, date },
      })
      .then((res) => {
        setSlots(res.data.data);
        setSelectedSlot("");
      });
  }, [serviceId, date]);

  const createAppointment = async () => {
    if (!selectedSlot) return;

    setLoading(true);

    try {
      await api.post("/appointments", {
        service_id: serviceId,
        date,
        start_time: selectedSlot,
      });

      setServiceId("");
      setDate("");
      setSlots([]);
      setSelectedSlot("");

      await loadAppointments();
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (id) => {
    await api.put(`/appointments/${id}/cancel`);
    loadAppointments();
  };

  const nextAppointment = useMemo(() => {
    const upcoming = appointments
      .filter((a) => a.status !== "CANCELLED")
      .map((a) => ({
        ...a,
        dateTime: buildAppointmentDateTime(a.date, a.start_time),
      }))
      .filter((a) => a.dateTime > new Date())
      .sort((a, b) => a.dateTime - b.dateTime);

    return upcoming[0] || null;
  }, [appointments]);

  return (
    <Page>
      <Title>
        <FontAwesomeIcon icon={faCalendarDays} /> Agendar cita
      </Title>

      {services.length === 0 && (
        <EmptyState>No hay servicios disponibles por el momento</EmptyState>
      )}

      {services.length > 0 && (
        <>
          <Section>
            <FontAwesomeIcon icon={faBriefcase} />
            <Select
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
            >
              <option value="">Selecciona un servicio</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </Select>
          </Section>

          <Section>
            <FontAwesomeIcon icon={faCalendarDays} />
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Section>
        </>
      )}

      {serviceId && date && slots.length === 0 && (
        <EmptyState>No hay horarios disponibles para esta fecha</EmptyState>
      )}

      {slots.length > 0 && (
        <Slots>
          <FontAwesomeIcon icon={faClock} />
          {slots.map((slot) => (
            <SlotButton
              key={slot}
              active={selectedSlot === slot}
              onClick={() => setSelectedSlot(slot)}
            >
              {formatTime12h(slot)}
            </SlotButton>
          ))}
        </Slots>
      )}

      <Button disabled={!selectedSlot || loading} onClick={createAppointment}>
        Confirmar cita
      </Button>

      <Divider />

      <Title>
        <FontAwesomeIcon icon={faStar} /> Próxima cita
      </Title>

      {!nextAppointment && (
        <EmptyState>No tienes citas próximas</EmptyState>
      )}

      {nextAppointment && (
        <NextAppointmentCard>
          <strong>{nextAppointment.service_name}</strong>
          <div>
            {formatDate(nextAppointment.date)} de{" "}
            {formatTimeRange(
              nextAppointment.start_time,
              nextAppointment.end_time
            )}
          </div>
        </NextAppointmentCard>
      )}

      <Divider />

      <Title>Mis citas</Title>

      {appointments.length === 0 && (
        <EmptyState>No tienes citas agendadas</EmptyState>
      )}

      <Appointments>
        {appointments.map((a) => {
          const appointmentDateTime = buildAppointmentDateTime(
            a.date,
            a.start_time
          );

          const isFuture = appointmentDateTime > new Date();

          return (
            <AppointmentCard key={a.id}>
              <div>
                <strong>{a.service_name}</strong>
                <div>
                  {formatDate(a.date)} de{" "}
                  {formatTimeRange(a.start_time, a.end_time)}
                </div>
                <StatusBadge status={a.status}>{a.status}</StatusBadge>
              </div>

              {["PENDING", "CONFIRMED"].includes(a.status) && isFuture && (
                <CancelButton onClick={() => cancelAppointment(a.id)}>
                  <FontAwesomeIcon icon={faXmark} />
                </CancelButton>
              )}
            </AppointmentCard>
          );
        })}
      </Appointments>
    </Page>
  );
}