import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
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
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
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

export const Textarea = styled.textarea`
  padding: 10px 12px;
  border-radius: 8px;
  background: var(--card);
  color: var(--text-1);
  font-family: inherit;
  border: 0.5px solid var(--border);
  font-size: 14px;
  resize: vertical;
  min-width: 230px;
  height: 38.4px;
  transition: border-color 0.25s ease;

  &::placeholder {
    color: var(--text-3);
  }

  &:focus {
    outline: none;
    border-color: var(--accent);
  }

  @media (max-width: 768px) {
    width: 100%;
    min-width: 0;
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
  opacity: ${({ inactive }) => (inactive ? 0.5 : 1)};

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
      opacity: 1;
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

export const StatusBadge = styled.span`
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ active }) => (active ? "#5FEEB0" : "#FF9D9D")};
  background: ${({ active }) => (active ? "#1F5A3C" : "#5C232A")};
`;

export const ActionButton = styled.button`
  all: unset;
  font-size: 15px;
  margin-right: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity 0.2s ease;
  color: ${({ variant }) =>
    variant === "edit"
      ? "var(--warning)"
      : variant === "danger"
      ? "var(--danger)"
      : "var(--accent)"
  };

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
`;

export const DurationWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const DurationTooltip = styled.div`
  position: absolute;
  top: -35px;
  left: 50%;
  transform: ${({ visible }) => (visible ? "translate(-50%, 0)" : "translate(-50%, 6px)")};
  background: var(--card);
  border: 0.5px solid var(--text-3);
  color: var(--text-1);
  font-size: 12px;
  font-weight: 600;
  padding: 6px 10px;
  border-radius: 8px;
  white-space: nowrap;
  pointer-events: none;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: all 0.15s ease;
  z-index: 5;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid var(--text-3);
  }

  @media (max-width: 768px) {
    top: calc(100% + 8px);
    bottom: auto;
    transform: ${({ visible }) => (visible ? "translate(-50%, 0)" : "translate(-50%, -6px)")};

    &::after {
      top: auto;
      bottom: 100%;
      border-top: none;
      border-bottom: 6px solid var(--text-3);
    }
  }
`;