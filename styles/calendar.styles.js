import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { STATUS_THEME } from "@/utils/statusTheme";

const STATUS_COLORS = {
  pending: STATUS_THEME.PENDING.solid,
  confirmed: STATUS_THEME.CONFIRMED.solid,
  completed: STATUS_THEME.COMPLETED.solid,
  cancelled: STATUS_THEME.CANCELLED.solid,
};

const dialogEntrance = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const CalendarHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    margin-bottom: 1.5rem;
  }
`;

export const TitleSection = styled.div`
  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.25rem;
    color: var(--text-1);
  }

  p {
    color: var(--text-2);
    font-size: 0.9rem;
  }
`;

export const StatusLegend = styled.ul`
  display: flex;
  list-style: none;
  margin-top: 15px;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
    margin-top: 0;
  }
`;

export const StatusItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: var(--text-2);

  &::before {
    content: "";
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 8px;
    background-color: ${(props) => STATUS_COLORS[props.status] || "#ddd"};
  }
`;

export const CalendarContainer = styled.main`
  .fc-toolbar-title::first-letter { 
    text-transform: uppercase !important; 
  }

  .fc-button {
    background-color: var(--card) !important;
    color: var(--text-2) !important;
    border: 1px solid var(--border) !important;
    font-weight: 500 !important;
    transition: background-color 0.2s ease, border-color 0.2s ease;

    &:hover {
      background-color: var(--surface) !important;
      border-color: var(--text-3) !important;
    }

    &.fc-button-active {
      background-color: var(--accent) !important;
      color: var(--bg) !important;
      border-color: var(--accent) !important;
    }

    &:focus { 
      box-shadow: none !important; 
    }
  }

  .fc-today-button {
    background-color: var(--card) !important;
    color: var(--text-2) !important;
    border-color: var(--border) !important;

    &:hover {
      background-color: var(--surface) !important;
      border-color: var(--text-3) !important;
      color: var(--text-1) !important;
    }

    &:disabled {
      opacity: 0.45 !important;
      cursor: not-allowed !important;
      pointer-events: none !important;
    }
  }

  .fc-col-header-cell {
    background-color: var(--card) !important;
    padding: 10px 0 !important;

    .fc-col-header-cell-cushion {
      text-transform: uppercase !important;
      font-size: 0.75rem !important;
      font-weight: 700 !important;
      color: var(--text-2) !important;
      text-decoration: none !important;
    }
  }

  .fc-event {
    border: none !important;
    border-radius: 12px !important;
    cursor: pointer;
    transition: filter 0.2s ease;
    overflow: hidden !important;

    &:hover { 
      filter: brightness(0.9) !important; 
    }

    &, .fc-event-main, .fc-event-main-frame, .fc-event-title,
    .fc-event-title-container, .fc-event-time, .fc-list-event-title {
      color: var(--text-1) !important;
      font-weight: 600 !important;
      font-size: 0.8rem !important;
      text-decoration: none !important;
    }

    .fc-event-resizer { 
      display: none !important; 
    }

    .fc-daygrid-event-dot, .fc-list-event-dot { 
      display: none !important; 
    }
  }

  .fc-daygrid-block-event, .fc-daygrid-dot-event { 
    padding: 2px 8px !important; 
  }

  .fc-timegrid-event {
    margin: 1px !important;
    padding: 4px !important;
    display: flex;
    flex-direction: column;

    .fc-event-main {
      padding: 0 !important;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      height: 100%;
    }
  }

  .status-pending { background-color: ${STATUS_COLORS.pending} !important; }
  .status-confirmed { background-color: ${STATUS_COLORS.confirmed} !important; }
  .status-completed { background-color: ${STATUS_COLORS.completed} !important; }
  .status-cancelled { background-color: ${STATUS_COLORS.cancelled} !important; }

  .fc-list-event {
    background-color: transparent !important;
    transition: filter 0.2s ease !important;

    &:hover td { background-color: inherit !important; }
    &:hover { filter: brightness(0.8) !important; }
    &.status-pending td { background-color: ${STATUS_COLORS.pending} !important; }
    &.status-confirmed td { background-color: ${STATUS_COLORS.confirmed} !important; }
    &.status-completed td { background-color: ${STATUS_COLORS.completed} !important; }
    &.status-cancelled td { background-color: ${STATUS_COLORS.cancelled} !important; }
    .fc-list-event-title, .fc-list-event-time { color: var(--text-1) !important; }
  }

  .fc-list-table { border: none !important; }
  .fc-list-day-cushion { background-color: var(--card) !important; color: var(--text-1) !important; }

  @media (max-width: 768px) {
    .fc-header-toolbar {
      flex-direction: column !important;
      align-items: stretch !important;
      gap: 10px !important;
      margin-bottom: 1rem !important;
    }

    .fc-toolbar-chunk {
      display: flex !important;
      justify-content: center !important;
    }

    .fc-toolbar-title {
      font-size: 1rem !important;
      text-align: center;
    }

    .fc-button {
      padding: 5px 9px !important;
      font-size: 0.75rem !important;
    }

    .fc-button-group {
      flex-wrap: wrap;
    }
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(13, 15, 20, 0.45);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: var(--surface);
  border: 0.5px solid var(--border);
  width: 380px;
  max-width: 90%;
  border-radius: 18px;
  padding: 1.75rem;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
  animation: ${dialogEntrance} 0.22s ease-out;
`;

export const ModalTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--text-1);
  margin-bottom: 0.75rem;
`;

export const ModalBody = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
  font-size: 1rem;
  color: var(--text-2);
`;

export const StatusBadge = styled.span`
  background-color: ${(props) => STATUS_COLORS[props.status] || "#eee"};
  color: var(--text-1);
  padding: 5px 14px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

export const ButtonClose = styled.button`
  padding: 0.65rem 1.25rem;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  border: none;
  background: var(--card);
  color: var(--text-2);
  transition: background 0.2s ease;

  &:hover {
    background: var(--border);
    color: var(--text-1);
  }
`;

export const ButtonManage = styled.button`
  padding: 0.65rem 1.25rem;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  border: none;
  background: var(--accent);
  color: var(--bg);
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.88;
  }
`;