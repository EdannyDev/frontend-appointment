// Valor máximo de caracteres para contraseñas seguras
const MAX_PASSWORD_LENGTH = 72;

// Evalúa la fuerza de la contraseña según criterios de seguridad
export const getPasswordStrength = (value) => {
  if (!value || value.length > MAX_PASSWORD_LENGTH) return 0;

  const hasSymbol = /[\W_]/.test(value);
  const criteria = [/.{8,}/, /[A-Z]/, /[0-9]/, /[\W_]/].filter((r) => r.test(value)).length;

  if (!hasSymbol) return Math.min(criteria, 3);

  return criteria;
};

// Indica si la contraseña excede la longitud máxima soportada
export const exceedsMaxPasswordLength = (value) => (value?.length || 0) > MAX_PASSWORD_LENGTH;

export const STRENGTH_LABELS = ["", "Muy débil", "Débil", "Moderada", "Fuerte"];
export const STRENGTH_COLORS = ["", "#E24B4A", "#EF9F27", "#EF9F27", "#1D9E75"];