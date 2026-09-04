import { useFetch } from "@/hooks/useFetch";
import { logger } from "@/utils/logger";
import api from "@/lib/axiosInstance";
import { useState } from "react";
import {
  Container,
  Title,
  PageSubtitle,
  Form,
  Input,
  Button,
  Table,
  Th,
  Td,
  Empty,
  DeleteButton,
  StyledTbody
} from "@/styles/blockedDays.styles";
import Modal from "@/components/modal";
import { formatDateShort } from "@/utils/time";
import Pagination from "@/components/pagination";
import { Notification } from "@/components/notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCalendar, faCalendarAlt, faFileLines, faCalendarDay } from "@fortawesome/free-solid-svg-icons";

const PAGE_SIZE = 10;

const groupRanges = (data) => {
  const sorted = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
  const result = [];
  let current = null;

  for (const d of sorted) {
    if (!current) {
      current = { start: d.date, end: d.date, reason: d.reason, ids: [d.id] };
      continue;
    }
    const prevDate = new Date(current.end);
    prevDate.setDate(prevDate.getDate() + 1);
    const currDate = new Date(d.date);
    const sameReason = (current.reason || "") === (d.reason || "");
    if (currDate.getTime() === prevDate.getTime() && sameReason) {
      current.end = d.date;
      current.ids.push(d.id);
    } else {
      result.push(current);
      current = { start: d.date, end: d.date, reason: d.reason, ids: [d.id] };
    }
  }
  if (current) result.push(current);
  return result;
};

// Página para listar y gestionar todos los días bloqueados registrados
export default function BlockedDaysPage() {
  const { data: rawDays, refetch: fetchBlockedDays } = useFetch(
    () => api.get("/blocked-days").then((r) => r.data.data || []),
    { errorMessage: "Error al cargar los días bloqueados", initialData: [] }
  );
  const days = groupRanges(rawDays || []);

  const [currentPage, setCurrentPage] = useState(1);
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rangeReason, setRangeReason] = useState("");
  const [isBlockingDay, setIsBlockingDay] = useState(false);
  const [isBlockingRange, setIsBlockingRange] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalAction, setModalAction] = useState(null);

  const createBlockedDay = async (e) => {
    e.preventDefault();
    if (!date || isBlockingDay) return;
    setIsBlockingDay(true);
    try {
      await api.post("/blocked-days", { date, reason });
      Notification.success("Día bloqueado correctamente");
      setDate("");
      setReason("");
      fetchBlockedDays();
    } catch (err) {
      logger.error("Error al bloquear el día:", err);
      Notification.error(err.response?.data?.message || "Error al bloquear el día");
    } finally {
      setIsBlockingDay(false);
    }
  };

  const createBlockedRange = async (e) => {
    e.preventDefault();
    if (!startDate || !endDate || isBlockingRange) return;
    setIsBlockingRange(true);
    try {
      await api.post("/blocked-days/range", {
        start_date: startDate,
        end_date: endDate,
        reason: rangeReason,
      });
      Notification.success("Rango bloqueado correctamente");
      setStartDate("");
      setEndDate("");
      setRangeReason("");
      fetchBlockedDays();
    } catch (err) {
      logger.error("Error al bloquear el rango de días:", err);
      Notification.error(err.response?.data?.message || "Error al bloquear el rango de días");
    } finally {
      setIsBlockingRange(false);
    }
  };

  const confirmDeleteBlockedDay = (range) => {
    const isRange = range.start !== range.end;
    setModalMessage(
      isRange
        ? "¿Seguro que deseas eliminar este rango de días bloqueados?"
        : "¿Seguro que deseas eliminar este día bloqueado?"
    );
    setModalAction(() => async () => {
      if (isConfirming) return;
      setIsConfirming(true);
      try {
        if (isRange) {
          const normalize = (d) => new Date(d).toISOString().slice(0, 10);
          await api.delete(
            `/blocked-days/range?start_date=${normalize(range.start)}&end_date=${normalize(range.end)}`
          );
          Notification.success("Rango eliminado correctamente");
        } else {
          await api.delete(`/blocked-days/${range.ids[0]}`);
          Notification.success("Día bloqueado eliminado correctamente");
        }
        fetchBlockedDays();
      } catch (err) {
        logger.error("Error al eliminar el día bloqueado:", err);
        Notification.error(err.response?.data?.message || "Error al eliminar el día bloqueado");
      } finally {
        setModalVisible(false);
        setIsConfirming(false);
      }
    });
    setModalVisible(true);
  };

  const totalPages = Math.ceil(days.length / PAGE_SIZE);
  const paginatedDays = days.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(totalPages);
  }

  return (
    <Container>
      <Title>Días bloqueados</Title>
      <PageSubtitle>Bloquea fechas individuales o rangos para que no estén disponibles en las reservas.</PageSubtitle>

      <Form onSubmit={createBlockedDay}>
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <Input
          type="text"
          placeholder="Motivo (opcional)"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <Button type="submit" disabled={isBlockingDay}>
          <FontAwesomeIcon icon={faCalendarDay} />
          {isBlockingDay ? "Procesando..." : "Bloquear día"}
        </Button>
      </Form>

      <Form onSubmit={createBlockedRange}>
        <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        <Input
          type="text"
          placeholder="Motivo (opcional)"
          value={rangeReason}
          onChange={(e) => setRangeReason(e.target.value)}
        />
        <Button type="submit" disabled={isBlockingRange}>
          <FontAwesomeIcon icon={faCalendarAlt} />
          {isBlockingRange ? "Procesando..." : "Bloquear rango"}
        </Button>
      </Form>

      {days.length === 0 ? (
        <Empty>No hay días bloqueados</Empty>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <Th><FontAwesomeIcon icon={faCalendar} /> Fecha</Th>
                <Th><FontAwesomeIcon icon={faFileLines} /> Motivo</Th>
                <Th>Acción</Th>
              </tr>
            </thead>
            <StyledTbody>
              {paginatedDays.map((d, index) => (
                <tr key={index}>
                  <Td data-label="Fecha">
                    {d.start === d.end
                      ? formatDateShort(d.start)
                      : `${formatDateShort(d.start)} – ${formatDateShort(d.end)}`}
                  </Td>
                  <Td data-label="Motivo">{d.reason || "—"}</Td>
                  <Td data-label="Acción">
                    <DeleteButton
                      onClick={() => confirmDeleteBlockedDay(d)}
                      disabled={isConfirming}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </DeleteButton>
                  </Td>
                </tr>
              ))}
            </StyledTbody>
          </Table>

          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}

      <Modal
        visible={modalVisible}
        message={modalMessage}
        onConfirm={modalAction}
        onCancel={() => { setModalVisible(false); setIsConfirming(false); }}
      />
    </Container>
  );
}