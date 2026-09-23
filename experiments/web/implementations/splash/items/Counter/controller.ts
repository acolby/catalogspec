import { defineItemController } from "../types";
import type { Actions, Props, State } from "./types";

export const controller = defineItemController<Props, State, Actions>({
  model: {
    actions(state) {
      return {
        increment() {
          state.count += 1;
        },
        decrement() {
          state.count -= 1;
        },
        reset() {
          state.count = state.initialCount;
        },
      };
    },
  },
  lifecycle: {},
});
