import { Item_Background } from "../../generated";

export const controller = Item_Background.$controller({
  select({ props, state, context }) {
    return { props, state, context };
  },
  actions(state) {
    return {
      advance({ deltaMs }) {
        state.elapsedMs += deltaMs;
        state.phase = (state.phase + deltaMs * 0.00008) % 1;
      },
    };
  },
  lifecycle: {
    tick({ actions }, frame) {
      actions.advance({ deltaMs: frame.deltaMs });
    },
  },
});
