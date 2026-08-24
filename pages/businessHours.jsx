import { useState, useEffect } from "react";
import { useFetch } from "@/hooks/useFetch";
import api from "@/lib/axiosInstance";
import {
  Container,
  Title,
  Table,
  Th,
  Td,
  Input,
  SaveButton,
  ToggleButton,
  Empty,
  StyledTbody,
  HelperText,
} from "@/styles/businessHours.styles";
import { Notification } from "@/components/notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay, faBatteryFull, faBatteryEmpty, faSliders } from "@fortawesome/free-solid-svg-icons";

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
  const { data: original, refetch: fetchHours } = useFetch(
    () => api.get("/business-hours/admin").then((r) => r.data.data || []),
    { errorMessage: "No se pudieron cargar los horarios laborales", initialData: [] }
  );
  const [draft, setDraft] = useState([]);
  const [savingDay, setSavingDay] = useState(null);

  useEffect(() => {
    setDraft(original || []);
  }, [original]);

  const getDay = (list, dayId) => {
    const found = list.find((h) => h.day_of_week === dayId && h.is_active);
    return found || { day_of_week: dayId, start_time: "", end_time: "", is_active: false };
  };

  const updateLocal = (dayId, field, value) => {
    setDraft((prev) => {
      const filtered = prev.filter((h) => !(h.day_of_week === dayId && h.is_active));
      const current = getDay(prev, dayId);
      return [
        ...filtered,
        {
          day_of_week: dayId,
          start_time: field === "start" ? value : current.start_time,
          end_time: field === "end" ? value : current.end_time,
          is_active: true,
        },
      ];
    });
  };

  const toggleDay = (dayId) => {
    setDraft((prev) => {
      const current = getDay(prev, dayId);
      const filtered = prev.filter((h) => !(h.day_of_week === dayId && h.is_active));
      return [
        ...filtered,
        {
          day_of_week: dayId,
          start_time: current.is_active ? "" : "08:00",
          end_time: current.is_active ? "" : "20:00",
          is_active: !current.is_active,
        },
      ];
    });
  };

  const hasChanged = (dayId) => {
    const o = getDay(original || [], dayId);
    const d = getDay(draft, dayId);
    return (
      o.start_time !== d.start_time ||
      o.end_time !== d.end_time ||
      o.is_active !== d.is_active
    );
  };

  const isValid = (dayId) => {
    const d = getDay(draft, dayId);
    if (!d.is_active) return true;
    if (!d.start_time || !d.end_time) return false;
    return d.start_time < d.end_time;
  };

  const saveHours = async (dayId) => {
    if (savingDay !== null) return;
    const d = getDay(draft, dayId);
    const dayLabel = DAYS.find((x) => x.id === dayId)?.label;
    setSavingDay(dayId);
    try {
      await api.post("/business-hours", {
        day_of_week: dayId,
        start_time: d.is_active ? d.start_time : null,
        end_time: d.is_active ? d.end_time : null,
      });
      Notification.success(`Horario de ${dayLabel} guardado`);
      fetchHours();
    } catch (err) {
      Notification.error(err.response?.data?.message || "Error al guardar el horario laboral");
    } finally {
      setSavingDay(null);
    }
  };

  return (
    <Container>
      <Title>Horarios laborales</Title>

      <HelperText>
        Activa un día para definir horario laboral. Los cambios deben guardarse individualmente.
      </HelperText>

      <Table>
        <thead>
          <tr>
            <Th><FontAwesomeIcon icon={faCalendarDay} /> Día</Th>
            <Th><FontAwesomeIcon icon={faBatteryFull} /> Inicio</Th>
            <Th><FontAwesomeIcon icon={faBatteryEmpty} /> Fin</Th>
            <Th><FontAwesomeIcon icon={faSliders} /> Estado</Th>
            <Th>Acción</Th>
          </tr>
        </thead>

        <StyledTbody>
          {DAYS.map((day) => {
            const current = getDay(draft, day.id);
            const valid = isValid(day.id);
            const isSaving = savingDay === day.id;

            return (
              <tr key={day.id}>
                <Td data-label="Día">{day.label}</Td>
                <Td data-label="Inicio">
                  <Input
                    type="time"
                    step="900"
                    disabled={!current.is_active || savingDay !== null}
                    value={current.start_time || ""}
                    placeholder={current.is_active ? "--:--" : "Cerrado"}
                    onChange={(e) => updateLocal(day.id, "start", e.target.value)}
                  />
                </Td>
                <Td data-label="Fin">
                  <Input
                    type="time"
                    step="900"
                    disabled={!current.is_active || savingDay !== null}
                    value={current.end_time || ""}
                    placeholder={current.is_active ? "--:--" : "Cerrado"}
                    onChange={(e) => updateLocal(day.id, "end", e.target.value)}
                  />
                </Td>
                <Td data-label="Estado">
                  <ToggleButton
                    active={current.is_active}
                    onClick={() => toggleDay(day.id)}
                    disabled={savingDay !== null}
                    title={current.is_active ? "Día abierto" : "Día cerrado"}
                  >
                    {current.is_active ? "Abierto" : "Cerrado"}
                  </ToggleButton>
                </Td>
                <Td data-label="Acción">
                  <SaveButton
                    disabled={!hasChanged(day.id) || !valid || savingDay !== null}
                    title={
                      !hasChanged(day.id) ? "No hay cambios"
                      : !valid ? "Horario inválido"
                      : "Guardar cambios"
                    }
                    onClick={() => saveHours(day.id)}
                  >
                    {isSaving ? "Procesando..." : "Guardar"}
                  </SaveButton>
                </Td>
              </tr>
            );
          })}
        </StyledTbody>
      </Table>

      {(original || []).length === 0 && <Empty>No hay horarios laborales configurados</Empty>}
    </Container>
  );
}