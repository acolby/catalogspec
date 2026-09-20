import type { Model } from "./types";

export const model = {
  actions(state) {
    return {
      advance({ deltaMs }) {
        state.elapsedMs += deltaMs;
        state.phase = (state.phase + deltaMs * 0.00008) % 1;
      },
    };
  },
} satisfies Model;
