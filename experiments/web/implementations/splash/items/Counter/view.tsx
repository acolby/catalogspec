import type { View } from "./types";

export const view: View = ({ props, state, actions, context }) => {
  const theme = context.theme.state.tokens;

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
        {props.label ?? "Counter"}
      </span>
      <strong style={{ minWidth: 32, textAlign: "center" }}>
        {state.count}
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
};
