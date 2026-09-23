import type { ItemModelDefinition, ReadonlyDeep } from "../model";
import type { RuntimeContext } from "./context";
import type { ImplementedItemContext, ImplementedItemInput } from "./composer";
import type { LifecycleFrame } from "./lifecycle";

export type { LifecycleFrame };

export type ImplementedItemLifecycleInput<
  TProps extends Record<string, unknown>,
  TState extends object,
  TActions extends Record<string, (...args: any[]) => any>,
  TContext = RuntimeContext,
> = Omit<ImplementedItemInput<unknown, TProps, ReadonlyDeep<TState>, TActions, Record<string, unknown[]>, TContext>, "slots">;

export type ImplementedItemLifecycle<
  TProps extends Record<string, unknown>,
  TState extends object,
  TActions extends Record<string, (...args: any[]) => any>,
  TContext = RuntimeContext,
> = {
  mount?(input: ImplementedItemLifecycleInput<TProps, TState, TActions, TContext>): void | (() => void);
  unmount?(input: ImplementedItemLifecycleInput<TProps, TState, TActions, TContext>): void;
  tick?(input: ImplementedItemLifecycleInput<TProps, TState, TActions, TContext>, frame: LifecycleFrame): void;
};

export type ImplementedItemSelectInput<
  TProps extends Record<string, unknown>,
  TState extends object,
  TContext = RuntimeContext,
> = {
  props: TProps;
  state: ReadonlyDeep<TState>;
  context: TContext;
};

export type ImplementedItemViewInput<
  TView,
  TActions extends Record<string, (...args: any[]) => any>,
  TSelected,
  TSlots = Record<string, TView | undefined>,
  TContext = RuntimeContext,
> = {
  item: {
    id: string;
    name: string;
  };
  emit: ImplementedItemContext<TContext>["emit"];
  selected: TSelected;
  actions: TActions;
  slots: TSlots;
};

export type ImplementedItemView<
  TView,
  TProps extends Record<string, unknown>,
  TState extends object,
  TActions extends Record<string, (...args: any[]) => any>,
  TSelected,
  TSlots = Record<string, TView | undefined>,
  TContext = RuntimeContext,
> = (input: ImplementedItemViewInput<TView, TActions, TSelected, TSlots, TContext>) => TView;

export type ImplementedItemController<
  TProps extends Record<string, unknown>,
  TState extends object,
  TActions extends Record<string, (...args: any[]) => any>,
  TContext = RuntimeContext,
  TSelected = ImplementedItemSelectInput<TProps, TState, TContext>,
> = ItemModelDefinition<TState, TActions, { props: TProps; context: TContext }> & {
  select?: (input: ImplementedItemSelectInput<TProps, TState, TContext>) => TSelected;
  lifecycle?: ImplementedItemLifecycle<TProps, TState, TActions, TContext>;
};

export type ModelBackedImplementedItem<
  TView,
  TProps extends Record<string, unknown>,
  TState extends object,
  TActions extends Record<string, (...args: any[]) => any>,
  TContext = RuntimeContext,
  TSelected = ImplementedItemSelectInput<TProps, TState, TContext>,
  TSlots = Record<string, TView | undefined>,
> = ImplementedItemController<TProps, TState, TActions, TContext, TSelected> & {
  view: ImplementedItemView<TView, TProps, TState, TActions, TSelected, TSlots, TContext>;
};

export function isModelBackedImplementedItem(value: unknown): value is ModelBackedImplementedItem<any, any, any, any, any, any> {
  return !!value && typeof value === "object" && "actions" in value && "view" in value;
}
