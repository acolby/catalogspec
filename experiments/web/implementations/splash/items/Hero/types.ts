import type { ItemLifecycle, ItemModel, ItemSlot, ItemView } from "../types";
import type { HeroProps, ThemeTokens } from "../../generated";

export type Props = HeroProps;
export type Theme = ThemeTokens;
export type State = Record<string, never>;
export type Actions = Record<string, never>;
export type Slots = {
  background?: ItemSlot;
  actions?: ItemSlot;
  content?: ItemSlot;
};
export type Model = ItemModel<State, Actions>;
export type Lifecycle = ItemLifecycle<Props, State, Actions>;
export type View = ItemView<Props, State, Actions, Slots>;
