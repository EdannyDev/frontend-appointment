import styled from "@emotion/styled";

export const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const Card = styled.div`
  width: 100%;
  max-width: 420px;
  background: var(--surface);
  border: 0.5px solid var(--border);
  border-top: 3px solid var(--accent);
  border-radius: var(--radius-lg);
`;

export const CardBody = styled.div`
  padding: 36px 34px;

  @media (max-width: 768px) {
    padding: 28px 22px;
  }
`;

export const Header = styled.div`
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: var(--text-1);
  text-align: center;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

export const Subtitle = styled.p`
  margin-top: 8px;
  font-size: 15px;
  color: var(--text-2);
  line-height: 1.5;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: var(--text-2);
`;

export const Field = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--card);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 0 14px;
  transition: border-color var(--ease);

  &:focus-within {
    border-color: var(--accent);
  }
`;

export const IconWrapper = styled.div`
  color: var(--text-3);
  font-size: 16px;
  flex-shrink: 0;
`;

export const Input = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  background: transparent;
  padding: 13px 0;
  font-size: 15.5px;
  font-family: inherit;
  color: var(--text-1);

  &::placeholder {
    color: var(--text-3);
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const TogglePassword = styled.button`
  all: unset;
  cursor: pointer;
  color: var(--text-3);
  font-size: 16px;
  display: flex;
  align-items: center;
  transition: color var(--ease);
  flex-shrink: 0;

  &:hover {
    color: var(--text-1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Button = styled.button`
  margin-top: 4px;
  padding: 15px;
  border-radius: var(--radius-sm);
  border: none;
  background: var(--accent);
  color: var(--bg);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: opacity var(--ease);

  &:hover:not(:disabled) {
    opacity: 0.88;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(200, 241, 53, 0.28);
  }
`;

export const Footer = styled.div`
  margin-top: 24px;
  text-align: center;
`;

export const LinkText = styled.span`
  font-size: 13.5px;
  color: var(--accent);
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &:hover {
    opacity: 0.8;
  }
`;

export const StrengthBar = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 8px;
`;

export const StrengthSegment = styled.span`
  flex: 1;
  height: 3px;
  border-radius: 999px;
  background: ${({ active, color }) => (active ? color : "var(--border)")};
  transition: background 0.3s ease;
`;

export const StrengthLabel = styled.p`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ color }) => color || "var(--text-3)"};
  margin: 4px 0 0;
`;

export const ErrorBox = styled.div`
  background: rgba(217, 79, 79, 0.08);
  border: 0.5px solid rgba(217, 79, 79, 0.3);
  border-radius: var(--radius-sm);
  padding: 18px;
  margin-bottom: 8px;
  font-size: 14px;
  color: var(--text-1);
  line-height: 1.6;
`;