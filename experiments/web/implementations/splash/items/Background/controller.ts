import { defineItemController } from "../types";
import type { Actions, Props, State } from "./types";

export const controller = defineItemController<Props, State, Actions>({
  model: {
    actions(state) {
      return {
        advance({ deltaMs }) {
          state.elapsedMs += deltaMs;
          state.phase = (state.phase + deltaMs * 0.00008) % 1;
        },
      };
    },
  },
  lifecycle: {
    tick({ actions }, frame) {
      actions.advance({ deltaMs: frame.deltaMs });
    },
  },
});
