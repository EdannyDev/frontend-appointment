import styled from "@emotion/styled";

const variants = {
  today: { bg: "#1B3E73", border: "rgba(58, 123, 213, 0.5)", icon: "#8FC0FF" },
  pending: { bg: "#573D13", border: "rgba(201, 138, 26, 0.5)", icon: "#FFD073" },
  cancelled: { bg: "#5C232A", border: "rgba(217, 79, 79, 0.5)", icon: "#FF9D9D" }
};

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Header = styled.div`
  margin-bottom: 30px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

export const Welcome = styled.h1`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--text-1);

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 15px;
  color: var(--text-2);
  margin-bottom: 6px;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export const DateText = styled.p`
  font-size: 13px;
  color: var(--text-3);
`;

export const EmptyState = styled.p`
  text-align: center;
  color: var(--text-3);
  margin-top: 1.5rem;
`;

export const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  margin-bottom: 45px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-bottom: 30px;
  }
`;

export const Card = styled.div`
  background: ${({ variant }) => variants[variant].bg};
  border: 0.5px solid ${({ variant }) => variants[variant].border};
  border-radius: 16px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  svg {
    font-size: 22px;
    color: ${({ variant }) => variants[variant].icon};
  }

  @media (max-width: 768px) {
    padding: 20px;
    gap: 8px;

    svg {
      font-size: 18px;
    }
  }
`;

export const CardTitle = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ variant }) => variants[variant]?.icon || "var(--text-2)"};
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CardValue = styled.strong`
  font-size: 34px;
  font-weight: 700;
  color: var(--text-1);

  @media (max-width: 768px) {
    font-size: 26px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: var(--text-1);

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const AppointmentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

export const AppointmentItem = styled.div`
  background: var(--surface);
  border: 0.5px solid var(--border);
  padding: 20px 20px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: border-color var(--ease);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 16px;
  }
`;

export const AppointmentLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const AppointmentName = styled.p`
  font-weight: 600;
  font-size: 14px;
  color: var(--text-1);
`;

export const AppointmentService = styled.p`
  font-size: 13px;
  color: var(--text-2);
`;

export const AppointmentTime = styled.p`
  font-size: 13px;
  font-weight: 600;
  color: var(--text-2);
  white-space: nowrap;

  @media (max-width: 768px) {
    white-space: normal;
  }
`;