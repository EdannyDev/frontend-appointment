import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  NavbarContainer,
  LeftSection,
  Brand,
  Divider,
  Nav,
  NavItem,
  Indicator,
  RightSection,
  HamburgerButton,
  MobileNavItem,
  MenuDivider,
  UserButton,
  Dropdown,
  DropdownItem,
  LogoutItem,
} from "@/styles/navbar.styles";
import {
  faUser,
  faGear,
  faCalendarDays,
  faRightFromBracket,
  faBars,
  faXmark,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { Notification } from "@/components/notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MENU = [
  { label: "Inicio", path: "/home", icon: faHouse },
  { label: "Calendario", path: "/calendar", icon: faCalendarDays }
];

// Navbar para navegar en el lado del cliente
export default function Navbar() {
  const router = useRouter();
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ opacity: 0, width: 0 });
  const navRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setOpen(false);
    setMobileMenuOpen(false);
  }, [router.asPath]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
        setMobileMenuOpen(false);
      }
    };
    if (open || mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, mobileMenuOpen]);

  const isActive = useCallback(
    (path) => router.pathname === path || router.pathname.startsWith(path + "/"),
    [router.pathname]
  );

  useEffect(() => {
    const activeEl = navRef.current?.querySelector(".active");
    if (activeEl) {
      setIndicatorStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
        opacity: 1,
      });
    } else {
      setIndicatorStyle({ opacity: 0, width: 0 });
    }
  }, [router.pathname]);

  const handleLogout = useCallback(async () => {
    setOpen(false);
    setMobileMenuOpen(false);
    Notification.success("Sesión cerrada correctamente");
    await logout();
    router.push("/login");
  }, [logout, router]);

  const toggleMobileMenu = useCallback(() => {
    setOpen(false);
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const toggleUserMenu = useCallback(() => {
    setMobileMenuOpen(false);
    setOpen((prev) => !prev);
  }, []);

  return (
    <NavbarContainer scrolled={scrolled}>
      <LeftSection>
        <FontAwesomeIcon icon={faCalendarDays} />
        <Divider>|</Divider>
        <Brand>Lockstep</Brand>
      </LeftSection>

      <RightSection ref={dropdownRef}>
        <Nav ref={navRef}>
          <Indicator
            indLeft={indicatorStyle.left ?? 0}
            indWidth={indicatorStyle.width ?? 0}
            visible={indicatorStyle.opacity === 1}
          />

          {MENU.map((item) => {
            const active = isActive(item.path);

            if (active) {
              return (
                <NavItem key={item.path} className="active disabled">
                  {item.label}
                </NavItem>
              );
            }
            return (
              <Link key={item.path} href={item.path}>
                <NavItem>{item.label}</NavItem>
              </Link>
            );
          })}
        </Nav>

        <HamburgerButton
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={toggleMobileMenu}
        >
          <FontAwesomeIcon icon={mobileMenuOpen ? faXmark : faBars} />
        </HamburgerButton>

        {mobileMenuOpen && (
          <Dropdown>
            {MENU.map((item) => {
              const active = isActive(item.path);

              if (active) {
                return (
                  <MobileNavItem key={item.path} className="active">
                    <FontAwesomeIcon icon={item.icon} />
                    {item.label}
                  </MobileNavItem>
                );
              }
              return (
                <Link key={item.path} href={item.path}>
                  <MobileNavItem>
                    <FontAwesomeIcon icon={item.icon} />
                    {item.label}
                  </MobileNavItem>
                </Link>
              );
            })}

            <MenuDivider />

            <DropdownItem onClick={() => router.push("/profile")}>
              <FontAwesomeIcon icon={faGear} />
              Configurar perfil
            </DropdownItem>
            <LogoutItem onClick={handleLogout}>
              <FontAwesomeIcon icon={faRightFromBracket} />
              Cerrar sesión
            </LogoutItem>
          </Dropdown>
        )}

        <UserButton active={open} onClick={toggleUserMenu}>
          <FontAwesomeIcon icon={faUser} />
        </UserButton>

        {open && (
          <Dropdown>
            <DropdownItem onClick={() => router.push("/profile")}>
              <FontAwesomeIcon icon={faGear} />
              Configurar perfil
            </DropdownItem>
            <LogoutItem onClick={handleLogout}>
              <FontAwesomeIcon icon={faRightFromBracket} />
              Cerrar sesión
            </LogoutItem>
          </Dropdown>
        )}
      </RightSection>
    </NavbarContainer>
  );
}