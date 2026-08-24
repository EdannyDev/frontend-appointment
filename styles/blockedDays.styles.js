import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  color: var(--text-1);

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

export const PageSubtitle = styled.p`
  font-size: 14px;
  color: var(--text-2);
  margin-top: -16px;
`;

export const Form = styled.form`
  display: flex;
  gap: 12px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
`;

export const Input = styled.input`
  padding: 10px 12px;
  border-radius: 8px;
  background: var(--card);
  border: 0.5px solid var(--border);
  color: var(--text-1);
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.25s ease;

  &::-webkit-calendar-picker-indicator {
    filter: invert(0.8);
    cursor: pointer;
  }

  &::placeholder {
    color: var(--text-3);
  }

  &:focus {
    outline: none;
    border-color: var(--accent);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Button = styled.button`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 10px 14px;
  border-radius: 8px;
  border: none;
  background: var(--accent);
  color: var(--bg);
  font-weight: 600;
  font-size: 14px;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover:not(:disabled) {
    opacity: 0.88;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: var(--card);
    color: var(--text-3);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: var(--surface);
  border: 0.5px solid var(--border);
  border-radius: 12px;
  overflow: hidden;

  @media (max-width: 768px) {
    display: block;
    background: transparent;
    border: none;
    overflow: visible;
  }
`;

export const Th = styled.th`
  padding: 12px 14px;
  background: var(--card);
  font-weight: 600;
  font-size: 13px;
  color: var(--text-2);
  border-bottom: 0.5px solid var(--border);
  text-align: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Td = styled.td`
  padding: 16px 14px;
  text-align: center;
  font-size: 14px;
  color: var(--text-1);
  border-bottom: 0.5px solid var(--border);

  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    text-align: right;
    padding: 10px 14px;

    &::before {
      content: attr(data-label);
      font-size: 12px;
      font-weight: 600;
      color: var(--text-2);
      text-align: left;
    }
  }
`;

export const StyledTbody = styled.tbody`
  tr:nth-of-type(even) {
    background: var(--card);
  }

  tr:last-of-type td {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 12px;

    tr {
      display: block;
      background: var(--surface) !important;
      border: 0.5px solid var(--border);
      border-radius: 12px;
      overflow: hidden;
    }

    tr:last-of-type td {
      border-bottom: 0.5px solid var(--border);
    }

    tr:last-of-type td:last-of-type {
      border-bottom: none;
    }
  }
`;

export const DeleteButton = styled.button`
  all: unset;
  cursor: pointer;
  color: var(--danger);
  font-size: 16px;
  transition: opacity 0.2s ease;

  &:hover:not(:disabled) {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const Empty = styled.div`
  text-align: center;
  color: var(--text-2);
  padding: 24px;
  font-size: 14px;
`;