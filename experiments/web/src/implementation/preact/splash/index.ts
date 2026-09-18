import type { PreactCatalogImplementation } from "../_utils";
import { Background } from "./items/Background";
import { CallToAction } from "./items/CallToAction";
import { Hero } from "./items/Hero";
import { Stack } from "./items/Stack";
import type { SplashThemeTokens } from "./types";

export const splashThemes: Record<string, SplashThemeTokens> = {
  light: {
    color: {
      background: "#f8fafc",
      surface: "#ffffff",
      text: "#0f172a",
      mutedText: "#475569",
      accent: "#2563eb",
      accentText: "#ffffff",
    },
    space: { xs: "6px", sm: "10px", md: "16px", lg: "28px", xl: "48px" },
    radius: { sm: "8px", md: "14px", lg: "24px", pill: "999px" },
    font: { body: "Inter, system-ui, sans-serif", heading: "Inter, system-ui, sans-serif" },
  },
  dark: {
    color: {
      background: "#0f172a",
      surface: "rgba(255,255,255,0.08)",
      text: "#f8fafc",
      mutedText: "#cbd5e1",
      accent: "#8b5cf6",
      accentText: "#ffffff",
    },
    space: { xs: "6px", sm: "10px", md: "16px", lg: "28px", xl: "48px" },
    radius: { sm: "8px", md: "14px", lg: "24px", pill: "999px" },
    font: { body: "Inter, system-ui, sans-serif", heading: "Inter, system-ui, sans-serif" },
  },
};

export const splashPreactImplementation: PreactCatalogImplementation = {
  catalog: {
    id: "splash",
    version: 1,
  },
  items: {
    Background,
    CallToAction,
    Hero,
    Stack,
  },
  themes: splashThemes,
};
