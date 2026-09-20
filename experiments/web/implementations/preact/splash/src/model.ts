import type { ItemModelDefinition } from "../../../../models";

export type State = {
  loggedIn: boolean;
  username: string | null;
};

export type Actions = {
  login(input: { username: string }): void;
  logout(): void;
};

export type Model = ItemModelDefinition<State, Actions>;

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
