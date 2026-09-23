import { controller } from "./controller";
import { defineItem } from "../types";
import type { Slots } from "./types";

export const implemented = defineItem({ controller })<Slots>(({ props, slots, context }) => {
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
});

function alignItems(align: string) {
  if (align === "start") return "flex-start";
  if (align === "end") return "flex-end";
  if (align === "center") return "center";
  return "stretch";
}
