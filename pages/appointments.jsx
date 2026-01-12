import { useEffect, useState, useRef } from "react";
import Layout from "@/components/layout";
import api from "@/lib/axiosInstance";
import {
  Container,
  Title,
  Table,
  Th,
  Td,
  StatusWrapper,
  StatusBadge,
  StatusDropdown,
  StatusOption,
  Empty
} from "@/styles/appointments.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBriefcase, faClock, faCalendar, faSliders } from "@fortawesome/free-solid-svg-icons";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

const formatTime12h = (time) => {
  const [h, m] = time.split(":").map(Number);

  const period = h >= 12 ? "p.m" : "a.m";
  const hour12 = h % 12 === 0 ? 12 : h % 12;

  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
};

const STATUS = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"];

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const dropdownRef = useRef(null);

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/appointments");
      setAppointments(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const changeStatus = async (id, status) => {
    await api.put(`/appointments/${id}/status`, { status });
    setEditingId(null);
    fetchAppointments();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setEditingId(null);
      }
    };

    if (editingId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editingId]);

  return (
    <Layout>
      <Container>
        <Title>Citas</Title>

        {loading && <p>Cargando citas...</p>}

        {!loading && appointments.length === 0 && (
          <Empty>No hay citas registradas</Empty>
        )}

        {!loading && appointments.length > 0 && (
          <Table>
            <thead>
              <tr>
                <Th>
                  <FontAwesomeIcon icon={faUser} />Cliente
                </Th>
                <Th>
                  <FontAwesomeIcon icon={faBriefcase} />Servicio
                </Th>
                <Th>
                  <FontAwesomeIcon icon={faCalendar} />Fecha
                </Th>
                <Th>
                  <FontAwesomeIcon icon={faClock} />Hora
                </Th>
                <Th>
                  <FontAwesomeIcon icon={faSliders} />Estado
                </Th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((a) => (
                <tr key={a.id}>
                  <Td>{a.client_name}</Td>
                  <Td>{a.service_name}</Td>
                  <Td>{formatDate(a.date)}</Td>
                  <Td>{formatTime12h(a.start_time)} – {formatTime12h(a.end_time)}</Td>
                  <Td>
                    <StatusWrapper ref={dropdownRef}>
                      <StatusBadge
                        status={a.status}
                        onClick={() =>
                          setEditingId(
                            editingId === a.id ? null : a.id
                          )
                        }
                        title="Cambiar estado"
                      >
                        {a.status}
                      </StatusBadge>

                      {editingId === a.id && (
                        <StatusDropdown>
                          {STATUS.map((s) => (
                            <StatusOption
                              key={s}
                              status={s}
                              onClick={() =>
                                changeStatus(a.id, s)
                              }
                            >
                              {s}
                            </StatusOption>
                          ))}
                        </StatusDropdown>
                      )}
                    </StatusWrapper>
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