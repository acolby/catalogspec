import type { ComposeContextValue, ReadonlyDeep } from "../../../../catalogComposer";

export type State = {
  loggedIn: boolean;
  username: string | null;
};

export type Actions = {
  login(input: { username: string }): void;
  logout(): void;
  openUrl?(input: { url: string; target: "self" | "blank" }): void;
};

export type Value = ComposeContextValue<ReadonlyDeep<State>, Actions>;
