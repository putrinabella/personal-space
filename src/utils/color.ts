export type DaisyColor =
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "neutral"
  | "base-100"
  | "base-200"
  | "base-300";

// Map warna background kontainer utama
export const bgMap: Record<DaisyColor, string> = {
  primary: "bg-primary text-primary-content",
  secondary: "bg-secondary text-secondary-content",
  accent: "bg-accent text-accent-content",
  neutral: "bg-neutral text-neutral-content",
  info: "bg-info text-info-content",
  success: "bg-success text-success-content",
  warning: "bg-warning text-warning-content",
  error: "bg-error text-error-content",
  "base-100": "bg-base-100 text-base-content",
  "base-200": "bg-base-200 text-base-content",
  "base-300": "bg-base-300 text-base-content",
};

export const isDaisyColor = (color: string): color is DaisyColor => {
  return [
    "primary",
    "secondary",
    "accent",
    "neutral",
    "info",
    "success",
    "warning",
    "error",
    "base-100",
    "base-200",
    "base-300",
  ].includes(color);
};
