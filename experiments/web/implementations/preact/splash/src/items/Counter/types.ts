import type { ComponentChildren } from "preact";
import type { ItemModelDefinition } from "../../../../../../models";
import type { ImplementedItemLifecycle, ImplementedItemView, ModelBackedImplementedItem } from "../../../../../../renderers";
import type { CounterProps, ThemeTokens } from "../../generated";

export type Props = CounterProps;
export type Theme = ThemeTokens;
export type State = {
  count: number;
  initialCount: number;
};
export type Actions = {
  increment(): void;
  decrement(): void;
  reset(): void;
};
export type Model = ItemModelDefinition<State, Actions>;
export type Lifecycle = ImplementedItemLifecycle<Props, State, Actions, Theme>;
export type View = ImplementedItemView<ComponentChildren, Props, State, Actions, Theme>;
export type Item = ModelBackedImplementedItem<ComponentChildren, Props, State, Actions, Theme>;
