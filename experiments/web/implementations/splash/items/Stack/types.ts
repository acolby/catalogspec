import type { ItemSlot } from "../types";
import type { StackProps, ThemeTokens } from "../../generated";

export type Props = StackProps;
export type Theme = ThemeTokens;
export type State = Record<string, never>;
export type Actions = Record<string, never>;
export type Slots = {
  children?: ItemSlot;
};
