import type { Model } from "./types";

export const model = {
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
} satisfies Model;
