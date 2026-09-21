import type { ItemModelDefinition, ReadonlyDeep } from "../models";
import type { RuntimeContext } from "./context";
import type { ImplementedItemInput } from "./types";

export type LifecycleFrame = {
  now: number;
  deltaMs: number;
};

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

export type ImplementedItemView<
  TView,
  TProps extends Record<string, unknown>,
  TState extends object,
  TActions extends Record<string, (...args: any[]) => any>,
  TSlots = Record<string, TView | undefined>,
  TContext = RuntimeContext,
> = (input: ImplementedItemInput<TView, TProps, ReadonlyDeep<TState>, TActions, TSlots, TContext>) => TView;

export type ModelBackedImplementedItem<
  TView,
  TProps extends Record<string, unknown>,
  TState extends object,
  TActions extends Record<string, (...args: any[]) => any>,
  TSlots = Record<string, TView | undefined>,
  TContext = RuntimeContext,
> = {
  model: ItemModelDefinition<TState, TActions>;
  lifecycle: ImplementedItemLifecycle<TProps, TState, TActions, TContext>;
  view: ImplementedItemView<TView, TProps, TState, TActions, TSlots, TContext>;
};

export function isModelBackedImplementedItem(value: unknown): value is ModelBackedImplementedItem<any, any, any, any, any, any> {
  return !!value && typeof value === "object" && "model" in value && "view" in value;
}
