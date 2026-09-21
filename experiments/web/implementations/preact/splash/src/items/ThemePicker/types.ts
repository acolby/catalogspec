import type { ItemModelDefinition } from "../../../../../../models";
import type { ImplementedItemLifecycle, ImplementedItemView, ModelBackedImplementedItem } from "../../../../../../renderers";
import type { Context } from "../../contexts";
import type { ThemePickerProps, ThemeTokens } from "../../generated";

export type Props = ThemePickerProps;
export type Theme = ThemeTokens;
export type State = Record<string, never>;
export type Actions = Record<string, never>;
export type Slots<TView> = Record<string, never>;
export type Model = ItemModelDefinition<State, Actions>;
export type Lifecycle = ImplementedItemLifecycle<Props, State, Actions, Context>;
export type View<TView> = ImplementedItemView<TView, Props, State, Actions, Slots<TView>, Context>;
export type Item<TView> = ModelBackedImplementedItem<TView, Props, State, Actions, Slots<TView>, Context>;
