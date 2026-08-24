import Navbar from "./navbar";
import { LayoutContainer, Content } from "@/styles/clientLayout.styles";

// Layout para páginas de cliente
export default function ClientLayout({ children }) {
  return (
    <LayoutContainer>
      <Navbar />
      <Content>{children}</Content>
    </LayoutContainer>
  );
}