import type { ComponentChildren } from "preact";
import { defineImplementedItem } from "../../../../../../renderers";
import type { CounterProps, ThemeTokens } from "../../generated";
import { model, type CounterActions, type CounterState } from "./model";

export const Counter = defineImplementedItem<ComponentChildren, CounterProps, CounterState, CounterActions, ThemeTokens>({
  model,

  view({ props, state, actions, scene }) {
    const theme = scene.theme;

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
        <span style={{ color: theme?.color?.mutedText }}>{props.label ?? "Counter"}</span>
        <strong style={{ minWidth: 32, textAlign: "center" }}>{state.count}</strong>
        <button type="button" class="cta" onClick={() => actions.decrement()}>−</button>
        <button type="button" class="cta" onClick={() => actions.increment()}>+</button>
        <button type="button" class="cta" onClick={() => actions.reset()}>Reset</button>
      </div>
    );
  },
});
