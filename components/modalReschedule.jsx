import { useEffect, useState, useMemo, useCallback } from "react";
import { logger } from "@/utils/logger";
import api from "@/lib/axiosInstance";
import {
  Overlay,
  Dialog,
  Title,
  Wrapper,
  Input,
  SlotSection,
  SlotLabel,
  SlotsGrid,
  Slot,
  SubmitButton,
  CancelButton,
  Actions,
  EmptyState,
  SelectedInfo,
  NavButton,
  BlockTitle,
  SlotsContent,
  ServiceInfo,
  BlockNavigation
} from "@/styles/modalReschedule.styles";
import {
  faAngleLeft,
  faAngleRight,
  faSun,
  faCloudSun,
  faMoon
} from "@fortawesome/free-solid-svg-icons";
import { formatTime12h } from "@/utils/time";
import { Notification } from "@/components/notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BLOCK_ICONS = {
  mañana: faSun,
  tarde: faCloudSun,
  noche: faMoon
};

const SLOTS_REFRESH_MS = 60000;
const todayStr = () => new Date().toISOString().split("T")[0];

// Modal para reprogramar citas, con selección de fecha y horarios disponibles agrupados por bloque del día
export default function RescheduleModal({ visible, appointment, onClose, onSuccess }) {
  const [slots, setSlots] = useState([]);
  const [animationDirection, setAnimationDirection] = useState("right");
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [form, setForm] = useState({ date: "", slot: "" });
  const [workingDays, setWorkingDays] = useState(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    api.get("/business-hours")
      .then(({ data }) => {
        const days = new Set(data.data.map((h) => h.day_of_week));
        setWorkingDays(days);
      })
      .catch((err) => {
        logger.error("Error al cargar horarios del negocio:", err);
        Notification.error(err.response?.data?.message || "Error al cargar los horarios del negocio");
      });
  }, []);

  useEffect(() => {
    if (!visible || !appointment) return;
    setForm({ date: "", slot: "" });
    setSlots([]);
    setIsSubmitting(false);
  }, [visible, appointment]);

  useEffect(() => {
    if (!visible) return;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [visible]);

  const fetchSlots = useCallback(() => {
    if (!appointment?.service_id || !form.date) {
      setSlots([]);
      return;
    }
    api.get("/appointments/available-slots", {
      params: { service_id: appointment.service_id, date: form.date },
    })
      .then((res) => {
        const available = res.data.data;
        setSlots(available);
        setForm((prev) =>
          prev.slot && !available.includes(prev.slot)
            ? { ...prev, slot: "" }
            : prev
        );
      })
      .catch((err) => {
        logger.error("Error al cargar horarios disponibles:", err);
        Notification.error(err.response?.data?.message || "Error al cargar los horarios disponibles");
      });
  }, [appointment, form.date]);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  useEffect(() => {
    if (!visible || form.date !== todayStr()) return;
    const interval = setInterval(fetchSlots, SLOTS_REFRESH_MS);
    return () => clearInterval(interval);
  }, [visible, form.date, fetchSlots]);

  const groupedSlots = useMemo(() => {
    const groups = { mañana: [], tarde: [], noche: [] };
    slots.forEach((time) => {
      const hour = parseInt(time.split(":")[0], 10);
      if (hour >= 6 && hour < 12) groups.mañana.push(time);
      else if (hour >= 12 && hour < 18) groups.tarde.push(time);
      else groups.noche.push(time);
    });
    return Object.entries(groups)
      .filter(([_, arr]) => arr.length > 0)
      .map(([key, value]) => ({ label: key, slots: value }));
  }, [slots]);

  const currentBlock = groupedSlots[currentBlockIndex];

  useEffect(() => {
    setCurrentBlockIndex(0);
  }, [groupedSlots]);

  const isClosedDay = (dateStr) => {
    if (!dateStr || workingDays.size === 0) return false;
    const dayOfWeek = new Date(dateStr + "T00:00:00").getDay();
    return !workingDays.has(dayOfWeek);
  };

  const handleDateChange = (e) => {
    const selected = e.target.value;
    if (isClosedDay(selected)) {
      Notification.error("El negocio no atiende ese día. Por favor elige otra fecha.");
      e.target.value = "";
      setForm({ date: "", slot: "" });
      return;
    }
    setForm({ date: selected, slot: "" });
  };

  const handleSubmit = async () => {
    if (!form.date || !form.slot || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await api.put(`/appointments/${appointment.id}/reschedule`, {
        date: form.date,
        start_time: form.slot,
      });
      Notification.success("Cita reprogramada correctamente");
      onSuccess();
      onClose();
    } catch (err) {
      logger.error("Error al reprogramar la cita:", err);
      Notification.error(err.response?.data?.message || "Error al reprogramar la cita");
      setIsSubmitting(false);
      fetchSlots();
    }
  };

  const handlePrevious = () => {
    setAnimationDirection("left");
    setCurrentBlockIndex((i) => i - 1);
  };

  const handleNext = () => {
    setAnimationDirection("right");
    setCurrentBlockIndex((i) => i + 1);
  };

  if (!visible || !appointment) return null;

  return (
    <Overlay>
      <Dialog>
        <Title>Reprogramar cita</Title>
        <Wrapper>
          <ServiceInfo>
            Servicio actual: <strong>{appointment.service_name}</strong>
          </ServiceInfo>

          <Input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={form.date}
            onChange={handleDateChange}
          />

          {form.date && (
            <SlotSection>
              <SlotLabel>Horarios disponibles</SlotLabel>
              {groupedSlots.length === 0 ? (
                <EmptyState>No hay horarios disponibles para este día</EmptyState>
              ) : (
                <>
                  <BlockNavigation>
                    <NavButton disabled={currentBlockIndex === 0} onClick={handlePrevious}>
                      <FontAwesomeIcon icon={faAngleLeft} />
                    </NavButton>
                    <BlockTitle>
                      <FontAwesomeIcon icon={BLOCK_ICONS[currentBlock?.label]} />
                      {currentBlock?.label}
                    </BlockTitle>
                    <NavButton
                      disabled={currentBlockIndex === groupedSlots.length - 1}
                      onClick={handleNext}
                    >
                      <FontAwesomeIcon icon={faAngleRight} />
                    </NavButton>
                  </BlockNavigation>

                  <SlotsContent key={currentBlock?.label} direction={animationDirection}>
                    <SlotsGrid>
                      {currentBlock?.slots.map((s) => (
                        <Slot
                          key={s}
                          selected={form.slot === s}
                          onClick={() => setForm({ ...form, slot: s })}
                        >
                          {s}
                        </Slot>
                      ))}
                    </SlotsGrid>
                  </SlotsContent>
                </>
              )}
            </SlotSection>
          )}

          {form.slot && (
            <SelectedInfo>
              Horario seleccionado: <strong>{formatTime12h(form.slot)}</strong>
            </SelectedInfo>
          )}

          <Actions>
            <CancelButton onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </CancelButton>
            <SubmitButton
              onClick={handleSubmit}
              disabled={!form.slot || isSubmitting}
            >
              {isSubmitting ? "Procesando..." : "Confirmar cambio"}
            </SubmitButton>
          </Actions>
        </Wrapper>
      </Dialog>
    </Overlay>
  );
}