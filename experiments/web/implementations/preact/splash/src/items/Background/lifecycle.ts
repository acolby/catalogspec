import type { Lifecycle } from "./types";

export const lifecycle = {
  tick({ actions }, frame) {
    actions.advance({ deltaMs: frame.deltaMs });
  },
} satisfies Lifecycle;
