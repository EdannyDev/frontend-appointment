import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

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

const pulse = keyframes`
  0% { 
    transform: scale(1); 
  }
  50% { 
    transform: scale(1.08); 
  }
  100% { 
    transform: scale(1); 
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
  width: 440px;
  max-width: 92%;
  background: var(--surface);
  border: 0.5px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px 26px 24px;
  box-shadow: 0 0 0 1px var(--border), 0 24px 48px rgba(0, 0, 0, 0.5);
  animation: ${dialogEntrance} 0.22s ease-out;

  @media (max-width: 480px) {
    padding: 22px 20px 20px;
  }
`;

export const DialogTitle = styled.h3`
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-1);
  margin-bottom: 15px;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const DialogBody = styled.div`
  text-align: center;
  padding: 0 10px;
`;

export const WarningIcon = styled.div`
  font-size: 44px;
  color: var(--warning);
  margin-bottom: 10px;
  animation: ${pulse} 1s infinite;

  @media (max-width: 480px) {
    font-size: 36px;
  }
`;

export const DialogMessage = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-2);
`;

export const DialogFooter = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;

  @media (max-width: 480px) {
    flex-direction: column-reverse;
  }
`;

export const CancelAction = styled.button`
  all: unset;
  cursor: pointer;
  padding: 11px 26px;
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-weight: 600;
  background: transparent;
  border: 0.5px solid #404660;
  color: #C5CAD9;
  text-align: center;
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
    box-sizing: border-box;
  }
`;

export const ConfirmAction = styled.button`
  all: unset;
  cursor: pointer;
  padding: 11px 28px;
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-weight: 600;
  background: #a81125;
  color: var(--text-1);
  text-align: center;
  transition: opacity var(--ease), box-shadow var(--ease);
  box-shadow: 0 0 0 1px rgba(199, 56, 74, 0.4);

  &:hover:not(:disabled) {
    opacity: 0.85;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    width: 100%;
    box-sizing: border-box;
  }
`;