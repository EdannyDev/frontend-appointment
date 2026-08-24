import styled from "@emotion/styled";

const STAT_THEMES = {
  active: { bg: "#573D13", border: "rgba(201, 138, 26, 0.5)", text: "#FFD073" },
  completed: { bg: "#1B3E73", border: "rgba(58, 123, 213, 0.5)", text: "#8FC0FF" },
  cancelled: { bg: "#5C232A", border: "rgba(217, 79, 79, 0.5)", text: "#FF9D9D" },
};

const STATUS_COLORS = {
  PENDING: "#C98A1A",
  CONFIRMED: "#1D9E75",
  COMPLETED: "#3A7BD5",
  CANCELLED: "#D94F4F",
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

export const WelcomeSection = styled.section`
  margin-bottom: -0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const TimeBadge = styled.span`
  margin-top: 25px;
  background: var(--card);
  border: 0.5px solid var(--border);
  padding: 0.3rem 0.6rem;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-2);
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.4rem;
    color: var(--accent);
  }

  @media (max-width: 768px) {
    margin-top: 4px;
  }
`;

export const Greeting = styled.h1`
  font-size: 2.1rem;
  font-weight: 600;
  color: var(--text-1);
  margin: 0;

  span {
    display: block;
    font-size: 0.95rem;
    font-weight: 400;
    color: var(--text-2);
    margin-top: 0.3rem;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;

    span {
      font-size: 0.85rem;
    }
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.2rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const Card = styled.div`
  background: var(--surface);
  border-radius: var(--radius-xl);
  padding: 1.5rem;
  border: 0.5px solid var(--border);

  @media (max-width: 768px) {
    padding: 1.15rem;
  }
`;

export const BookingActions = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 1.25rem;
  }
`;

export const BookingCard = styled.div`
  background: var(--surface);
  border-radius: var(--radius-xl);
  padding: 1.5rem;
  border: 0.5px solid var(--border);
  border-top: 3px solid var(--accent);
  display: flex;
  flex-direction: column;
  min-height: 250px;

  @media (max-width: 768px) {
    padding: 1.15rem;
    min-height: auto;
  }
`;

export const StatsCardWrapper = styled.div`
  background: var(--surface);
  border-radius: var(--radius-xl);
  padding: 1.5rem;
  border: 0.5px solid var(--border);
  border-top: 3px solid var(--text-3);
  display: flex;
  flex-direction: column;
  min-height: 250px;

  @media (max-width: 768px) {
    padding: 1.15rem;
    min-height: auto;
  }
`;

export const Hero = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  background: var(--card);
  border: 0.5px solid var(--border);
  color: var(--text-1);
  border-radius: var(--radius-xl);
  padding: 2rem;

  span {
    font-size: 0.85rem;
    color: var(--text-1);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  @media (max-width: 768px) {
    padding: 1.25rem;
    gap: 1rem;
  }
`;

export const Title = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--text-1);
  display: flex;
  align-items: center;
  gap: 0.4rem;

  svg {
    color: ${({ color }) => (color === "booking" ? "var(--accent)" : "var(--text-2)")};
  }

  @media (max-width: 768px) {
    margin-bottom: 1.15rem;
  }
`;

export const HeroInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 0.75rem;
  }
`;

export const HeroTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: var(--text-1);

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const HeroDate = styled.div`
  margin-top: 0.4rem;
  font-size: 0.85rem;
  color: var(--text-2);
  display: flex;
  align-items: center;
  gap: 0.35rem;

  svg {
    color: var(--accent);
  }
`;

export const RescheduleHeroButton = styled.button`
  border: 0.5px solid var(--accent-s);
  padding: 0.7rem 1.2rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  transition: all var(--ease);
  background-color: var(--card);
  color: var(--accent-s);

  &:hover:not(:disabled) {
    border-color: var(--accent);
    color: var(--accent);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const CancelButton = styled.button`
  border: 0.5px solid #404660;
  padding: 0.7rem 1.2rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  transition: all var(--ease);
  background: transparent;
  color: #C5CAD9;

  &:hover:not(:disabled) {
    background: var(--card);
    border-color: var(--text-2);
    color: var(--text-1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const CancelBooking = styled.button`
  border: none;
  padding: 0.7rem 1.2rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--ease);
  background-color: var(--card);
  color: var(--text-2);

  &:hover:not(:disabled) {
    background-color: var(--border);
    color: var(--text-1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const CancelAppointment = styled.button`
  border: none;
  padding: 0.4rem 0.6rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-weight: 600;
  font-size: 0.78rem;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  transition: opacity var(--ease);
  background-color: #a81125;
  color: var(--text-1);

  &:hover:not(:disabled) {
    opacity: 0.85;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const RescheduleButton = styled.button`
  border: none;
  padding: 0.4rem 0.9rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-weight: 600;
  font-size: 0.8rem;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  transition: opacity var(--ease);
  background-color: var(--accent);
  color: var(--bg);

  &:hover:not(:disabled) {
    opacity: 0.88;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const DarkButton = styled.button`
  border: none;
  padding: 0.7rem 2rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity var(--ease);
  background-color: var(--accent);
  color: var(--bg);
  margin-top: auto;
  width: fit-content;
  align-self: center;

  &:hover:not(:disabled) {
    opacity: 0.88;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: var(--card);
    color: var(--text-3);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Row = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: ${({ margin }) => margin || "0"};
`;

export const Select = styled.select`
  flex: 1;
  padding: 0.75rem;
  border-radius: var(--radius-sm);
  border: 0.5px solid var(--border);
  background: var(--card);
  color: var(--text-1);
  font-size: 0.9rem;
  font-family: inherit;
  transition: border-color var(--ease);

  &:focus {
    outline: none;
    border-color: var(--accent);
  }

  @media (max-width: 768px) {
    flex: 1 1 100%;
  }
`;

export const Input = styled.input`
  flex: 1;
  padding: 0.75rem;
  border-radius: var(--radius-sm);
  border: 0.5px solid var(--border);
  background: var(--card);
  color: var(--text-1);
  font-size: 0.9rem;
  font-family: inherit;
  height: 44px;
  transition: border-color var(--ease);

  &::-webkit-calendar-picker-indicator {
    filter: invert(0.8);
    cursor: pointer;
  }

  &:focus {
    outline: none;
    border-color: var(--accent);
  }

  @media (max-width: 768px) {
    flex: 1 1 100%;
  }
`;

export const DurationText = styled.div`
  margin-top: 1.2rem;
  font-size: 0.85rem;
  color: var(--text-2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;

  svg {
    color: var(--accent);
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

export const DurationLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const SelectedHour = styled.div`
  font-weight: 600;
  color: var(--accent);
  font-size: 0.85rem;
  white-space: nowrap;
`;

export const SlotSection = styled.div`
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  width: 100%;
`;

export const SlotLabel = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 0.8rem;
  color: var(--text-2);
`;

export const SlotsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(75px, 1fr));
  gap: 0.6rem;
`;

export const Slot = styled.button`
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  font-weight: 500;
  font-size: 0.75rem;
  font-family: inherit;
  cursor: pointer;
  border: 0.5px solid ${({ selected }) => (selected ? "var(--accent)" : "var(--border)")};
  background: ${({ selected }) => (selected ? "var(--accent)" : "var(--card)")};
  color: ${({ selected }) => (selected ? "var(--bg)" : "var(--text-2)")};
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--accent);
    color: ${({ selected }) => (selected ? "var(--bg)" : "var(--text-1)")};
  }
`;

export const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

export const StatCard = styled.div`
  background: ${({ type }) => (type ? STAT_THEMES[type].bg : "var(--card)")};
  border: 0.5px solid ${({ type }) => (type ? STAT_THEMES[type].border : "var(--border)")};
  padding: 0.8rem 0.4rem;
  border-radius: var(--radius-md);
  text-align: center;

  strong {
    display: block;
    font-size: 1.15rem;
    color: ${({ type }) => (type ? STAT_THEMES[type].text : "var(--text-1)")};
  }

  div {
    font-size: 0.62rem;
    color: ${({ type }) => (type ? STAT_THEMES[type].text : "var(--text-2)")};
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    opacity: 0.85;
  }

  @media (max-width: 768px) {
    padding: 0.65rem 0.3rem;

    strong {
      font-size: 1rem;
    }

    div {
      font-size: 0.56rem;
    }
  }
`;

export const TipBox = styled.div`
  margin-top: auto;
  padding: 0.7rem;
  background: var(--card);
  border-radius: var(--radius-md);
  font-size: 0.78rem;
  color: var(--text-2);
  border: 0.5px solid var(--border);
  display: flex;
  align-items: center;
  gap: 0.4rem;

  svg {
    color: var(--warning);
    flex-shrink: 0;
  }

  strong {
    color: var(--text-1);
  }

  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

export const AppointmentItem = styled.div`
  padding: 1rem;
  border-radius: var(--radius-lg);
  border: 0.5px solid var(--border);
  background: var(--card);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
  transition: all 0.2s ease-in-out;

  ${({ canModify }) =>
    canModify &&
    `&:hover {
      border-color: var(--accent);
      transform: translateX(4px);
    }`
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;

    ${({ canModify }) =>
      canModify &&
      `&:hover {
        transform: none;
      }`
    }
  }
`;

export const AppointmentInfo = styled.div`
  strong {
    font-size: 0.95rem;
    color: var(--text-1);
    font-weight: 600;
  }

  div {
    color: var(--text-2);
    font-size: 0.82rem;
    margin-top: 0.25rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
`;

export const Status = styled.span`
  font-size: 0.62rem;
  font-weight: 700;
  padding: 0.3rem 0.6rem;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  color: var(--text-1);
  background-color: ${({ status }) => STATUS_COLORS[status] || "var(--text-3)"};
  text-transform: uppercase;
  letter-spacing: 0.02em;
  min-width: 80px;
`;

export const HeroStatus = styled(Status)`
  padding: 0.25rem 0.55rem;
`;

export const EmptyState = styled.div`
  padding: 1.5rem;
  text-align: center;
  color: var(--text-3);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  font-size: 0.85rem;

  svg {
    font-size: 1.4rem;
    opacity: 0.6;
  }
`;