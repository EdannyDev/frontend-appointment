import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const dropdownFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const NavbarContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  height: 64px;
  padding: 0 2rem;
  transition: background 0.3s ease, box-shadow 0.3s ease;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  justify-content: space-between;
  border-bottom: 0.5px solid var(--border);
  background: ${({ scrolled }) =>
    scrolled ? "rgba(22, 24, 32, 0.95)" : "rgba(13, 15, 20, 0.75)"};
  box-shadow: ${({ scrolled }) =>
    scrolled ? "0 1px 0 var(--border)" : "none"};

  @media (max-width: 768px) {
    padding: 0 1.25rem;
  }
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: var(--text-1);

  svg {
    color: var(--accent);
    font-size: 1.1rem;
  }
`;

export const Brand = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-1);
  letter-spacing: -0.01em;
`;

export const Divider = styled.span`
  color: var(--border);
  font-weight: 300;
  font-size: 1rem;
`;

export const Nav = styled.nav`
  position: relative;
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Indicator = styled.div`
  position: absolute;
  bottom: -2px;
  height: 2px;
  border-radius: 999px;
  background: var(--accent);
  left: ${({ indLeft }) => indLeft ?? 0}px;
  width: ${({ indWidth }) => indWidth ?? 0}px;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition:
    left 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    width 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.2s ease;
`;

export const NavItem = styled.span`
  position: relative;
  font-size: 0.9rem;
  cursor: pointer;
  color: var(--text-2);
  transition: color var(--ease);

  &:hover {
    color: var(--text-1);
  }

  &.active {
    font-weight: 600;
    color: var(--text-1);
  }

  &.disabled {
    pointer-events: none;
    cursor: default;
  }
`;

export const RightSection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const HamburgerButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.15rem;
  color: var(--text-2);
  align-items: center;
  transition: color var(--ease);

  &:hover {
    color: var(--accent);
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

export const MobileNavItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.8rem;
  width: 100%;
  cursor: pointer;
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-weight: 500;
  color: var(--text-2);
  transition: background var(--ease), color var(--ease);

  svg {
    font-size: 13px;
    color: var(--text-3);
    transition: color var(--ease);
  }

  &:hover {
    background: var(--surface);
    color: var(--accent);

    svg {
      color: var(--accent);
    }
  }

  &.active {
    color: var(--accent);
    font-weight: 600;
    pointer-events: none;
    cursor: default;

    svg {
      color: var(--accent);
    }
  }
`;

export const MenuDivider = styled.div`
  height: 1px;
  background: var(--border);
  margin: 4px 2px;
`;

export const UserButton = styled.button`
  background: transparent;
  border: none;
  cursor: ${({ active }) => (active ? "default" : "pointer")};
  font-size: 1.1rem;
  color: var(--text-2);
  display: flex;
  align-items: center;
  transition: color var(--ease);

  ${({ active }) =>
    !active &&
    `&:hover {
      color: var(--accent);
    }`
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Dropdown = styled.div`
  position: absolute;
  right: 0;
  top: 130%;
  background: var(--card);
  border: 0.5px solid var(--border);
  border-radius: var(--radius-md);
  padding: 0.4rem;
  min-width: 185px;
  box-shadow: 0 0 0 1px var(--border), 0 16px 32px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  gap: 2px;
  animation: ${dropdownFade} 0.18s ease-out;
`;

export const DropdownItem = styled.button`
  background: transparent;
  border: none;
  padding: 0.6rem 0.8rem;
  width: 100%;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-weight: 500;
  color: var(--text-2);
  transition: background var(--ease), color var(--ease);

  svg {
    font-size: 13px;
    color: var(--text-3);
    transition: color var(--ease);
  }

  &:hover {
    background: var(--surface);
    color: var(--accent);

    svg {
      color: var(--accent);
    }
  }
`;

export const LogoutItem = styled.button`
  background: transparent;
  border: none;
  padding: 0.6rem 0.8rem;
  width: 100%;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-weight: 500;
  color: var(--danger);
  transition: background var(--ease), color var(--ease);

  svg {
    font-size: 13px;
    color: var(--danger);
  }

  &:hover {
    background: rgba(217, 79, 79, 0.10);
  }
`;