import type { ComponentChildren } from "preact";
import type { ItemModelDefinition } from "../../../../../../models";
import type { ImplementedItemLifecycle, ImplementedItemView, ModelBackedImplementedItem } from "../../../../../../renderers";
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
export type Model = ItemModelDefinition<State, Actions>;
export type Lifecycle = ImplementedItemLifecycle<Props, State, Actions, Theme>;
export type View = ImplementedItemView<ComponentChildren, Props, State, Actions, Theme>;
export type Item = ModelBackedImplementedItem<ComponentChildren, Props, State, Actions, Theme>;
