import { useRouter } from "next/router";
import api from "@/lib/axiosInstance";
import Link from "next/link";
import {
  SidebarContainer,
  Logo,
  Nav,
  NavItem,
  LogoutItem,
} from "@/styles/sidebar.styles";
import {
  faChartSimple,
  faCalendarDays,
  faBan,
  faClock,
  faBriefcase,
  faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Sidebar() {
  const router = useRouter();

  const menu = [
    { label: "Dashboard", icon: faChartSimple, path: "/dashboard" },
    { label: "Citas", icon: faCalendarDays, path: "/appointments" },
    { label: "Días bloqueados", icon: faBan, path: "/blockedDays" },
    { label: "Horarios", icon: faClock, path: "/businessHours" },
    { label: "Servicios", icon: faBriefcase, path: "/services" },
  ];

  const logout = async () => {
    await api.post("/auth/logout");
    router.replace("/login");
  };

  return (
    <SidebarContainer>
      <Logo>Admin Panel</Logo>

      <Nav>
        {menu.map((item) => (
          <Link key={item.path} href={item.path} legacyBehavior passHref>
            <NavItem active={router.pathname === item.path}>
              <FontAwesomeIcon icon={item.icon} />
              {item.label}
            </NavItem>
          </Link>
        ))}

        <LogoutItem onClick={logout}>
          <FontAwesomeIcon icon={faRightFromBracket} />
          Cerrar sesión
        </LogoutItem>
      </Nav>
    </SidebarContainer>
  );
}