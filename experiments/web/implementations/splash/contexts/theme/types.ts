import type { ComposeContextLifecycle, ComposeContextValue } from "../../../../catalogComposer";
import type { ModelDefinition, ReadonlyDeep } from "../../../../catalogComposer";
import type { ThemeName, ThemeTokens } from "../../generated";

export type State = {
  name: ThemeName;
  tokens?: ThemeTokens;
  available: ThemeName[];
};

export type Actions = {
  setTheme(input: { name: ThemeName }): void;
};

export type Model = ModelDefinition<State, Actions>;
export type Lifecycle = ComposeContextLifecycle<State, Actions>;
export type Value = ComposeContextValue<ReadonlyDeep<State>, Actions>;
