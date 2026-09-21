import { themes } from "../../generated";
import type { Model } from "./types";

export const model = {
  actions(state) {
    return {
      setTheme({ name }) {
        state.name = name;
        state.tokens = themes[name];
      },
    };
  },
} satisfies Model;
