import type { ComposeContextLifecycle, ComposeContextValue } from "../../../../catalogComposer";
import type { ModelDefinition, ReadonlyDeep } from "../../../../catalogComposer";

export type State = {
  loggedIn: boolean;
  username: string | null;
};

export type Actions = {
  login(input: { username: string }): void;
  logout(): void;
  openUrl?(input: { url: string; target: "self" | "blank" }): void;
};

export type Model = ModelDefinition<State, Actions>;
export type Lifecycle = ComposeContextLifecycle<State, Actions>;
export type Value = ComposeContextValue<ReadonlyDeep<State>, Actions>;
