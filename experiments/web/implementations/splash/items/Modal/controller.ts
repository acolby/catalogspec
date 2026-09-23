import { defineItemController } from "../types";
import type { Actions, Props, State } from "./types";

export const controller = defineItemController<Props, State, Actions>({
  model: {
    actions(state) {
      return {
        open() {
          state.open = true;
        },
        close() {
          state.open = false;
        },
      };
    },
  },
  lifecycle: {},
});
