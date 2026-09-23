import { controller } from "./controller";
import { Item_CallToAction, type ThemeTokens } from "../../generated";

const item = Item_CallToAction.$view({ controller })(({ selected, emit }) => {
  const theme = selected.context.theme.state.tokens;
  const variant = selected.props.variant ?? "primary";
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
        emit("activated", { label: selected.props.label, url: selected.props.url });
        if (selected.props.url) selected.context.scene.actions.openUrl?.({ url: selected.props.url, target: selected.props.target ?? "self" });
      }}
    >
      {selected.props.label}
    </button>
  );
});

function variantStyle(variant: string, theme?: ThemeTokens) {
  if (variant === "secondary") {
    return { background: theme?.color?.surface ?? "#fff", color: theme?.color?.text ?? "#111", border: "1px solid rgba(148,163,184,.35)" };
  }
  if (variant === "ghost") {
    return { background: "transparent", color: theme?.color?.text ?? "#111", border: "1px solid transparent" };
  }
  return { background: theme?.color?.accent ?? "#2563eb", color: theme?.color?.accentText ?? "#fff", border: "1px solid transparent" };
}

export default item;
