import type { ItemLifecycle, ItemModel, ItemView } from "../types";
import type { BackgroundProps, ThemeTokens } from "../../generated";

export type Props = BackgroundProps;
export type Theme = ThemeTokens;
export type State = {
  elapsedMs: number;
  phase: number;
};
export type Actions = {
  advance(input: { deltaMs: number }): void;
};
export type Slots = Record<string, never>;
export type Model = ItemModel<State, Actions>;
export type Lifecycle = ItemLifecycle<Props, State, Actions>;
export type View = ItemView<Props, State, Actions, Slots>;
