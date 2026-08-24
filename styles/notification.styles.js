import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const slideDownFade = keyframes`
  0% { 
    opacity: 0; 
    transform: translateY(-10px); 
  }
  100% { 
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 30000;
  display: flex;
  flex-direction: column;
  gap: 12px;
  pointer-events: none;
`;

export const NotificationItem = styled.div`
  min-width: 320px;
  max-width: 420px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 500;
  animation: ${slideDownFade} 0.35s ease-out;
  border: 0.5px solid;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.6);

  ${({ type }) => {
    const themes = {
      success: { bg: "#1F5A3C", border: "rgba(29, 158, 117, 0.6)", color: "#5FEEB0" },
      error: { bg: "#5C232A", border: "rgba(217, 79, 79, 0.6)",  color: "#FF9D9D" },
      warning: { bg: "#573D13", border: "rgba(201, 138, 26, 0.6)", color: "#FFD073" },
      info: { bg: "#1B3E73", border: "rgba(58, 123, 213, 0.6)", color: "#8FC0FF" }
    };
    const theme = themes[type] || themes.info;
    return `
      background-color: ${theme.bg};
      border-color: ${theme.border};
      color: ${theme.color};
    `;
  }}

  @media (max-width: 480px) {
    min-width: 0;
    width: calc(100vw - 32px);
    max-width: 400px;
  }
`;

export const IconWrapper = styled.div`
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const Message = styled.div`
  flex: 1;
  line-height: 1.4;
  color: var(--text-1);
`;