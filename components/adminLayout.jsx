import Sidebar from "./sidebar";
import { LayoutContainer, Content } from "@/styles/adminLayout.styles";

// Layout para páginas de administración
export default function AdminLayout({ children }) {
  return (
    <LayoutContainer>
      <Sidebar />
      <Content>{children}</Content>
    </LayoutContainer>
  );
}