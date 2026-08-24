// Calcula qué tan fuerte es una contraseña
export const getPasswordStrength = (value) => {
  if (!value) return 0;
  return [/.{8,}/, /[A-Z]/, /[0-9]/, /[\W_]/].filter((r) => r.test(value)).length;
};

export const STRENGTH_LABELS = ["", "Muy débil", "Débil", "Moderada", "Fuerte"];
export const STRENGTH_COLORS = ["", "#E24B4A", "#EF9F27", "#EF9F27", "#1D9E75"];