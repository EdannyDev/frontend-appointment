import { useEffect, useState } from "react";
import Layout from "@/components/layout";
import api from "@/lib/axiosInstance";
import {
  Container,
  Title,
  Table,
  Th,
  Td,
  Input,
  SaveButton,
  Empty
} from "@/styles/businessHours.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBatteryEmpty, faBatteryFull, faCalendarDay } from "@fortawesome/free-solid-svg-icons";

const DAYS = [
  { id: 0, label: "Domingo" },
  { id: 1, label: "Lunes" },
  { id: 2, label: "Martes" },
  { id: 3, label: "Miércoles" },
  { id: 4, label: "Jueves" },
  { id: 5, label: "Viernes" },
  { id: 6, label: "Sábado" },
];

export default function BusinessHoursPage() {
  const [hours, setHours] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHours = async () => {
    const res = await api.get("/business-hours");
    setHours(res.data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchHours();
  }, []);

  const getDayHours = (day) =>
    hours.find((h) => h.day_of_week === day) || {};

  const saveHours = async (day, start_time, end_time) => {
    if (!start_time || !end_time) return;

    await api.post("/business-hours", {
      day_of_week: day,
      start_time,
      end_time,
    });

    fetchHours();
  };

  return (
    <Layout>
      <Container>
        <Title>Horarios laborales</Title>

        {loading && <p>Cargando horarios...</p>}

        {!loading && (
          <Table>
            <thead>
              <tr>
                <Th>
                  <FontAwesomeIcon icon={faCalendarDay} />Día
                </Th>
                <Th>
                  <FontAwesomeIcon icon={faBatteryFull} />Inicio
                </Th>
                <Th>
                  <FontAwesomeIcon icon={faBatteryEmpty} />Fin
                </Th>
                <Th>Acción</Th>
              </tr>
            </thead>
            <tbody>
              {DAYS.map((day) => {
                const current = getDayHours(day.id);

                return (
                  <tr key={day.id}>
                    <Td>{day.label}</Td>

                    <Td>
                      <Input
                        type="time"
                        defaultValue={current.start_time || ""}
                        onChange={(e) =>
                          (current.start_time = e.target.value)
                        }
                      />
                    </Td>

                    <Td>
                      <Input
                        type="time"
                        defaultValue={current.end_time || ""}
                        onChange={(e) =>
                          (current.end_time = e.target.value)
                        }
                      />
                    </Td>

                    <Td>
                      <SaveButton
                        onClick={() =>
                          saveHours(
                            day.id,
                            current.start_time,
                            current.end_time
                          )
                        }
                      >
                        Guardar
                      </SaveButton>
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}

        {!loading && hours.length === 0 && (
          <Empty>No hay horarios configurados</Empty>
        )}
      </Container>
    </Layout>
  );
}