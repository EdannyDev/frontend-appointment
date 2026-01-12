import { useEffect, useState } from "react";
import Layout from "@/components/layout";
import api from "@/lib/axiosInstance";
import {
  Container,
  Title,
  Form,
  Input,
  Button,
  Table,
  Th,
  Td,
  Empty,
  DeleteButton
} from "@/styles/blockedDays.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCalendar, faCalendarAlt, faFileLines } from "@fortawesome/free-solid-svg-icons";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

export default function BlockedDaysPage() {
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");

  const fetchBlockedDays = async () => {
    try {
      const res = await api.get("/blocked-days");
      setDays(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlockedDays();
  }, []);

  const createBlockedDay = async (e) => {
    e.preventDefault();
    if (!date) return;

    await api.post("/blocked-days", { date, reason });
    setDate("");
    setReason("");
    fetchBlockedDays();
  };

  const deleteBlockedDay = async (id) => {
    await api.delete(`/blocked-days/${id}`);
    fetchBlockedDays();
  };

  return (
    <Layout>
      <Container>
        <Title>Días bloqueados</Title>

        <Form onSubmit={createBlockedDay}>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Motivo (opcional)"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <Button type="submit">
            <FontAwesomeIcon icon={faCalendar} />
            Bloquear día
          </Button>
        </Form>

        {loading && <p>Cargando días bloqueados...</p>}

        {!loading && days.length === 0 && (
          <Empty>No hay días bloqueados</Empty>
        )}

        {!loading && days.length > 0 && (
          <Table>
            <thead>
              <tr>
                <Th>
                  <FontAwesomeIcon icon={faCalendarAlt} />Fecha
                </Th>
                <Th>
                  <FontAwesomeIcon icon={faFileLines} />Motivo
                </Th>
                <Th>Acción</Th>
              </tr>
            </thead>
            <tbody>
              {days.map((d) => (
                <tr key={d.id}>
                  <Td>{formatDate(d.date)}</Td>
                  <Td>{d.reason || "—"}</Td>
                  <Td>
                    <DeleteButton onClick={() => deleteBlockedDay(d.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </DeleteButton>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </Layout>
  );
}