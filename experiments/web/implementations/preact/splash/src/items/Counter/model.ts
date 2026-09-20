import type { Model } from "./types";

export const model = {
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
} satisfies Model;
