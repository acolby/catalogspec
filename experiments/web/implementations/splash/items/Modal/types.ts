import type { ItemSlot } from "../types";
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
