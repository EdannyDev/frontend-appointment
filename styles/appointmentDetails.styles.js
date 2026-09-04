import styled from "@emotion/styled";
import { STATUS_THEME } from "@/utils/statusTheme";

export const DetailsWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

export const HeaderSection = styled.header`
  margin-bottom: 2.5rem;

  @media (max-width: 768px) {
    margin-bottom: 1.75rem;
  }
`;

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 0.75rem;
  }
`;

export const MainTitle = styled.h1`
  font-size: 2rem;
  color: var(--text-1);
  margin: 0;
  font-weight: 800;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: var(--text-2);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  padding: 0;
  font-family: inherit;
  transition: color 0.2s ease;

  &:hover {
    color: var(--accent);
  }
`;

export const ContentGrid = styled.main`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
`;

export const CardsContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

export const InfoCard = styled.div`
  background: var(--surface);
  border: 0.5px solid var(--border);
  border-radius: 16px;
  padding: 1.5rem;

  @media (max-width: 768px) {
    padding: 1.15rem;
  }
`;

export const CardHeader = styled.h2`
  font-size: 1.1rem;
  color: var(--text-1);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  padding-bottom: 0.75rem;
  border-bottom: 0.5px solid var(--border);

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.15rem;
  }
`;

export const DataRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    align-items: flex-start;
    gap: 0.75rem;
  }
`;

export const Label = styled.span`
  color: var(--text-2);
  font-size: 0.95rem;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

export const Value = styled.strong`
  color: ${(props) => (props.highlight ? "var(--accent)" : "var(--text-1)")};
  font-size: ${(props) => (props.highlight ? "1.25rem" : "1rem")};
  font-weight: 700;
  text-align: right;

  @media (max-width: 768px) {
    font-size: ${(props) => (props.highlight ? "1.1rem" : "0.9rem")};
  }
`;

export const ActionSidebar = styled.aside`
  background: var(--surface);
  border: 0.5px solid var(--border);
  border-radius: 16px;
  padding: 1.5rem;
  height: fit-content;
  position: sticky;
  top: 6rem;

  @media (max-width: 768px) {
    position: static;
    padding: 1.15rem;
  }
`;

export const SidebarTitle = styled.h3`
  margin-bottom: 1.25rem;
  color: var(--text-2);
  font-size: 1.2rem;
  letter-spacing: 1px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1.05rem;
    margin-bottom: 1rem;
  }
`;

export const BaseButton = styled.button`
  width: 100%;
  padding: 1rem;
  border-radius: 10px;
  border: none;
  font-weight: 700;
  margin-bottom: 1rem;
  cursor: pointer;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  transition: all 0.2s ease-in-out;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PrimaryAction = styled(BaseButton)`
  background: var(--accent);
  color: var(--bg);

  &:hover:not(:disabled) {
    opacity: 0.88;
  }
`;

export const SecondaryAction = styled(BaseButton)`
  background: transparent;
  border: 0.5px solid #404660;
  color: #C5CAD9;

  &:hover:not(:disabled) {
    background: var(--card);
    border-color: var(--text-2);
    color: var(--text-1);
  }
`;

export const StatusTag = styled.span`
  background: ${(props) => STATUS_THEME[props.status]?.bg};
  color: ${(props) => STATUS_THEME[props.status]?.text};
  padding: 0.5rem 1rem;
  border-radius: 99px;
  font-weight: 700;
  font-size: 0.8rem;
  border: 0.5px solid currentColor;
  white-space: nowrap;
`;

export const PolicyBox = styled.div`
  display: flex;
  gap: 0.5rem;
  color: var(--text-2);
  font-size: 0.85rem;
  line-height: 1.5;
  margin-top: 1rem;
  padding: 1rem;
  background: var(--card);
  border-radius: 10px;
  border: 0.5px solid var(--border);

  svg {
    color: var(--accent);
    font-size: 1rem;
    margin-top: 13px;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    padding: 0.85rem;
    font-size: 0.8rem;

    svg {
      margin-top: 3px;
    }
  }
`;