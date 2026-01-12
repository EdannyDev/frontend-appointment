import styled from "@emotion/styled";

export const Page = styled.div`
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const Section = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
  align-items: center;
`;

export const Select = styled.select`
  flex: 1;
  padding: 8px;
`;

export const Input = styled.input`
  padding: 8px;
`;

export const Slots = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

export const SlotButton = styled.button`
  padding: 8px 12px;
  border: 1px solid #ccc;
  background: ${({ active }) => (active ? "#222" : "#fff")};
  color: ${({ active }) => (active ? "#fff" : "#000")};
  cursor: pointer;
`;

export const Button = styled.button`
  padding: 10px 16px;
  cursor: pointer;
`;

export const Divider = styled.hr`
  margin: 30px 0;
`;

export const Appointments = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const AppointmentCard = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  border: 1px solid #ddd;
`;

export const CancelButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: red;
`;

export const EmptyState = styled.div`
  padding: 20px;
  text-align: center;
  color: #666;
  font-size: 14px;
  border: 1px dashed #ccc;
  border-radius: 6px;
  margin-bottom: 20px;
`;

export const NextAppointmentCard = styled.div`
  padding: 16px;
  border: 2px solid #222;
  border-radius: 8px;
  margin-bottom: 20px;
  background: #f9f9f9;
`;

export const StatusBadge = styled.span`
  display: inline-block;
  margin-top: 6px;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  background-color: ${({ status }) => {
    switch (status) {
      case "PENDING":
        return "#f59e0b";
      case "CONFIRMED":
        return "#16a34a";
      case "COMPLETED":
        return "#3b82f6";
      case "CANCELLED":
        return "#dc2626";
      default:
        return "#6b7280";
    }
  }};
`;