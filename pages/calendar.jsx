import { useState, useCallback, useMemo, useEffect } from "react";
import { STATUS_LABELS } from "@/utils/statusLabels";
import { useRouter } from "next/router";
import { logger } from "@/utils/logger";
import dynamic from "next/dynamic";
import {
  CalendarHeader, 
  TitleSection, 
  StatusLegend, 
  StatusItem,
  CalendarContainer, 
  ModalOverlay, 
  ModalContent, 
  ModalTitle,
  ModalBody, 
  StatusBadge, 
  ModalActions, 
  ButtonClose, 
  ButtonManage
} from "@/styles/calendar.styles";
import api from "@/lib/axiosInstance";
import listPlugin from "@fullcalendar/list";
import daygridPlugin from "@fullcalendar/daygrid";
import timegridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";
import { Notification } from "@/components/notification";
import interactionPlugin from "@fullcalendar/interaction";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

const FullCalendar = dynamic(() => import("@fullcalendar/react"), { ssr: false });

// Página del calendario interactivo para que el usuario pueda ver y gestionar sus citas
export default function Calendar() {
  const router = useRouter();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [defaultView, setDefaultView] = useState(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    setDefaultView(isMobile ? "listWeek" : "dayGridMonth");
  }, []);

  const fetchEvents = useCallback(async (fetchInfo, successCallback, failureCallback) => {
    try {
      const res = await api.get("/appointments/my", {
        params: { start: fetchInfo.startStr, end: fetchInfo.endStr },
      });
      const formattedEvents = res.data.data.map((a) => ({
        id: String(a.id),
        title: a.service_name,
        start: a.start,
        end: a.end,
        extendedProps: { status: a.status.toLowerCase() },
      }));
      successCallback(formattedEvents);
    } catch (error) {
      logger.error("Error al cargar las citas del calendario:", error);
      Notification.error(error.response?.data?.message || "Error al cargar las citas");
      failureCallback(error);
    }
  }, []);

  const handleEventDrop = useCallback(async (info) => {
    if (info.view.type === "listWeek") {
      info.revert();
      return;
    }
    const { event } = info;
    try {
      const res = await api.put(`/appointments/${event.id}/reschedule`, {
        date: event.start.toISOString().split("T")[0],
        start_time: event.start.toTimeString().split(" ")[0].substring(0, 5),
      });

      if (res.data.success) {
        Notification.success(res.data.message || "Cita reprogramada");
        info.view.calendar.refetchEvents();
      }
    } catch (error) {
      logger.error("Error al reprogramar la cita:", error);
      info.revert();
      Notification.error(error.response?.data?.message || "Error al reprogramar la cita");
    }
  }, []);

  useLockBodyScroll(!!selectedEvent);

  const calendarOptions = useMemo(() => ({
    plugins: [daygridPlugin, timegridPlugin, interactionPlugin, listPlugin],
    initialView: "dayGridMonth",
    locales: [esLocale],
    locale: "es",
    height: "auto",
    nowIndicator: true,
    editable: true,
    allDaySlot: false,
    eventDurationEditable: false,
    eventResizableFromStart: false,
    eventOverlap: false,
    eventDrop: handleEventDrop,
    eventTimeFormat: {
      hour: "numeric",
      minute: "2-digit",
      meridiem: "short",
      hour12: true,
    },
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,listWeek",
    },
    eventClassNames: ({ event }) => [`status-${event.extendedProps.status}`],
    eventClick: ({ event }) => setSelectedEvent(event),
  }), [handleEventDrop]);

  return (
    <>
      <CalendarHeader>
        <TitleSection>
          <h1>Mi calendario</h1>
          <p>Gestiona tus citas de forma interactiva.</p>
        </TitleSection>
        <StatusLegend>
          {Object.entries(STATUS_LABELS).map(([key, label]) => (
            <StatusItem key={key} status={key.toLowerCase()}>{label}</StatusItem>
          ))}
        </StatusLegend>
      </CalendarHeader>

      <CalendarContainer>
        {defaultView && (
          <FullCalendar {...calendarOptions} initialView={defaultView} events={fetchEvents} />
        )}
      </CalendarContainer>

      {selectedEvent && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>{selectedEvent.title}</ModalTitle>
            <ModalBody>
              <span>Estado:</span>
              <StatusBadge status={selectedEvent.extendedProps.status}>
                {STATUS_LABELS[selectedEvent.extendedProps.status.toUpperCase()]}
              </StatusBadge>
            </ModalBody>
            <ModalActions>
              <ButtonClose onClick={() => setSelectedEvent(null)}>Cerrar</ButtonClose>
              <ButtonManage onClick={() => router.push(`/appointment/${selectedEvent.id}`)}>
                {["cancelled", "completed"].includes(selectedEvent.extendedProps.status)
                  ? "Ver detalles"
                  : "Gestionar cita"}
              </ButtonManage>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}