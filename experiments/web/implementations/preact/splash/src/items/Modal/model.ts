import type { Model } from "./types";

export const model = {
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
} satisfies Model;
