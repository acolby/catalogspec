import type { ComponentChildren } from "preact";
import type { ItemModelDefinition } from "../../../../../../models";
import type { ImplementedItemLifecycle, ImplementedItemView, ModelBackedImplementedItem } from "../../../../../../renderers";
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
export type Model = ItemModelDefinition<State, Actions>;
export type Lifecycle = ImplementedItemLifecycle<Props, State, Actions, Theme>;
export type View = ImplementedItemView<ComponentChildren, Props, State, Actions, Theme>;
export type Item = ModelBackedImplementedItem<ComponentChildren, Props, State, Actions, Theme>;
