import type { ItemModelDefinition } from "../../../../models";
import type { ImplementationView } from "../../adapter";
import type { ImplementedItemLifecycle, ImplementedItemView, ModelBackedImplementedItem } from "../../../../renderers";
import type { Context } from "../../contexts";
import type { BackgroundProps, ThemeTokens } from "../../generated";

export type Props = BackgroundProps;
export type Theme = ThemeTokens;
export type State = {
  elapsedMs: number;
  phase: number;
};
export type Actions = {
  advance(input: { deltaMs: number }): void;
};
export type Slots = Record<string, never>;
export type Model = ItemModelDefinition<State, Actions>;
export type Lifecycle = ImplementedItemLifecycle<Props, State, Actions, Context>;
export type View = ImplementedItemView<ImplementationView, Props, State, Actions, Slots, Context>;
export type Item = ModelBackedImplementedItem<ImplementationView, Props, State, Actions, Slots, Context>;
