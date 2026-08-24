import styled from "@emotion/styled";

export const Page = styled.div`
  max-width: 640px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const PageHeader = styled.div`
  padding-bottom: 1.75rem;

  @media (max-width: 768px) {
    padding-bottom: 1.25rem;
  }
`;

export const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-1);
  margin: 0 0 4px;
`;

export const PageSubtitle = styled.p`
  font-size: 0.875rem;
  color: var(--text-2);
  margin: 0;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 0.5px solid var(--border);
  margin: 0;
`;

export const Section = styled.div`
  padding: 1.75rem 0;

  @media (max-width: 768px) {
    padding: 1.25rem 0;
  }
`;

export const DangerSection = styled.div`
  padding: 1.75rem 0;

  @media (max-width: 768px) {
    padding: 1.25rem 0;
  }
`;

export const SectionHead = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.25rem;

  svg {
    font-size: 1rem;
    color: ${({ danger }) => (danger ? "#FF8F8F" : "var(--accent)")};
  }
`;

export const SectionTitle = styled.h2`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ danger }) => (danger ? "#FF8F8F" : "var(--text-1)")};
  margin: 0;
  letter-spacing: 0.01em;
`;

export const AccountBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    margin-bottom: 1.15rem;
  }
`;

export const Avatar = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(212, 232, 74, 0.12);
  border: 0.5px solid rgba(212, 232, 74, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--accent);
  flex-shrink: 0;
  user-select: none;
`;

export const AccountInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const AccountName = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-1);
  margin: 0;
`;

export const AccountEmail = styled.p`
  font-size: 0.8rem;
  color: var(--text-2);
  margin: 0;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 1rem;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const Label = styled.label`
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-2);
`;

export const FieldWrap = styled.div`
  display: flex;
  align-items: center;
  background: var(--card);
  border: 0.5px solid var(--border);
  border-radius: 8px;
  padding: 0 12px;
  height: 40px;
  transition: border-color 0.25s ease;

  &:focus-within {
    outline: none;
    border-color: var(--accent);
  }
`;

export const FieldIcon = styled.div`
  display: flex;
  align-items: center;
  color: var(--accent-s);
  font-size: 0.875rem;
  flex-shrink: 0;
`;

export const Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  color: var(--text-1);
  font-family: inherit;
  padding: 10px 12px;

  &::placeholder {
    color: var(--text-3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ToggleBtn = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: var(--text-3);
  font-size: 0.875rem;
  transition: color 0.2s ease;
  flex-shrink: 0;

  &:hover {
    color: var(--text-1);
  }
`;

export const SaveButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 18px;
  border-radius: 10px;
  border: none;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  margin-top: 1.25rem;
  transition: opacity 0.2s ease;
  background: var(--accent);
  color: var(--bg);

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

export const DangerButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 18px;
  border-radius: 10px;
  border: none;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.2s ease;
  background: #a81125;
  color: var(--text-1);

  &:hover:not(:disabled) {
    opacity: 0.85;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

export const StrengthBar = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 4px;
`;

export const StrengthSegment = styled.span`
  flex: 1;
  height: 4px;
  border-radius: 8px;
  background: ${({ active, color }) => (active ? color : "var(--border)")};
  transition: background 0.3s ease;
`;

export const StrengthLabel = styled.p`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ color }) => color || "var(--text-3)"};
  margin: 2px 0 0;
`;

export const DangerDesc = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 0.875rem;
  color: var(--text-2);
  line-height: 1.6;
  margin-bottom: 1.25rem;
  padding: 0.875rem 1rem;
  background: #481A1F;
  border-radius: 10px;
  border: 0.5px solid rgba(217, 79, 79, 0.4);

  svg {
    color: #FF8F8F;
    font-size: 0.9rem;
    flex-shrink: 0;
    margin-top: 3px;
  }
`;