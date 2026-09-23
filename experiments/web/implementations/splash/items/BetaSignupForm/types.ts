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
