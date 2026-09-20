import type { Props, State, View } from "./types";

export const view: View = ({ props, state }) => {
  return <div aria-hidden="true" style={{ position: "absolute", inset: 0, ...backgroundStyle(props, state) }} />;
};

function backgroundStyle(props: Props, state: Readonly<State>) {
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
    return {
      background: [
        `radial-gradient(circle at ${x}% ${y}%, ${props.accentColor ?? "#8b5cf6"}, transparent 34%)`,
        `radial-gradient(circle at ${secondaryX}% ${secondaryY}%, rgba(14,165,233,.52), transparent 30%)`,
        `linear-gradient(135deg, ${props.color ?? "#0f172a"}, ${props.accentColor ?? "#312e81"})`,
      ].join(", "),
      filter: "saturate(1.12)",
    };
  }
  return { background: props.color ?? "transparent" };
}

function overlay(strength?: string) {
  if (strength === "dark") return "linear-gradient(rgba(15,23,42,.45), rgba(15,23,42,.45))";
  if (strength === "light") return "linear-gradient(rgba(255,255,255,.35), rgba(255,255,255,.35))";
  return "linear-gradient(transparent, transparent)";
}
