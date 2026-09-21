import type { ItemImplementation, ItemLifecycle, ItemModel, ItemSlot, ItemView } from "../types";
import type { StackProps, ThemeTokens } from "../../generated";

export type Props = StackProps;
export type Theme = ThemeTokens;
export type State = Record<string, never>;
export type Actions = Record<string, never>;
export type Slots = {
  children?: ItemSlot;
};
export type Model = ItemModel<State, Actions>;
export type Lifecycle = ItemLifecycle<Props, State, Actions>;
export type View = ItemView<Props, State, Actions, Slots>;
export type Item = ItemImplementation<Props, State, Actions, Slots>;
