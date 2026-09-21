import type { Model } from "./types";

export const model = {
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
} satisfies Model;
