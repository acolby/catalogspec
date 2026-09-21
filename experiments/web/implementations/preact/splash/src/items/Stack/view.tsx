import type { ComponentChildren } from "preact";
import type { View } from "./types";

export const view: View<ComponentChildren> = ({ props, slots, context }) => {
  const direction = props.direction ?? "vertical";
  const align = props.align ?? "stretch";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: direction === "horizontal" ? "row" : "column",
        gap: context.theme.state.tokens?.space?.[props.gap ?? "md"] ?? "16px",
        alignItems: alignItems(align),
        minHeight: "100%",
      }}
    >
      {slots.children}
    </div>
  );
};

function alignItems(align: string) {
  if (align === "start") return "flex-start";
  if (align === "end") return "flex-end";
  if (align === "center") return "center";
  return "stretch";
}
