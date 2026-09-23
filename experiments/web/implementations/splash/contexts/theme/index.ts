import { defineContext } from "../../../../catalogComposer";
import { themes } from "../../generated";
import type { Actions, State } from "./types";

export const theme = defineContext<State, Actions>({
  model: {
    actions(state) {
      return {
        setTheme({ name }) {
          state.name = name;
          state.tokens = themes[name];
        },
      };
    },
  },
  lifecycle: {},
});

export type { Actions, State, Value } from "./types";
