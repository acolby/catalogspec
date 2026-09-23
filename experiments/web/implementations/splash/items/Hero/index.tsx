import { controller } from "./controller";
import { Item_Hero } from "../../generated";

const item = Item_Hero.$view({ controller })(({ selected, slots }) => {
  const theme = selected.context.theme.state.tokens;
  const align = selected.props.align ?? "center";
  const isCenter = align === "center";

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: selected.props.size === "full" ? "72vh" : selected.props.size === "compact" ? "360px" : "520px",
        borderRadius: theme?.radius?.lg ?? "24px",
        background: theme?.color?.background ?? "#f8fafc",
        color: theme?.color?.text ?? "#0f172a",
        display: "grid",
        placeItems: isCenter ? "center" : "stretch",
      }}
    >
      {slots.background}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "min(980px, 100%)",
          margin: isCenter ? "0 auto" : undefined,
          padding: selected.props.size === "compact" ? "56px" : "88px clamp(28px, 7vw, 96px)",
          textAlign: alignText(align),
          boxSizing: "border-box",
        }}
      >
        {selected.props.eyebrow && <div class="hero-eyebrow">{selected.props.eyebrow}</div>}
        <h1 class="hero-headline" style={{ fontFamily: theme?.font?.heading, maxWidth: isCenter ? "none" : 860 }}>
          {selected.props.headline}
        </h1>
        {selected.props.subheadline && (
          <p class="hero-subheadline" style={{ color: theme?.color?.mutedText, margin: isCenter ? "24px auto 0" : "24px 0 0" }}>
            {selected.props.subheadline}
          </p>
        )}
        {slots.actions && <div style={{ display: "flex", flexWrap: "wrap", justifyContent: justify(align), gap: 12, marginTop: 34 }}>{slots.actions}</div>}
        {slots.content && <div style={{ marginTop: 36 }}>{slots.content}</div>}
      </div>
    </section>
  );
});

function alignText(align: string) {
  if (align === "start") return "left";
  if (align === "end") return "right";
  return "center";
}

function justify(align: string) {
  if (align === "start") return "flex-start";
  if (align === "end") return "flex-end";
  return "center";
}

export default item;
