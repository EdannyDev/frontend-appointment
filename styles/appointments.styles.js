import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const STATUS_THEMES = {
  PENDING: { bg: "#573D13", color: "#FFD073" },
  CONFIRMED: { bg: "#1F5A3C", color: "#5FEEB0" },
  CANCELLED: { bg: "#5C232A", color: "#FF9D9D" },
  COMPLETED: { bg: "#1B3E73", color: "#8FC0FF" },
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
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

export const LeftControls = styled.div`
  display: flex;
  gap: 12px;
`;

export const RightControls = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const SearchInput = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--card);
  border: 0.5px solid var(--border);
  padding: 10px 14px;
  border-radius: 10px;
  width: 320px;
  transition: border-color 0.25s ease;

  &:focus-within {
    border-color: var(--accent);
  }

  input {
    flex: 1;
    border: none;
    background: transparent;
    outline: none;
    font-size: 14px;
    color: var(--text-1);
    font-family: inherit;

    &::placeholder {
      color: var(--text-3);
    }
  }

  svg {
    color: var(--text-3);
    transition: color 0.25s ease;
  }

  &:focus-within svg {
    color: var(--accent);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const FilterSelect = styled.select`
  padding: 10px 12px;
  border-radius: 10px;
  border: 0.5px solid var(--border);
  background: var(--card);
  color: var(--text-1);
  font-size: 14px;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.25s ease;

  &:focus {
    outline: none;
    border-color: var(--accent);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
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
    justify-content: space-between;
    align-items: center;
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

export const StatusWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  cursor: ${({ busy }) => (busy ? "not-allowed" : "pointer")};
  opacity: ${({ updating }) => (updating ? 0.5 : 1)};
  background: ${({ status }) => STATUS_THEMES[status]?.bg};
  color: ${({ status }) => STATUS_THEMES[status]?.color};
  transition: opacity 0.2s ease;
`;

export const StatusDropdown = styled.div`
  position: absolute;
  min-width: 160px;
  background: var(--card);
  border: 0.5px solid var(--border);
  border-radius: 10px;
  padding: 6px;
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 4px;
  animation: ${fadeIn} 0.16s ease-out;
  box-shadow: 0 0 0 1px var(--border), 0 16px 32px rgba(0, 0, 0, 0.6);
  transform-origin: ${({ direction }) => direction === "up" ? "bottom" : "top"};

  ${({ direction }) =>
    direction === "up"
      ? `bottom: calc(100% + 8px); top: auto;`
      : `top: calc(100% + 8px); bottom: auto;`
  };

  ${({ align }) =>
    align === "right"
      ? `right: 0; left: auto;`
      : `left: 0; right: auto;`
  };
`;

export const StatusOption = styled.button`
  all: unset;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  background: ${({ status }) => STATUS_THEMES[status]?.bg};
  color: ${({ status }) => STATUS_THEMES[status]?.color};
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.85;
  }
`;

export const Empty = styled.div`
  text-align: center;
  color: var(--text-2);
  padding: 24px;
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