import styled from "@emotion/styled";

export const SidebarContainer = styled.aside`
  width: 240px;
  min-height: 100vh;
  background: #0f172a;
  color: #fff;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
`;

export const Logo = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 30px;
  text-align: center;
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const NavItem = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  color: ${({ active }) => (active ? "#0f172a" : "#e5e7eb")};
  background: ${({ active }) => (active ? "#38bdf8" : "transparent")};
  cursor: pointer;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ active }) =>
      active ? "#38bdf8" : "rgba(255,255,255,0.1)"};
  }
`;

export const LogoutItem = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  color: #f87171;
  transition: all 0.2s ease;

  svg {
    color: #ef4444;
  }

  &:hover {
    background: rgba(239, 68, 68, 0.15);
    color: #fecaca;

    svg {
      color: #fecaca;
    }
  }
`;