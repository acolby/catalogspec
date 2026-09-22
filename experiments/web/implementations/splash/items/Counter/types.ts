import type { ItemLifecycle, ItemModel, ItemView } from "../types";
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
export type Slots = Record<string, never>;
export type Model = ItemModel<State, Actions>;
export type Lifecycle = ItemLifecycle<Props, State, Actions>;
export type View = ItemView<Props, State, Actions, Slots>;
