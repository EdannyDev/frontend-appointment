// Rutas accesibles sin autenticación
export const PUBLIC_ROUTES = [
  "/login",
  "/register",
  "/forgotPassword",
  "/resetPassword"
];

// Rutas exclusivas del administrador
export const ADMIN_ROUTES = [
  "/dashboard",
  "/appointments",
  "/blockedDays",
  "/businessHours",
  "/services",
  "/profile"
];

// Rutas exclusivas del cliente
export const CLIENT_ROUTES = [
  "/home",
  "/calendar",
  "/appointment",
  "/profile"
];