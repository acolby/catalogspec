import type { ContextImplementation, ContextLifecycle, RuntimeContextValue } from "../../../../renderers";
import type { ItemModelDefinition, ReadonlyDeep } from "../../../../models";
import type { ThemeName, ThemeTokens } from "../../generated";

export type State = {
  name: ThemeName;
  tokens?: ThemeTokens;
  available: ThemeName[];
};

export type Actions = {
  setTheme(input: { name: ThemeName }): void;
};

export type Model = ItemModelDefinition<State, Actions>;
export type Lifecycle = ContextLifecycle<State, Actions>;
export type Value = RuntimeContextValue<ReadonlyDeep<State>, Actions>;
export type Implementation = ContextImplementation<State, Actions>;
