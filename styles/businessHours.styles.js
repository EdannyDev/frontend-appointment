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

export const HelperText = styled.div`
  font-size: 14px;
  color: var(--text-2);
  margin-top: -16px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: var(--surface);
  border: 0.5px solid var(--border);
  border-radius: 12px;

  @media (max-width: 768px) {
    display: block;
    background: transparent;
    border: none;
  }
`;

export const Th = styled.th`
  padding: 12px 14px;
  background: var(--card);
  font-weight: 600;
  font-size: 13px;
  color: var(--text-2);
  border-bottom: 0.5px solid var(--border);

  &:first-of-type {
    border-top-left-radius: 12px;
  }

  &:last-of-type {
    border-top-right-radius: 12px;
  }

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
    border-bottom: 0.5px solid var(--border);

    &::before {
      content: attr(data-label);
      font-size: 12px;
      font-weight: 600;
      color: var(--text-2);
      text-align: left;
    }

    &:last-of-type {
      border-bottom: none;
    }
  }
`;

export const Input = styled.input`
  padding: 8px 10px;
  border-radius: 8px;
  border: 0.5px solid var(--border);
  background: var(--card);
  color: var(--text-1);
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.25s ease;

  &::-webkit-calendar-picker-indicator {
    filter: invert(0.8);
    cursor: pointer;
  }

  &:focus {
    outline: none;
    border-color: var(--accent);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const SaveButton = styled.button`
  all: unset;
  cursor: pointer;
  padding: 8px 14px;
  border-radius: 8px;
  background: var(--accent);
  color: var(--bg);
  font-weight: 600;
  font-size: 13px;
  font-family: inherit;
  transition: opacity 0.2s ease;
  border: 1px solid transparent;

  &:hover:not(:disabled) {
    opacity: 0.88;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: var(--card);
    color: var(--text-3);
    border-color: var(--text-3);
  }
`;

export const Empty = styled.div`
  text-align: center;
  color: var(--text-2);
`;

export const StyledTbody = styled.tbody`
  tr:nth-of-type(even) {
    background: var(--card);
  }

  tr:last-of-type td:first-of-type {
    border-bottom-left-radius: 12px;
  }

  tr:last-of-type td:last-of-type {
    border-bottom-right-radius: 12px;
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

    tr:last-of-type td:first-of-type,
    tr:last-of-type td:last-of-type {
      border-radius: 0;
    }

    tr:last-of-type td {
      border-bottom: 0.5px solid var(--border);
    }

    tr:last-of-type td:last-of-type {
      border-bottom: none;
    }
  }
`;

export const ToggleButton = styled.button`
  all: unset;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  transition: opacity 0.2s ease;
  background: ${(props) => (props.active ? "#1F5A3C" : "#5C232A")};
  color: ${(props) => (props.active ? "#5FEEB0" : "#FF9D9D")};

  &:hover:not(:disabled) {
    opacity: 0.85;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;