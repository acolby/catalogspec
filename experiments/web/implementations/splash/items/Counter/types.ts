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
