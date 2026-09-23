import { defineItemController } from "../types";
import type { Actions, Props, State } from "./types";

export const controller = defineItemController<Props, State, Actions>({
  model: {
    actions(state) {
      return {
        updateEmail({ email }) {
          state.email = email;
          state.submitted = false;
        },
        submit() {
          state.submitted = true;
        },
      };
    },
  },
  lifecycle: {},
});
