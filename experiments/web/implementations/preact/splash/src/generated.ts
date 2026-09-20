// Intended generated output from experiments/web/catalogs/splash.
// Hand-authored for now while the generator shape is still being explored.

export const catalog = {
  id: "splash",
  version: 1,
  items: ["Hero", "CallToAction", "Background", "Stack", "Counter"],
  themes: {
    default: "light",
    available: ["light", "dark"],
  },
} as const;

export type ThemeName = (typeof catalog.themes.available)[number];

export type ThemeTokens = {
  color: {
    background: string;
    surface: string;
    text: string;
    mutedText: string;
    accent: string;
    accentText: string;
  };
  space: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
    pill: string;
  };
  font: {
    body: string;
    heading: string;
  };
};

export const themes: Record<ThemeName, ThemeTokens> = {
  light: {
    color: {
      background: "#ffffff",
      surface: "#f7f7f8",
      text: "#111827",
      mutedText: "#4b5563",
      accent: "#2563eb",
      accentText: "#ffffff",
    },
    space: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "2rem",
      xl: "4rem",
    },
    radius: {
      sm: "0.25rem",
      md: "0.5rem",
      lg: "1rem",
      pill: "999px",
    },
    font: {
      body: "system-ui, sans-serif",
      heading: "system-ui, sans-serif",
    },
  },
  dark: {
    color: {
      background: "#0f172a",
      surface: "#111827",
      text: "#f9fafb",
      mutedText: "#cbd5e1",
      accent: "#60a5fa",
      accentText: "#0f172a",
    },
    space: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "2rem",
      xl: "4rem",
    },
    radius: {
      sm: "0.25rem",
      md: "0.5rem",
      lg: "1rem",
      pill: "999px",
    },
    font: {
      body: "system-ui, sans-serif",
      heading: "system-ui, sans-serif",
    },
  },
};

export type HeroProps = {
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  align?: "start" | "center" | "end";
  size?: "compact" | "regular" | "full";
};

export type CallToActionProps = {
  label: string;
  url?: string;
  target?: "self" | "blank";
  variant?: "primary" | "secondary" | "ghost";
};

export type BackgroundProps = {
  kind?: "solid" | "gradient" | "image";
  color?: string;
  accentColor?: string;
  imageUrl?: string;
  overlay?: "none" | "light" | "dark";
};

export type StackProps = {
  direction?: "vertical" | "horizontal";
  gap?: "xs" | "sm" | "md" | "lg" | "xl";
  align?: "start" | "center" | "end" | "stretch";
};

export type CounterProps = {
  label?: string;
};
