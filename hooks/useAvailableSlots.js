import { useState, useEffect, useCallback } from "react";
import api from "@/lib/axiosInstance";
import { logger } from "@/utils/logger";
import { Notification } from "@/components/notification";

const SLOTS_REFRESH_MS = 60000;
const todayStr = () => new Date().toISOString().split("T")[0];

// Hook para obtener los horarios disponibles de un servicio en una fecha específica
export const useAvailableSlots = ({ serviceId, date, enabled = true }) => {
  const [slots, setSlots] = useState([]);
  const [workingDays, setWorkingDays] = useState(new Set());

  useEffect(() => {
    api.get("/business-hours")
      .then(({ data }) => {
        const days = new Set(data.data.map((h) => h.day_of_week));
        setWorkingDays(days);
      })
      .catch((err) => {
        logger.error("Error al cargar los horarios del negocio:", err);
        Notification.error(err.response?.data?.message || "Error al cargar los horarios del negocio");
      });
  }, []);

  const isClosedDay = useCallback((dateStr) => {
    if (!dateStr || workingDays.size === 0) return false;
    const dayOfWeek = new Date(dateStr + "T00:00:00").getDay();
    return !workingDays.has(dayOfWeek);
  }, [workingDays]);

  const fetchSlots = useCallback(() => {
    if (!serviceId || !date) {
      setSlots([]);
      return;
    }
    api.get("/appointments/available-slots", {
      params: { service_id: serviceId, date },
    })
      .then((res) => {
        setSlots(res.data.data);
      })
      .catch((err) => {
        logger.error("Error al cargar los horarios disponibles:", err);
        Notification.error(err.response?.data?.message || "Error al cargar los horarios disponibles");
      });
  }, [serviceId, date]);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  useEffect(() => {
    if (!enabled || date !== todayStr()) return;
    const interval = setInterval(fetchSlots, SLOTS_REFRESH_MS);
    return () => clearInterval(interval);
  }, [enabled, date, fetchSlots]);

  return { slots, isClosedDay, fetchSlots };
};