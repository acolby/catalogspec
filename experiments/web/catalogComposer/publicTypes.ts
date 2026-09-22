import type { ContextLifecycle, RuntimeContext, RuntimeContextValue } from "./context";
import type { ImplementedItemLifecycle, ImplementedItemView } from "./implementation";
import type { ItemModelDefinition, ReadonlyDeep } from "./model";
import type { DefaultSlots } from "./composer";
import type { ViewAdapter } from "./adapter";

export type ComposeItemView<
  TView,
  TProps extends Record<string, unknown>,
  TState extends object,
  TActions extends Record<string, (...args: any[]) => any>,
  TSlots = DefaultSlots<TView>,
  TContext = RuntimeContext,
> = ImplementedItemView<TView, TProps, TState, TActions, TSlots, TContext>;

export type ComposeItemLifecycle<
  TProps extends Record<string, unknown>,
  TState extends object,
  TActions extends Record<string, (...args: any[]) => any>,
  TContext = RuntimeContext,
> = ImplementedItemLifecycle<TProps, TState, TActions, TContext>;

export type ComposeContextLifecycle<
  TState extends object,
  TActions extends Record<string, (...args: any[]) => any>,
> = ContextLifecycle<TState, TActions>;

export type ComposeContextValue<
  TState = Record<string, unknown>,
  TActions extends Record<string, (...args: any[]) => any> = Record<string, (...args: any[]) => any>,
> = RuntimeContextValue<TState, TActions>;

export type ModelDefinition<
  TState extends object,
  TActions extends Record<string, (...args: any[]) => any>,
> = ItemModelDefinition<TState, TActions>;

export type { ReadonlyDeep, ViewAdapter };
