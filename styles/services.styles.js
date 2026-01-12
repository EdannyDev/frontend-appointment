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
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
`;

export const Input = styled.input`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  font-size: 14px;
  min-width: 160px;
`;

export const Textarea = styled.textarea`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  font-size: 14px;
  resize: vertical;
  min-width: 260px;
`;

export const Button = styled.button`
  padding: 10px 14px;
  border-radius: 8px;
  border: none;
  background: #0f172a;
  color: white;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #020617;
  }
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
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #e5e7eb;
  background: ${({ inactive }) => (inactive ? "#f8fafc" : "white")};
  opacity: ${({ inactive }) => (inactive ? 0.6 : 1)};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StatusBadge = styled.span`
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ active }) => (active ? "#166534" : "#991b1b")};
  background: ${({ active }) => (active ? "#dcfce7" : "#fee2e2")};
`;

export const ActionButton = styled.button`
  all: unset;
  cursor: pointer;
  font-size: 16px;
  margin-right: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  color: ${({ variant }) =>
    variant === "edit"
      ? "#ca8a04"
      : variant === "danger"
      ? "#dc2626"
      : "#0f172a"};

  &:hover {
    color: ${({ variant }) =>
      variant === "edit"
        ? "#a16207"
        : variant === "danger"
        ? "#b91c1c"
        : "#020617"};
  }
`;

export const Empty = styled.div`
  padding: 24px;
  text-align: center;
  color: #64748b;
`;