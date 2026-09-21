import type { Props, State, Theme, View } from "./types";

export const view: View = ({ props, state, context }) => {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        ...backgroundStyle(props, state, context.theme.state.tokens),
      }}
    />
  );
};

function backgroundStyle(props: Props, state: Readonly<State>, theme?: Theme) {
  const phase = state.phase ?? 0;
  const x = 50 + Math.cos(phase * Math.PI * 2) * 26;
  const y = 38 + Math.sin(phase * Math.PI * 2) * 22;
  const secondaryX = 50 + Math.cos((phase + 0.42) * Math.PI * 2) * 30;
  const secondaryY = 48 + Math.sin((phase + 0.42) * Math.PI * 2) * 24;

  if (props.kind === "image" && props.imageUrl) {
    return {
      backgroundImage: `${overlay(props.overlay)}, url(${props.imageUrl})`,
      backgroundSize: "cover",
      backgroundPosition: `${x}% ${y}%`,
      transition: "background-position 120ms linear",
    };
  }
  if (props.kind === "gradient") {
    const light = isLight(theme?.color?.background);
    const base = light
      ? (theme?.color?.background ?? "#ffffff")
      : (props.color ?? theme?.color?.background ?? "#0f172a");
    const accent = light
      ? (theme?.color?.accent ?? "#2563eb")
      : (props.accentColor ?? theme?.color?.accent ?? "#8b5cf6");
    const surface = light
      ? (theme?.color?.surface ?? "#f7f7f8")
      : (theme?.color?.surface ?? "#111827");
    const glow = light ? colorWithAlpha(accent, 0.22) : accent;
    const secondaryGlow = light
      ? "rgba(14,165,233,.18)"
      : "rgba(14,165,233,.52)";

    return {
      background: [
        `radial-gradient(circle at ${x}% ${y}%, ${glow}, transparent ${light ? "40%" : "34%"})`,
        `radial-gradient(circle at ${secondaryX}% ${secondaryY}%, ${secondaryGlow}, transparent ${light ? "38%" : "30%"})`,
        `linear-gradient(135deg, ${base}, ${surface})`,
      ].join(", "),
      filter: light ? "saturate(1.02)" : "saturate(1.12)",
    };
  }
  return {
    background: props.color ?? theme?.color?.background ?? "transparent",
  };
}

function overlay(strength?: string) {
  if (strength === "dark")
    return "linear-gradient(rgba(15,23,42,.45), rgba(15,23,42,.45))";
  if (strength === "light")
    return "linear-gradient(rgba(255,255,255,.35), rgba(255,255,255,.35))";
  return "linear-gradient(transparent, transparent)";
}

function isLight(color?: string): boolean {
  if (!color?.startsWith("#")) return false;
  const hex = color.slice(1);
  if (hex.length !== 6) return false;
  const r = Number.parseInt(hex.slice(0, 2), 16);
  const g = Number.parseInt(hex.slice(2, 4), 16);
  const b = Number.parseInt(hex.slice(4, 6), 16);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 > 0.7;
}

function colorWithAlpha(color: string, alpha: number): string {
  if (!color.startsWith("#") || color.length !== 7) return color;
  const r = Number.parseInt(color.slice(1, 3), 16);
  const g = Number.parseInt(color.slice(3, 5), 16);
  const b = Number.parseInt(color.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
