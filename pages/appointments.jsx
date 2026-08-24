import { useEffect, useState, useCallback, useRef } from "react";
import { logger } from "@/utils/logger";
import api from "@/lib/axiosInstance";
import {
  Container,
  Controls,
  LeftControls,
  RightControls,
  SearchInput,
  FilterSelect,
  Table,
  Th,
  Td,
  StatusWrapper,
  StatusBadge,
  StatusDropdown,
  StatusOption,
  Empty,
  StyledTbody,
  Title,
  PageSubtitle
} from "@/styles/appointments.styles";
import Modal from "@/components/modal";
import Pagination from "@/components/pagination";
import { Notification } from "@/components/notification";
import { formatDateShort, formatTime12h } from "@/utils/time";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBriefcase, faClock, faCalendar, faSliders, faSearch } from "@fortawesome/free-solid-svg-icons";

const STATUS = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"];

const STATUS_LABELS = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmada",
  CANCELLED: "Cancelada",
  COMPLETED: "Completada"
};

const ALLOWED_TRANSITIONS = {
  PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["CANCELLED", "COMPLETED"],
  CANCELLED: [],
  COMPLETED: [],
};

const PAGE_SIZE = 10;
const SEARCH_DEBOUNCE_MS = 350;

const getDateRange = (filter) => {
  if (filter === "ALL") return { start: null, end: null };

  const today = new Date();

  if (filter === "TODAY") {
    const iso = today.toISOString().slice(0, 10);
    return { start: iso, end: iso };
  }

  if (filter === "WEEK") {
    const day = today.getDay() || 7;
    const start = new Date(today);
    start.setDate(today.getDate() - day + 1);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return {
      start: start.toISOString().slice(0, 10),
      end: end.toISOString().slice(0, 10),
    };
  }

  return { start: null, end: null };
};

const getAvailableStatuses = (appointment) => {
  const options = ALLOWED_TRANSITIONS[appointment.status] || [];
  const appointmentDateTime = new Date(`${appointment.date.slice(0, 10)}T${appointment.start_time}`);
  const hasOccurred = appointmentDateTime <= new Date();
  return options.filter((s) => s !== "COMPLETED" || hasOccurred);
};

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [editingId, setEditingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ direction: "down", align: "left" });
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalAction, setModalAction] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const searchTimeout = useRef(null);

  useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(searchTimeout.current);
  }, [search]);

  const fetchAppointments = useCallback(async () => {
    try {
      const { start, end } = getDateRange(dateFilter);
      const res = await api.get("/appointments", {
        params: {
          page: currentPage,
          limit: PAGE_SIZE,
          search: debouncedSearch || undefined,
          status: statusFilter,
          start: start || undefined,
          end: end || undefined,
        },
      });
      setAppointments(res.data?.data || []);
      setPagination(res.data?.pagination || { page: 1, totalPages: 1, total: 0 });
    } catch (err) {
      logger.error("Error al cargar las citas:", err);
      Notification.error(err.response?.data?.message || "Error al cargar las citas");
    }
  }, [currentPage, debouncedSearch, statusFilter, dateFilter]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const openModal = (message, action) => {
    setModalMessage(message);
    setModalAction(() => action);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalMessage("");
    setModalAction(null);
    setIsConfirming(false);
  };

  const confirmChangeStatus = useCallback(async (id, status) => {
    if (updatingId) return;
    setUpdatingId(id);
    try {
      await api.put(`/appointments/${id}/status`, { status });
      Notification.success(`Estado cambiado a ${STATUS_LABELS[status]}`);
      setEditingId(null);
      fetchAppointments();
    } catch (err) {
      logger.error("Error al cambiar el estado de la cita:", err);
      Notification.error(err.response?.data?.message || "Error al cambiar el estado de la cita");
    } finally {
      setUpdatingId(null);
    }
  }, [fetchAppointments, updatingId]);

  const handleChangeStatus = (id, status) => {
    if (updatingId) return;
    if (["CANCELLED", "COMPLETED"].includes(status)) {
      openModal(
        `¿Seguro que deseas marcar la cita como ${STATUS_LABELS[status]}?`,
        async () => {
          if (isConfirming) return;
          setIsConfirming(true);
          await confirmChangeStatus(id, status);
          closeModal();
        }
      );
    } else {
      confirmChangeStatus(id, status);
    }
  };

  const handleToggleDropdown = (appointment, e) => {
    if (updatingId) return;

    if (getAvailableStatuses(appointment).length === 0) {
      Notification.info("Esta cita ya no admite cambios de estado.");
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceRight = window.innerWidth - rect.left;
    setDropdownPosition({
      direction: spaceBelow < 180 ? "up" : "down",
      align: spaceRight < 180 ? "right" : "left",
    });
    setEditingId(editingId === appointment.id ? null : appointment.id);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("[data-status-wrapper]")) setEditingId(null);
    };
    if (editingId !== null)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [editingId]);

  return (
    <Container>
      <Title>Citas</Title>
      <PageSubtitle>Consulta, filtra y gestiona el estado de todas las citas registradas.</PageSubtitle>

      <Controls>
        <LeftControls>
          <SearchInput>
            <input
              placeholder="Buscar por cliente o servicio..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FontAwesomeIcon icon={faSearch} />
          </SearchInput>
        </LeftControls>

        <RightControls>
          <FilterSelect
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
          >
            <option value="ALL">Todos los estados</option>
            {STATUS.map((s) => (
              <option key={s} value={s}>{STATUS_LABELS[s]}</option>
            ))}
          </FilterSelect>

          <FilterSelect
            value={dateFilter}
            onChange={(e) => { setDateFilter(e.target.value); setCurrentPage(1); }}
          >
            <option value="ALL">Todas</option>
            <option value="TODAY">Hoy</option>
            <option value="WEEK">Semana</option>
          </FilterSelect>
        </RightControls>
      </Controls>

      {appointments.length === 0 && <Empty>No hay citas</Empty>}

      {appointments.length > 0 && (
        <>
          <Table>
            <thead>
              <tr>
                <Th><FontAwesomeIcon icon={faUser} /> Cliente</Th>
                <Th><FontAwesomeIcon icon={faBriefcase} /> Servicio</Th>
                <Th><FontAwesomeIcon icon={faCalendar} /> Fecha</Th>
                <Th><FontAwesomeIcon icon={faClock} /> Hora</Th>
                <Th><FontAwesomeIcon icon={faSliders} /> Estado</Th>
              </tr>
            </thead>

            <StyledTbody>
              {appointments.map((a) => {
                const availableStatuses = getAvailableStatuses(a);
                return (
                  <tr key={a.id}>
                    <Td data-label="Cliente">{a.client_name}</Td>
                    <Td data-label="Servicio">{a.service_name}</Td>
                    <Td data-label="Fecha">{formatDateShort(a.date)}</Td>
                    <Td data-label="Hora">{formatTime12h(a.start_time)} – {formatTime12h(a.end_time)}</Td>
                    <Td data-label="Estado">
                      <StatusWrapper data-status-wrapper>
                        <StatusBadge
                          status={a.status}
                          updating={updatingId === a.id}
                          busy={!!updatingId}
                          onClick={(e) => handleToggleDropdown(a, e)}
                        >
                          {updatingId === a.id ? "Procesando..." : STATUS_LABELS[a.status]}
                        </StatusBadge>

                        {editingId === a.id && !updatingId && availableStatuses.length > 0 && (
                          <StatusDropdown
                            direction={dropdownPosition.direction}
                            align={dropdownPosition.align}
                            onMouseDown={(e) => e.stopPropagation()}
                          >
                            {availableStatuses.map((s) => (
                              <StatusOption
                                key={s}
                                status={s}
                                onClick={() => handleChangeStatus(a.id, s)}
                              >
                                {STATUS_LABELS[s]}
                              </StatusOption>
                            ))}
                          </StatusDropdown>
                        )}
                      </StatusWrapper>
                    </Td>
                  </tr>
                );
              })}
            </StyledTbody>
          </Table>

          <Pagination
            totalPages={pagination.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      <Modal
        visible={modalVisible}
        message={modalMessage}
        onConfirm={modalAction}
        onCancel={closeModal}
      />
    </Container>
  );
}