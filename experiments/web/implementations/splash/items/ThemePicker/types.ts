import type { ItemLifecycle, ItemModel, ItemView } from "../types";
import type { ThemePickerProps, ThemeTokens } from "../../generated";

export type Props = ThemePickerProps;
export type Theme = ThemeTokens;
export type State = Record<string, never>;
export type Actions = Record<string, never>;
export type Slots = Record<string, never>;
export type Model = ItemModel<State, Actions>;
export type Lifecycle = ItemLifecycle<Props, State, Actions>;
export type View = ItemView<Props, State, Actions, Slots>;
