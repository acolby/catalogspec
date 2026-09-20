import type { ComponentChildren } from "preact";
import type { ItemModelDefinition } from "../../../../../../models";
import type { ImplementedItemView, ModelBackedImplementedItem } from "../../../../../../renderers";
import type { StackProps, ThemeTokens } from "../../generated";

export type Props = StackProps;
export type Theme = ThemeTokens;
export type State = Record<string, never>;
export type Actions = Record<string, never>;
export type Model = ItemModelDefinition<State, Actions>;
export type View = ImplementedItemView<ComponentChildren, Props, State, Actions, Theme>;
export type Item = ModelBackedImplementedItem<ComponentChildren, Props, State, Actions, Theme>;
