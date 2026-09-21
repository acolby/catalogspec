import type { ItemModelDefinition } from "../../../../../../models";
import type { ImplementedItemLifecycle, ImplementedItemView, ModelBackedImplementedItem } from "../../../../../../renderers";
import type { Context } from "../../contexts";
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
export type Slots<TView> = Record<string, never>;
export type Model = ItemModelDefinition<State, Actions>;
export type Lifecycle = ImplementedItemLifecycle<Props, State, Actions, Context>;
export type View<TView> = ImplementedItemView<TView, Props, State, Actions, Slots<TView>, Context>;
export type Item<TView> = ModelBackedImplementedItem<TView, Props, State, Actions, Slots<TView>, Context>;
