import styled from "@emotion/styled";

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

export const Select = styled.select`
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
`;

export const Input = styled.input`
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
`;

export const SaveButton = styled.button`
  all: unset;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 6px;
  background: #0f172a;
  color: white;
  font-weight: 600;

  &:hover {
    background: #020617;
  }
`;

export const Empty = styled.div`
  padding: 20px;
  text-align: center;
  color: #64748b;
`;