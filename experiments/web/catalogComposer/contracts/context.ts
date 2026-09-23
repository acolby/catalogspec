import type { ItemModelDefinition, ReadonlyDeep } from "../model";
import type { LifecycleFrame } from "./lifecycle";

export type RuntimeContextValue<
  TState = Record<string, unknown>,
  TActions extends Record<string, (...args: any[]) => any> = Record<string, (...args: any[]) => any>,
> = {
  state: TState;
  actions: TActions;
};

export type RuntimeContext = Record<string, RuntimeContextValue<any, any>>;

export type ComposeContextValue<
  TState = Record<string, unknown>,
  TActions extends Record<string, (...args: any[]) => any> = Record<string, (...args: any[]) => any>,
> = RuntimeContextValue<TState, TActions>;

export type ContextLifecycleInput<
  TState extends object,
  TActions extends Record<string, (...args: any[]) => any>,
> = RuntimeContextValue<ReadonlyDeep<TState>, TActions>;

export type ContextLifecycle<
  TState extends object,
  TActions extends Record<string, (...args: any[]) => any>,
> = {
  mount?(input: ContextLifecycleInput<TState, TActions>): void | (() => void);
  unmount?(input: ContextLifecycleInput<TState, TActions>): void;
  tick?(input: ContextLifecycleInput<TState, TActions>, frame: LifecycleFrame): void;
};

export type ContextImplementation<
  TState extends object,
  TActions extends Record<string, (...args: any[]) => any>,
> = ItemModelDefinition<TState, TActions, { context: RuntimeContext }> & {
  lifecycle?: ContextLifecycle<TState, TActions>;
};

export type ContextImplementations = Record<string, ContextImplementation<any, any>>;
