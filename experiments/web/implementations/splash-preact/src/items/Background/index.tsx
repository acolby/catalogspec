import type { PreactItemComponentProps } from "../../../../../renderers/preact";
import type { BackgroundProps } from "../../generated";

export function Background({ props }: PreactItemComponentProps<BackgroundProps>) {
  return <div aria-hidden="true" style={{ position: "absolute", inset: 0, ...backgroundStyle(props) }} />;
}

function backgroundStyle(props: BackgroundProps) {
  if (props.kind === "image" && props.imageUrl) {
    return {
      backgroundImage: `${overlay(props.overlay)}, url(${props.imageUrl})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  }
  if (props.kind === "gradient") {
    return {
      background: `radial-gradient(circle at 20% 10%, ${props.accentColor ?? "#8b5cf6"}, transparent 35%), linear-gradient(135deg, ${props.color ?? "#0f172a"}, ${props.accentColor ?? "#312e81"})`,
    };
  }
  return { background: props.color ?? "transparent" };
}

function overlay(strength?: string) {
  if (strength === "dark") return "linear-gradient(rgba(15,23,42,.45), rgba(15,23,42,.45))";
  if (strength === "light") return "linear-gradient(rgba(255,255,255,.35), rgba(255,255,255,.35))";
  return "linear-gradient(transparent, transparent)";
}
