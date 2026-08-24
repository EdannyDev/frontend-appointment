import styled from "@emotion/styled";

export const SidebarContainer = styled.aside`
  width: 240px;
  height: 100vh;
  position: sticky;
  top: 0;
  background: var(--surface);
  border-right: 0.5px solid var(--border);
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow-y: auto;

  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1200;
    overflow-x: hidden;
    transition: width 0.25s ease, padding 0.25s ease;
    width: ${({ mobileOpen }) => (mobileOpen ? "240px" : "56px")};
    padding: ${({ mobileOpen }) => (mobileOpen ? "24px 16px" : "12px 8px")};
    box-shadow: ${({ mobileOpen }) =>
      mobileOpen ? "4px 0 24px rgba(0, 0, 0, 0.4)" : "none"};
  }
`;

export const Overlay = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${({ visible }) => (visible ? "block" : "none")};
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1150;
  }
`;

export const SidebarToggle = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--text-2);
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: color var(--ease), background var(--ease);

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  &:hover {
    color: var(--accent);
  }

  @media (max-width: 768px) {
    width: 34px;
    height: 34px;
    border-radius: var(--radius-sm);
    margin-left: ${({ mobileOpen }) => (mobileOpen ? "auto" : "0")};

    &:hover {
      background: var(--card);
    }
  }

  @media (min-width: 769px) {
    display: none;
  }
`;

export const SidebarLabel = styled.span`
  white-space: nowrap;

  @media (max-width: 768px) {
    display: ${({ mobileOpen }) => (mobileOpen ? "inline" : "none")};
  }
`;

export const Logo = styled.div`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 32px;
  padding: 0 4px;
  color: var(--text-1);
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent);
    flex-shrink: 0;
    box-shadow: 0 0 8px var(--accent);
  }

  @media (max-width: 768px) {
    margin-bottom: 20px;
    justify-content: ${({ mobileOpen }) => (mobileOpen ? "flex-start" : "center")};
    padding: ${({ mobileOpen }) => (mobileOpen ? "0 4px" : "0")};

    &::before {
      display: ${({ mobileOpen }) => (mobileOpen ? "inline-block" : "none")};
    }
  }
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const NavItem = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  color: ${({ active }) => active ? "var(--bg)" : "var(--text-2)"};
  background: ${({ active }) => active ? "var(--accent)" : "transparent"};
  cursor: pointer;
  text-decoration: none;
  font-weight: ${({ active }) => active ? "600" : "400"};
  font-size: 13px;
  transition: all var(--ease);
  position: relative;

  svg {
    font-size: 14px;
    color: ${({ active }) => active ? "var(--bg)" : "var(--text-3)"};
    transition: color var(--ease);
    flex-shrink: 0;
  }

  &:hover {
    background: ${({ active }) => active ? "var(--accent)" : "var(--card)"};
    color: ${({ active }) => active ? "var(--bg)" : "var(--accent)"};

    svg {
      color: ${({ active }) => active ? "var(--bg)" : "var(--accent)"};
    }
  }

  @media (max-width: 768px) {
    justify-content: ${({ mobileOpen }) => (mobileOpen ? "flex-start" : "center")};
    gap: ${({ mobileOpen }) => (mobileOpen ? "12px" : "0")};
    padding: ${({ mobileOpen }) => (mobileOpen ? "10px 12px" : "12px")};
  }
`;

export const NavDivider = styled.div`
  height: 0.5px;
  background: var(--border);
  margin: 8px 4px;
`;

export const LogoutItem = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-weight: 400;
  font-size: 13px;
  color: var(--danger);
  transition: all var(--ease);
  box-sizing: border-box;

  svg {
    font-size: 14px;
    color: var(--danger);
    transition: color var(--ease);
    flex-shrink: 0;
  }

  &:hover {
    background: rgba(217, 79, 79, 0.10);
    color: var(--danger);

    svg {
      color: var(--danger);
    }
  }

  @media (max-width: 768px) {
    justify-content: ${({ mobileOpen }) => (mobileOpen ? "flex-start" : "center")};
    gap: ${({ mobileOpen }) => (mobileOpen ? "12px" : "0")};
    padding: ${({ mobileOpen }) => (mobileOpen ? "10px 12px" : "12px")};
  }
`;