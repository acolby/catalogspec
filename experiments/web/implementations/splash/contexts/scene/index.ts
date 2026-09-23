import { defineContext } from "../../../../catalogComposer";
import type { Actions, State } from "./types";

export const scene = defineContext<State, Actions>({
  model: {
    actions(state) {
      return {
        login({ username }) {
          state.loggedIn = true;
          state.username = username;
        },
        logout() {
          state.loggedIn = false;
          state.username = null;
        },
      };
    },
  },
  lifecycle: {},
});

export type { Actions, State, Value } from "./types";
