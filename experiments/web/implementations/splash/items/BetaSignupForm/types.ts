import type { ItemImplementation, ItemLifecycle, ItemModel, ItemView } from "../types";
import type { BetaSignupFormProps, ThemeTokens } from "../../generated";

export type Props = BetaSignupFormProps;
export type Theme = ThemeTokens;
export type State = {
  email: string;
  submitted: boolean;
};
export type Actions = {
  updateEmail(input: { email: string }): void;
  submit(): void;
};
export type Slots = Record<string, never>;
export type Model = ItemModel<State, Actions>;
export type Lifecycle = ItemLifecycle<Props, State, Actions>;
export type View = ItemView<Props, State, Actions, Slots>;
export type Item = ItemImplementation<Props, State, Actions, Slots>;
