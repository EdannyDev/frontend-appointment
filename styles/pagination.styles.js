import styled from "@emotion/styled";

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 16px;

  @media (max-width: 480px) {
    gap: 5px;
  }
`;

export const PageButton = styled.button`
  border: 0.5px solid var(--border);
  cursor: pointer;
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  background: ${({ active }) => (active ? "var(--accent)" : "var(--card)")};
  color: ${({ active }) => (active ? "var(--bg)" : "var(--text-2)")};
  font-weight: 600;
  font-size: 13px;
  font-family: inherit;
  transition: all var(--ease);

  &:hover:not(:disabled) {
    background: ${({ active }) => (active ? "var(--accent)" : "var(--surface)")};
    border-color: ${({ active }) => (active ? "var(--accent)" : "var(--text-3)")};
    color: ${({ active }) => (active ? "var(--bg)" : "var(--text-1)")};
  }

  &:disabled {
    cursor: default;
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  @media (max-width: 480px) {
    padding: 5px 9px;
    font-size: 12px;
  }
`;

export const IconButton = styled.button`
  border: 0.5px solid var(--border);
  background: var(--card);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 10px;
  border-radius: var(--radius-sm);
  color: var(--text-2);
  font-size: 13px;
  transition: all var(--ease);

  &:hover:not(:disabled) {
    background: var(--surface);
    border-color: var(--text-3);
    color: var(--text-1);
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  @media (max-width: 480px) {
    padding: 5px 8px;
    font-size: 12px;
  }
`;

export const Ellipsis = styled.span`
  padding: 6px 8px;
  color: var(--text-3);
  font-weight: 600;
  font-size: 13px;

  @media (max-width: 480px) {
    padding: 5px 4px;
    font-size: 12px;
  }
`;