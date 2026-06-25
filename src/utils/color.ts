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

export type ColorScheme = DaisyColor;

export type ColorSchemeConfig = {
  bg: string;
  border: string;
  iconBg: string;
  iconColor: string;
  buttonBg: string;
};

// --- Helper untuk base colors ---
const baseConfig: ColorSchemeConfig = {
  bg: "bg-base-200",
  border: "border-base-300",
  iconBg: "bg-base-300",
  iconColor: "text-base-content",
  buttonBg: "bg-base-300 hover:bg-base-content/20",
};

// --- Maps ---

export const colorSchemeMap: Record<DaisyColor, ColorSchemeConfig> = {
  primary: {
    bg: "bg-primary/10",
    border: "border-primary/50",
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
    buttonBg:
      "bg-linear-to-br from-primary to-primary/80 hover:from-primary/80 hover:to-primary",
  },
  secondary: {
    bg: "bg-linear-to-br from-secondary/10 via-secondary/25 to-secondary/40",
    border: "border-secondary/50",
    iconBg: "bg-secondary/20",
    iconColor: "text-secondary",
    buttonBg:
      "bg-linear-to-br from-secondary to-secondary/80 hover:from-secondary/80 hover:to-secondary",
  },
  accent: {
    bg: "bg-linear-to-br from-accent/10 via-accent/25 to-accent/40",
    border: "border-accent/50",
    iconBg: "bg-accent/20",
    iconColor: "text-accent",
    buttonBg:
      "bg-linear-to-br from-accent to-accent/80 hover:from-accent/80 hover:to-accent",
  },
  info: {
    bg: "bg-linear-to-br from-info/10 via-info/25 to-info/40",
    border: "border-info/50",
    iconBg: "bg-info/20",
    iconColor: "text-info",
    buttonBg:
      "bg-linear-to-br from-info to-info/80 hover:from-info/80 hover:to-info",
  },
  success: {
    bg: "bg-linear-to-br from-success/10 via-success/25 to-success/40",
    border: "border-success/50",
    iconBg: "bg-success/20",
    iconColor: "text-success",
    buttonBg:
      "bg-linear-to-br from-success to-success/80 hover:from-success/80 hover:to-success",
  },
  warning: {
    bg: "bg-linear-to-br from-warning/10 via-warning/25 to-warning/40",
    border: "border-warning/50",
    iconBg: "bg-warning/20",
    iconColor: "text-warning",
    buttonBg:
      "bg-linear-to-br from-warning to-warning/80 hover:from-warning/80 hover:to-warning",
  },
  error: {
    bg: "bg-linear-to-br from-error/10 via-error/25 to-error/40",
    border: "border-error/50",
    iconBg: "bg-error/20",
    iconColor: "text-error",
    buttonBg:
      "bg-linear-to-br from-error to-error/80 hover:from-error/80 hover:to-error",
  },
  neutral: {
    bg: "bg-linear-to-br from-neutral/5 via-neutral/15 to-neutral/25",
    border: "border-base-300",
    iconBg: "bg-neutral/20",
    iconColor: "text-neutral",
    buttonBg:
      "bg-linear-to-br from-neutral to-neutral/80 hover:from-neutral/80 hover:to-neutral",
  },
  "base-100": baseConfig,
  "base-200": baseConfig,
  "base-300": baseConfig,
};

// Map lainnya disesuaikan dengan tipe DaisyColor baru
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

export const cardBaseMap: Record<DaisyColor, string> = {
  primary: "bg-base-100 hover:bg-primary/30",
  secondary: "bg-base-100 hover:bg-secondary/30",
  accent: "bg-base-100 hover:bg-accent/30",
  info: "bg-base-100 hover:bg-info/30",
  success: "bg-base-100 hover:bg-success/30",
  warning: "bg-base-100 hover:bg-warning/30",
  error: "bg-base-100 hover:bg-error/30",
  neutral: "bg-base-100 hover:bg-neutral/30",
  "base-100": "bg-base-100",
  "base-200": "bg-base-200",
  "base-300": "bg-base-300",
};

export const iconBgMap: Record<DaisyColor, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
  info: "bg-info",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
  neutral: "bg-neutral",
  "base-100": "bg-base-100",
  "base-200": "bg-base-200",
  "base-300": "bg-base-300",
};

export const headerGradientMap: Record<DaisyColor, string> = {
  primary: "bg-linear-to-br from-primary/10 via-primary/25 to-primary/40",
  secondary:
    "bg-linear-to-br from-secondary/10 via-secondary/25 to-secondary/40",
  accent: "bg-linear-to-br from-accent/10 via-accent/25 to-accent/40",
  info: "bg-linear-to-br from-info/10 via-info/25 to-info/40",
  success: "bg-linear-to-br from-success/10 via-success/25 to-success/40",
  warning: "bg-linear-to-br from-warning/10 via-warning/25 to-warning/40",
  error: "bg-linear-to-br from-error/10 via-error/25 to-error/40",
  neutral: "bg-linear-to-br from-neutral/10 via-neutral/25 to-neutral/40",
  "base-100": "bg-base-100",
  "base-200": "bg-base-200",
  "base-300": "bg-base-300",
};

export const iconColorMap: Record<DaisyColor, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
  neutral: "text-neutral",
  "base-100": "text-base-content",
  "base-200": "text-base-content",
  "base-300": "text-base-content",
};

export const buttonColorMap: Record<DaisyColor, string> = {
  primary: "bg-primary/80 hover:bg-primary",
  secondary: "bg-secondary/80 hover:bg-secondary",
  accent: "bg-accent/80 hover:bg-accent",
  info: "bg-info/80 hover:bg-info",
  success: "bg-success/80 hover:bg-success",
  warning: "bg-warning/80 hover:bg-warning",
  error: "bg-error/80 hover:bg-error",
  neutral: "bg-neutral/80 hover:bg-neutral",
  "base-100": "bg-base-200 hover:bg-base-300",
  "base-200": "bg-base-300 hover:bg-base-content/20",
  "base-300": "bg-base-content/10 hover:bg-base-content/20",
};

// --- Utility Functions ---

export const isDaisyColor = (color: string): color is DaisyColor => {
  return [
    "primary",
    "secondary",
    "accent",
    "info",
    "success",
    "warning",
    "error",
    "neutral",
    "base-100",
    "base-200",
    "base-300",
  ].includes(color);
};

export const getBgClass = (color: DaisyColor) => bgMap[color];
export const getCardBaseBgClass = (color: DaisyColor) => cardBaseMap[color];
export const getIconBgClass = (color: DaisyColor) => iconBgMap[color];
export const getIconColorClass = (color: DaisyColor) => iconColorMap[color];
export const getButtonColorClass = (color: DaisyColor) => buttonColorMap[color];
export const getGradientClass = (color: DaisyColor) => headerGradientMap[color];
export const getColorScheme = (color: DaisyColor) => colorSchemeMap[color];
