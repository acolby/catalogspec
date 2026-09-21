import type { ItemModelDefinition } from "../../../../../../models";
import type { ImplementationView } from "../../adapter";
import type { ImplementedItemLifecycle, ImplementedItemView, ModelBackedImplementedItem } from "../../../../../../renderers";
import type { Context } from "../../contexts";
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
export type Model = ItemModelDefinition<State, Actions>;
export type Lifecycle = ImplementedItemLifecycle<Props, State, Actions, Context>;
export type View = ImplementedItemView<ImplementationView, Props, State, Actions, Slots, Context>;
export type Item = ModelBackedImplementedItem<ImplementationView, Props, State, Actions, Slots, Context>;
