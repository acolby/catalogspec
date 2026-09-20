import type { ComponentChildren } from "preact";
import { defineImplementedItem } from "../../../../../../renderers";
import type { StackProps, ThemeTokens } from "../../generated";
import { model, type StackActions, type StackState } from "./model";

export const Stack = defineImplementedItem<ComponentChildren, StackProps, StackState, StackActions, ThemeTokens>({
  model,

  view({ props, slots, scene }) {
    const direction = props.direction ?? "vertical";
    const align = props.align ?? "stretch";
    return (
      <div
        style={{
          display: "flex",
          flexDirection: direction === "horizontal" ? "row" : "column",
          gap: scene.theme?.space?.[props.gap ?? "md"] ?? "16px",
          alignItems: alignItems(align),
          minHeight: "100%",
        }}
      >
        {slots.children}
      </div>
    );
  },
});

function alignItems(align: string) {
  if (align === "start") return "flex-start";
  if (align === "end") return "flex-end";
  if (align === "center") return "center";
  return "stretch";
}
