import { controller } from "./controller";
import { Item_Stack } from "../../generated";

const item = Item_Stack.$view({ controller })(({ selected, slots }) => {
  const direction = selected.props.direction ?? "vertical";
  const align = selected.props.align ?? "stretch";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: direction === "horizontal" ? "row" : "column",
        gap: selected.context.theme.state.tokens?.space?.[selected.props.gap ?? "md"] ?? "16px",
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

export default item;
