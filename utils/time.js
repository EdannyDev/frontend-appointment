// Convierte minutos totales a formato legible
export const formatDuration = (minutes) => {
  const mins = Number(minutes);
    if (!mins || mins < 60) return `${mins} min`;
  const hours = Math.floor(mins / 60);
  const remaining = mins % 60;
    if (remaining === 0) return `${hours} h`;
  return `${hours} h ${remaining} min`;
};

// Convierte "HH:MM" o "HH:MM:SS" a formato 12h
export const formatTime12h = (time) => {
  if (!time) return "";
    const [h, m] = time.split(":").map(Number);
    const period = h >= 12 ? "p.m." : "a.m.";
    const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${String(hour12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${period}`;
};

// Convierte una fecha ISO o String a un formato legible
export const formatDateLong = (dateStr) => {
  if (!dateStr) return "";
    const date = new Date(String(dateStr).slice(0, 10) + "T00:00:00");
    const weekday = date.toLocaleDateString("es-MX", { weekday: "long" });
    const day = date.getDate();
    const month = date.toLocaleDateString("es-MX", { month: "long" });
    const year = date.getFullYear();
  return `${weekday} ${day} de ${month} de ${year}`;
};

// Convierte fecha, hora de inicio y fin a un formato legible para citas
export const formatAppointmentDateTime = (dateStr, startTime, endTime) => {
    const datePart = formatDateLong(dateStr);
    const startPart = formatTime12h(startTime);
    const endPart = endTime ? ` – ${formatTime12h(endTime)}` : "";
  return `${datePart} • ${startPart}${endPart}`;
};

// Convierte fecha y hora de inicio a un formato legible para próximas citas
export const formatAppointmentStart = (isoString) => {
  if (!isoString) return "";
    const [datePart, timePart] = String(isoString).split(" ");
    const [date, time] = isoString.includes("T")
      ? isoString.split("T")
      : [datePart, timePart];
  return `${formatDateLong(date)} • ${formatTime12h(time?.slice(0, 5))}`;
};

// Convierte fecha a formato corto "DD/MM/YYYY"
export const formatDateShort = (dateStr) => {
  if (!dateStr) return "";
    const date = new Date(String(dateStr).slice(0, 10) + "T00:00:00");
  return date.toLocaleDateString("es-MX", {
    day: "2-digit", month: "2-digit", year: "numeric",
  });
};

// Convierte fecha actual en un formato legible
export const formatTodayHeader = () =>
  new Date().toLocaleDateString("es-MX", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
});