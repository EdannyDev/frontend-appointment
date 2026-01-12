import styled from "@emotion/styled";

const statusColors = {
  PENDING: {
    bg: "#fef9c3",
    color: "#854d0e",
  },
  CONFIRMED: {
    bg: "#dcfce7",
    color: "#166534",
  },
  CANCELLED: {
    bg: "#fee2e2",
    color: "#991b1b",
  },
  COMPLETED: {
    bg: "#e0e7ff",
    color: "#3730a3",
  },
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

export const Th = styled.th`
  padding: 12px;
  background: #f1f5f9;
  font-weight: 600;
`;

export const Td = styled.td`
  text-align: center;
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
`;

export const StatusWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const StatusBadge = styled.span`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  background: ${({ status }) => statusColors[status].bg};
  color: ${({ status }) => statusColors[status].color};
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.85;
  }
`;

export const StatusDropdown = styled.div`
  position: absolute;
  top: 120%;
  left: 0;
  min-width: 160px;
  background: #fff;
  border-radius: 10px;
  padding: 6px;
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StatusOption = styled.button`
  all: unset;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  background: ${({ status }) => statusColors[status].bg};
  color: ${({ status }) => statusColors[status].color};
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.85;
  }
`;

export const Empty = styled.div`
  padding: 20px;
  text-align: center;
  color: #64748b;
`;