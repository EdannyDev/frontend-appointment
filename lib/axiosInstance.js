import axios from "axios";

// Instancia de axios configurada para comunicarse con el backend
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v2",
  withCredentials: true,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Rutas excluidas de la redirección automática al login en caso de recibir un 401
const SKIP_REDIRECT_PATHS = ["/auth/login", "/auth/me", "/auth/reactivate-account"];

// Interceptor de token expirado: Hace una redirección limpia
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || "";
    const shouldSkip = SKIP_REDIRECT_PATHS.some((path) => url.includes(path));

    if (status === 401 && !shouldSkip && typeof window !== "undefined") {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;