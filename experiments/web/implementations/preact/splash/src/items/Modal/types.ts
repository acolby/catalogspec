import type { ItemModelDefinition } from "../../../../../../models";
import type { ImplementedItemLifecycle, ImplementedItemView, ModelBackedImplementedItem } from "../../../../../../renderers";
import type { Context } from "../../contexts";
import type { ModalProps, ThemeTokens } from "../../generated";

export type Props = ModalProps;
export type Theme = ThemeTokens;
export type State = {
  open: boolean;
};
export type Actions = {
  open(): void;
  close(): void;
};
export type Slots<TView> = {
  content?: TView;
};
export type Model = ItemModelDefinition<State, Actions>;
export type Lifecycle = ImplementedItemLifecycle<Props, State, Actions, Context>;
export type View<TView> = ImplementedItemView<TView, Props, State, Actions, Slots<TView>, Context>;
export type Item<TView> = ModelBackedImplementedItem<TView, Props, State, Actions, Slots<TView>, Context>;
