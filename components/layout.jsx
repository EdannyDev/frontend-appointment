import Sidebar from "./Sidebar";
import { LayoutContainer, Content } from "@/styles/layout.styles";

export default function AdminLayout({ children }) {
  return (
    <LayoutContainer>
      <Sidebar />
      <Content>{children}</Content>
    </LayoutContainer>
  );
}