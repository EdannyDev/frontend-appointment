import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const spinCW = keyframes`
  to { 
    transform: rotate(360deg); 
  }
`;

const spinCCW = keyframes`
  to { 
    transform: rotate(-360deg); 
  }
`;

export const Icon = styled.div`
  position: absolute;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  color: var(--text-2);
`;

export const RingOuter = styled.div`
  position: absolute;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 2px solid transparent;
  border-top: 2px solid var(--accent);
  border-right: 2px solid var(--accent);
  animation: ${spinCW} 1.25s linear infinite;
`;

export const RingInner = styled.div`
  position: absolute;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid transparent;
  border-bottom: 2px solid var(--accent-s);
  border-left: 2px solid var(--accent-s);
  animation: ${spinCCW} 1s linear infinite;
`;

export const LoaderWrapper = styled.div`
  position: ${({ fullScreen }) => (fullScreen ? "fixed" : "relative")};
  inset: ${({ fullScreen }) => (fullScreen ? "0" : "unset")};
  z-index: ${({ fullScreen }) => (fullScreen ? "20000" : "1")};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: ${({ fullScreen }) => (fullScreen ? "unset" : "200px")};
  background: ${({ fullScreen }) => fullScreen ? "rgba(13, 15, 20, 0.82)" : "transparent"};
  backdrop-filter: ${({ fullScreen }) => fullScreen ? "blur(6px)" : "none"};
  -webkit-backdrop-filter: ${({ fullScreen }) => fullScreen ? "blur(6px)" : "none"};
`;

export const SpinnerContainer = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
`;