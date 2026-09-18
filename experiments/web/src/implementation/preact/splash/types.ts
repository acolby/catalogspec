import type { ThemeTokens } from "../../../shared/types";

export type SplashThemeTokens = ThemeTokens;

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
