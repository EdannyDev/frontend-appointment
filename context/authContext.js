import { useRouter } from "next/router";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo
} from "react";
import api from "@/lib/axiosInstance";
import { logger } from "@/utils/logger";
import { PUBLIC_ROUTES } from "@/config/appRoutes";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  const fetchUser = useCallback(async () => {
    const res = await api.get("/auth/me");
    setUser(res.data.data);
    return res.data.data;
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    const checkAuth = async () => {
      if (PUBLIC_ROUTES.includes(router.pathname)) {
        setReady(true);
        return;
      }
      try {
        await fetchUser();
      } catch {
        router.push("/login");
      } finally {
        setReady(true);
      }
    };

    checkAuth();
  }, [router.isReady, router.pathname, fetchUser]);

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      logger.error("Error al cerrar sesión:", error);
    } finally {
      setUser(null);
    }
  }, []);

  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    ready,
    fetchUser,
    logout,
  }), [user, ready, fetchUser, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);