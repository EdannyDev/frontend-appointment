import { useRouter } from "next/router";
import "@/styles/globals.css";
import {
  PUBLIC_ROUTES,
  ADMIN_ROUTES,
  CLIENT_ROUTES
} from "@/config/appRoutes";
import Loader from "@/components/loader";
import AdminLayout from "@/components/adminLayout";
import ClientLayout from "@/components/clientLayout";
import Notifications from "@/components/notification";
import { AuthProvider, useAuth } from "@/context/authContext";

const LAYOUTS = {
  ADMIN: AdminLayout,
  CLIENT: ClientLayout,
};

const ROLE_HOME = {
  ADMIN: "/dashboard",
  CLIENT: "/home",
};

// Controla los layouts y la autorización de rutas según el rol del usuario
function LayoutResolver({ Component, pageProps }) {
  const router = useRouter();
  const { pathname } = router;
  const { user, isAuthenticated, ready } = useAuth();

  if (PUBLIC_ROUTES.includes(pathname)) {
    return <Component {...pageProps} />;
  }

  if (!ready) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Loader />;
  }

  const isAdminAllowed =
    user?.role === "ADMIN" &&
    ADMIN_ROUTES.some((route) => pathname.startsWith(route));

  const isClientAllowed =
    user?.role === "CLIENT" &&
    CLIENT_ROUTES.some((route) => pathname.startsWith(route));

  if (!isAdminAllowed && !isClientAllowed) {
    const redirect = ROLE_HOME[user?.role] || "/login";
    if (redirect !== pathname) router.push(redirect);
    return <Loader />;
  }
  const Layout = LAYOUTS[user.role];

  if (!Layout) return <Component {...pageProps} />;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Notifications />
      <LayoutResolver Component={Component} pageProps={pageProps} />
    </AuthProvider>
  );
}