import type { ComponentChildren } from "preact";
import type { Theme, View } from "./types";

export const view: View<ComponentChildren> = ({ props, emit, context }) => {
  const theme = context.theme.state.tokens;
  const variant = props.variant ?? "primary";
  const styles = variantStyle(variant, theme);

  return (
    <button
      type="button"
      class="cta"
      style={{
        border: styles.border,
        background: styles.background,
        color: styles.color,
        borderRadius: theme?.radius?.pill ?? "999px",
        boxShadow: variant === "primary" ? "0 12px 30px rgba(15,23,42,.18)" : "none",
      }}
      onClick={() => {
        emit("activated", { label: props.label, url: props.url });
        if (props.url) context.scene.actions.openUrl?.({ url: props.url, target: props.target ?? "self" });
      }}
    >
      {props.label}
    </button>
  );
};

function variantStyle(variant: string, theme?: Theme) {
  if (variant === "secondary") {
    return { background: theme?.color?.surface ?? "#fff", color: theme?.color?.text ?? "#111", border: "1px solid rgba(148,163,184,.35)" };
  }
  if (variant === "ghost") {
    return { background: "transparent", color: theme?.color?.text ?? "#111", border: "1px solid transparent" };
  }
  return { background: theme?.color?.accent ?? "#2563eb", color: theme?.color?.accentText ?? "#fff", border: "1px solid transparent" };
}
