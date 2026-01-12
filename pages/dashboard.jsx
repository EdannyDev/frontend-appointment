import { useEffect, useMemo, useState } from "react";
import api from "@/lib/axiosInstance";
import {
  Grid,
  Card,
  CardTitle,
  CardValue,
  NextAppointment,
  Label,
  Empty,
  Title
} from "@/styles/dashboard.styles";
import Layout from "@/components/layout";

const buildDateTime = (date, time) => {
  const [y, m, d] = date.split("-").map(Number);
  const [h, min] = time.split(":").map(Number);
  return new Date(y, m - 1, d, h, min, 0);
};

const formatDate = (date) =>
  new Date(date).toLocaleDateString("es-MX", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

const formatTime = (time) => {
  const [h, m] = time.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d.toLocaleTimeString("es-MX", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await api.get("/appointments");
        setAppointments(res.data.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const stats = useMemo(
    () => ({
      today: appointments.filter((a) => a.date === today).length,
      pending: appointments.filter((a) => a.status === "PENDING").length,
      confirmed: appointments.filter((a) => a.status === "CONFIRMED").length,
      cancelled: appointments.filter((a) => a.status === "CANCELLED").length,
    }),
    [appointments, today]
  );

  const nextAppointment = useMemo(() => {
    return appointments
      .filter((a) => a.status !== "CANCELLED")
      .map((a) => ({
        ...a,
        dateTime: buildDateTime(a.date, a.start_time),
      }))
      .filter((a) => a.dateTime > new Date())
      .sort((a, b) => a.dateTime - b.dateTime)[0];
  }, [appointments]);

  if (loading) return null;

  return (
    <Layout>
      <Title>Dashboard</Title>

      <Grid>
        <Card>
          <CardTitle>Citas hoy</CardTitle>
          <CardValue>{stats.today}</CardValue>
        </Card>

        <Card>
          <CardTitle>Pendientes</CardTitle>
          <CardValue>{stats.pending}</CardValue>
        </Card>

        <Card>
          <CardTitle>Confirmadas</CardTitle>
          <CardValue>{stats.confirmed}</CardValue>
        </Card>

        <Card>
          <CardTitle>Canceladas</CardTitle>
          <CardValue>{stats.cancelled}</CardValue>
        </Card>
      </Grid>

      <NextAppointment>
        <CardTitle>Próxima cita</CardTitle>

        {!nextAppointment && <Empty>No hay citas próximas</Empty>}

        {nextAppointment && (
          <>
            <div>
              <Label>Cliente:</Label> {nextAppointment.client_name}
            </div>
            <div>
              <Label>Servicio:</Label> {nextAppointment.service_name}
            </div>
            <div>
              <Label>Fecha:</Label> {formatDate(nextAppointment.date)}
            </div>
            <div>
              <Label>Hora:</Label> {formatTime(nextAppointment.start_time)}
            </div>
            <div>
              <Label>Estado:</Label> {nextAppointment.status}
            </div>
          </>
        )}
      </NextAppointment>
    </Layout>
  );
}