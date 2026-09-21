import type { ItemModelDefinition } from "../../../../../../models";
import type { ImplementationView } from "../../adapter";
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
export type Slots = {
  content?: ImplementationView;
};
export type Model = ItemModelDefinition<State, Actions>;
export type Lifecycle = ImplementedItemLifecycle<Props, State, Actions, Context>;
export type View = ImplementedItemView<ImplementationView, Props, State, Actions, Slots, Context>;
export type Item = ModelBackedImplementedItem<ImplementationView, Props, State, Actions, Slots, Context>;
