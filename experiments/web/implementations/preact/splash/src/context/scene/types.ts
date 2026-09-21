import type { ContextImplementation, ContextLifecycle, RuntimeContextValue } from "../../../../../../renderers";
import type { ItemModelDefinition, ReadonlyDeep } from "../../../../../../models";

export type State = {
  loggedIn: boolean;
  username: string | null;
};

export type Actions = {
  login(input: { username: string }): void;
  logout(): void;
  openUrl?(input: { url: string; target: "self" | "blank" }): void;
};

export type Model = ItemModelDefinition<State, Actions>;
export type Lifecycle = ContextLifecycle<State, Actions>;
export type Value = RuntimeContextValue<ReadonlyDeep<State>, Actions>;
export type Implementation = ContextImplementation<State, Actions>;
