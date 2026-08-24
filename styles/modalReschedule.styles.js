import styled from "@emotion/styled";
import { keyframes, css } from "@emotion/react";

const dialogEntrance = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(12px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-12px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(13, 15, 20, 0.75);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`;

export const Dialog = styled.div`
  width: 520px;
  max-width: 95%;
  max-height: 90vh;
  overflow-y: auto;
  background: var(--surface);
  border-radius: var(--radius-xl);
  padding: 1.5rem;
  border: 0.5px solid var(--border);
  box-shadow: 0 0 0 1px var(--border), 0 24px 48px rgba(0, 0, 0, 0.5);
  animation: ${dialogEntrance} 0.22s ease-out;

  @media (max-width: 480px) {
    padding: 1.15rem;
    max-height: 85vh;
  }
`;

export const Title = styled.h2`
  font-size: 1.05rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-1);
  text-align: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const ServiceInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 0.9rem 1rem;
  border-radius: var(--radius-md);
  background: rgba(212, 232, 74, 0.06);
  border: 0.5px solid rgba(212, 232, 74, 0.25);
  font-size: 0.85rem;
  color: var(--text-2);

  strong { 
    color: var(--accent); 
    font-size: 0.9rem; 
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: var(--radius-sm);
  border: 0.5px solid var(--border);
  background: var(--card);
  color: var(--text-1);
  font-size: 0.9rem;
  font-family: inherit;
  transition: border-color var(--ease);

  &::-webkit-calendar-picker-indicator {
    filter: invert(0.8);
    cursor: pointer;
  }

  &:focus { 
    outline: none; 
    border-color: var(--accent); 
  }
`;

export const SlotSection = styled.div`
  margin: 0.5rem 0;
  overflow: hidden;
`;

export const SlotLabel = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 0.8rem;
  color: var(--text-2);
`;

export const BlockNavigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const NavButton = styled.button`
  all: unset;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  border: 0.5px solid var(--border);
  color: var(--text-2);
  cursor: pointer;
  transition: all var(--ease);

  &:hover:not(:disabled) { 
    background: var(--card);
    border-color: var(--accent);
    color: var(--accent);
  }

  &:disabled { 
    opacity: 0.3; 
    cursor: default; 
  }
`;

export const BlockTitle = styled.div`
  min-width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-1);
  text-transform: capitalize;

  svg { 
    color: var(--accent); 
  }
`;

export const SlotsContent = styled.div`
  ${({ direction }) => direction === "right" 
    ? css`animation: ${slideFromRight} 0.22s ease;` 
    : css`animation: ${slideFromLeft} 0.22s ease;`
  }
`;

export const SlotsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(75px, 1fr));
  gap: 0.6rem;
`;

export const Slot = styled.button`
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  font-weight: 500;
  font-size: 0.75rem;
  cursor: pointer;
  border: 0.5px solid ${({ selected }) => selected ? "var(--accent)" : "var(--border)"};
  background: ${({ selected }) => selected ? "var(--accent)" : "var(--card)"};
  color: ${({ selected }) => selected ? "var(--bg)" : "var(--text-2)"};
  font-family: inherit;
  transition: all 0.2s ease;
  
  &:hover { 
    border-color: var(--accent);
    color: ${({ selected }) => selected ? "var(--bg)" : "var(--text-1)"};
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 0.5rem;
  gap: 12px;

  @media (max-width: 480px) {
    flex-direction: column-reverse;
  }
`;

export const CancelButton = styled.button`
  border: 0.5px solid #404660;
  background: transparent;
  min-width: 120px;
  padding: 0.7rem 1.4rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  color: #C5CAD9;
  font-family: inherit;
  transition: all var(--ease);

  &:hover:not(:disabled) { 
    background: var(--card);
    border-color: var(--text-2);
    color: var(--text-1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }
`;

export const SubmitButton = styled.button`
  border: none;
  min-width: 150px;
  padding: 0.7rem 1.5rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  font-family: inherit;
  transition: opacity var(--ease), background var(--ease), color var(--ease);
  background-color: ${({ disabled }) => disabled ? "var(--card)" : "var(--accent)"};
  color: ${({ disabled }) => disabled ? "var(--text-3)" : "var(--bg)"};
  border: 0.5px solid ${({ disabled }) => disabled ? "var(--border)" : "transparent"};

  &:hover:not(:disabled) { 
    opacity: 0.88;
  }
  
  &:disabled { 
    cursor: not-allowed; 
  }

  @media (max-width: 480px) {
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }
`;

export const EmptyState = styled.div`
  padding: 1.5rem;
  text-align: center;
  color: var(--text-3);
  font-size: 0.85rem;
`;

export const SelectedInfo = styled.div`
  font-size: 0.8rem;
  color: var(--text-2);
  text-align: center;

  strong {
    color: var(--accent);
  }
`;