import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  SidebarContainer,
  Overlay,
  SidebarToggle,
  SidebarLabel,
  Logo,
  Nav,
  NavItem,
  NavDivider,
  LogoutItem
} from "@/styles/sidebar.styles";
import {
  faChartSimple,
  faCalendarDays,
  faBan,
  faClock,
  faBriefcase,
  faRightFromBracket,
  faGear,
  faBars,
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import { Notification } from "@/components/notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MENU = [
  { label: "Dashboard", icon: faChartSimple, path: "/dashboard" },
  { label: "Citas", icon: faCalendarDays, path: "/appointments" },
  { label: "Días bloqueados", icon: faBan, path: "/blockedDays" },
  { label: "Horarios laborales", icon: faClock, path: "/businessHours" },
  { label: "Servicios", icon: faBriefcase, path: "/services" },
  { label: "Perfil", icon: faGear, path: "/profile" }
];

export default function Sidebar() {
  const router = useRouter();
  const { logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [router.asPath]);

  const handleLogout = useCallback(async () => {
    setMobileOpen(false);
    Notification.success("Sesión cerrada correctamente");
    await logout();
    router.push("/login");
  }, [logout, router]);

  return (
    <>
      <Overlay visible={mobileOpen} onClick={() => setMobileOpen(false)} />

      <SidebarContainer mobileOpen={mobileOpen}>
        <Logo mobileOpen={mobileOpen}>
          <SidebarLabel mobileOpen={mobileOpen}>Gestor de Citas</SidebarLabel>
          <SidebarToggle
            mobileOpen={mobileOpen}
            aria-label={mobileOpen ? "Contraer menú" : "Expandir menú"}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            <FontAwesomeIcon icon={mobileOpen ? faXmark : faBars} />
          </SidebarToggle>
        </Logo>

        <Nav>
          {MENU.map((item) => (
            <Link key={item.path} href={item.path} legacyBehavior passHref>
              <NavItem active={router.pathname === item.path} mobileOpen={mobileOpen}>
                <FontAwesomeIcon icon={item.icon} />
                <SidebarLabel mobileOpen={mobileOpen}>{item.label}</SidebarLabel>
              </NavItem>
            </Link>
          ))}

          <NavDivider />

          <LogoutItem onClick={handleLogout} mobileOpen={mobileOpen}>
            <FontAwesomeIcon icon={faRightFromBracket} />
            <SidebarLabel mobileOpen={mobileOpen}>Cerrar sesión</SidebarLabel>
          </LogoutItem>
        </Nav>
      </SidebarContainer>
    </>
  );
}