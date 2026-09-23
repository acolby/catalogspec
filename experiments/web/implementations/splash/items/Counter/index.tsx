import { controller } from "./controller";
import { Item_Counter } from "../../generated";

const item = Item_Counter.$view({ controller })(({ selected, actions }) => {
  const theme = selected.context.theme.state.tokens;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: theme?.space?.sm ?? "0.5rem",
        padding: theme?.space?.md ?? "1rem",
        borderRadius: theme?.radius?.lg ?? "1rem",
        background: "rgba(255,255,255,.12)",
        border: "1px solid rgba(255,255,255,.18)",
        backdropFilter: "blur(12px)",
      }}
    >
      <span style={{ color: theme?.color?.mutedText }}>
        {selected.props.label ?? "Counter"}
      </span>
      <strong style={{ minWidth: 32, textAlign: "center" }}>
        {selected.state.count}
      </strong>
      <button
        type="button"
        class="cta"
        onClick={() => actions.decrement()}
      >
        −
      </button>
      <button
        type="button"
        class="cta"
        onClick={() => actions.increment()}
      >
        +
      </button>
      <button
        type="button"
        class="cta"
        onClick={() => actions.reset()}
      >
        Reset
      </button>
    </div>
  );
});

export default item;
