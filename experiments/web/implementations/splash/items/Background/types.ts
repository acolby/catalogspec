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
