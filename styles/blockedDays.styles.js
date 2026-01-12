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

export const Form = styled.form`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const Input = styled.input`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  font-size: 14px;
`;

export const Button = styled.button`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 10px 14px;
  border-radius: 8px;
  border: none;
  background: #0f172a;
  color: white;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  text-align: center;
  padding: 12px;
  background: #f1f5f9;
  font-weight: 600;
`;

export const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
  text-align: center;
`;

export const DeleteButton = styled.button`
  all: unset;
  cursor: pointer;
  color: #dc2626;
  font-size: 18px;

  &:hover {
    opacity: 0.9;
  }
`;

export const Empty = styled.div`
  padding: 20px;
  text-align: center;
  color: #64748b;
`;