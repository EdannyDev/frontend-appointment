import styled from "@emotion/styled";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

export const Title = styled.h1`
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 25px;
`;

export const Card = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

export const CardTitle = styled.div`
  font-size: 14px;
  color: #64748b;
  margin-bottom: 8px;
`;

export const CardValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #0f172a;
`;

export const NextAppointment = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.span`
  font-weight: 600;
  color: #334155;
`;

export const Empty = styled.div`
  color: #64748b;
`;