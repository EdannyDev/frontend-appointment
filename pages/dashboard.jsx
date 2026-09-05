import { useEffect, useState } from "react";
import { logger } from "@/utils/logger";
import api from "@/lib/axiosInstance";
import {
  Page,
  Header,
  Welcome,
  Subtitle,
  DateText,
  Cards,
  Card,
  CardTitle,
  CardValue,
  EmptyState,
  SectionTitle,
  AppointmentItem,
  AppointmentLeft,
  AppointmentName,
  AppointmentService,
  AppointmentTime,
  AppointmentsList
} from "@/styles/dashboard.styles";
import { useAuth } from "@/context/authContext";
import { Notification } from "@/components/notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatAppointmentDateTime, formatTodayHeader } from "@/utils/time";
import { faCalendarDay, faClock, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

// Página para el panel de control del administrador
export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [nextAppointments, setNextAppointments] = useState([]);

  useEffect(() => {
    if (!user || user.role !== "ADMIN") return;

    const load = async () => {
      try {
        const { data } = await api.get("/appointments/summary");
        setStats({
          today: data.data.today,
          pending: data.data.pending,
          cancelled: data.data.cancelled,
        });
        setNextAppointments(data.data.upcoming);
      } catch (err) {
        logger.error("Error al cargar el dashboard:", err);
        Notification.error(err.response?.data?.message || "No se pudo cargar la información del panel");
      }
    };

    load();
  }, [user]);

  return (
    <Page>
      <Header>
        <Welcome>¡Hola de nuevo, {user?.name}!</Welcome>
        <Subtitle>Administra tus citas y mantén el control del negocio de forma sencilla.</Subtitle>
        <DateText>{formatTodayHeader()}</DateText>
      </Header>

      {stats && (
        <Cards>
          <Card variant="today">
            <CardTitle><FontAwesomeIcon icon={faCalendarDay} /> Citas hoy</CardTitle>
            <CardValue>{stats.today}</CardValue>
          </Card>
          <Card variant="pending">
            <CardTitle><FontAwesomeIcon icon={faClock} /> Pendientes</CardTitle>
            <CardValue>{stats.pending}</CardValue>
          </Card>
          <Card variant="cancelled">
            <CardTitle><FontAwesomeIcon icon={faCircleXmark} /> Canceladas</CardTitle>
            <CardValue>{stats.cancelled}</CardValue>
          </Card>
        </Cards>
      )}

      <SectionTitle>Próximas citas</SectionTitle>
      <AppointmentsList>
        {nextAppointments.length === 0 ? (
          <EmptyState>No hay citas próximas</EmptyState>
        ) : (
          nextAppointments.map((a) => (
            <AppointmentItem key={a.id}>
              <AppointmentLeft>
                <AppointmentName>{a.client_name}</AppointmentName>
                <AppointmentService>{a.service_name}</AppointmentService>
              </AppointmentLeft>
              <AppointmentTime>
                {formatAppointmentDateTime(a.date, a.start_time, a.end_time)}
              </AppointmentTime>
            </AppointmentItem>
          ))
        )}
      </AppointmentsList>
    </Page>
  );
}