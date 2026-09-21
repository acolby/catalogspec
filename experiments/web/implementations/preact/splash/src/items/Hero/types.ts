import type { ItemModelDefinition } from "../../../../../../models";
import type { ImplementationView } from "../../adapter";
import type { ImplementedItemLifecycle, ImplementedItemView, ModelBackedImplementedItem } from "../../../../../../renderers";
import type { Context } from "../../contexts";
import type { HeroProps, ThemeTokens } from "../../generated";

export type Props = HeroProps;
export type Theme = ThemeTokens;
export type State = Record<string, never>;
export type Actions = Record<string, never>;
export type Slots = {
  background?: ImplementationView;
  actions?: ImplementationView;
  content?: ImplementationView;
};
export type Model = ItemModelDefinition<State, Actions>;
export type Lifecycle = ImplementedItemLifecycle<Props, State, Actions, Context>;
export type View = ImplementedItemView<ImplementationView, Props, State, Actions, Slots, Context>;
export type Item = ModelBackedImplementedItem<ImplementationView, Props, State, Actions, Slots, Context>;
