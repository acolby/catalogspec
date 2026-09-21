import type { ItemImplementation, ItemLifecycle, ItemModel, ItemSlot, ItemView } from "../types";
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
  content?: ItemSlot;
};
export type Model = ItemModel<State, Actions>;
export type Lifecycle = ItemLifecycle<Props, State, Actions>;
export type View = ItemView<Props, State, Actions, Slots>;
export type Item = ItemImplementation<Props, State, Actions, Slots>;
