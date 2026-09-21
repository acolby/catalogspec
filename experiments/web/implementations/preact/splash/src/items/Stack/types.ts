import type { ItemModelDefinition } from "../../../../../../models";
import type { ImplementedItemLifecycle, ImplementedItemView, ModelBackedImplementedItem } from "../../../../../../renderers";
import type { Context } from "../../contexts";
import type { StackProps, ThemeTokens } from "../../generated";

export type Props = StackProps;
export type Theme = ThemeTokens;
export type State = Record<string, never>;
export type Actions = Record<string, never>;
export type Slots<TView> = {
  children?: TView[];
};
export type Model = ItemModelDefinition<State, Actions>;
export type Lifecycle = ImplementedItemLifecycle<Props, State, Actions, Context>;
export type View<TView> = ImplementedItemView<TView, Props, State, Actions, Slots<TView>, Context>;
export type Item<TView> = ModelBackedImplementedItem<TView, Props, State, Actions, Slots<TView>, Context>;
