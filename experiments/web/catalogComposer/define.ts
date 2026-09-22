import type { ViewAdaptedImplementedCatalog } from "./composeView";
import type { ContextImplementation } from "./context";
import type { ModelBackedImplementedItem } from "./implementedItem";
import type { RuntimeContext } from "./context";
import type { DefaultSlots, ViewAdapter } from "./types";

export function defineAdapter<TView>(adapter: ViewAdapter<TView>): ViewAdapter<TView> {
  return adapter;
}

export function defineCatalog<TView>(catalog: ViewAdaptedImplementedCatalog<TView>): ViewAdaptedImplementedCatalog<TView> {
  return catalog;
}

export function defineContext<
  TState extends object,
  TActions extends Record<string, (...args: any[]) => any>,
>(context: ContextImplementation<TState, TActions>): ContextImplementation<TState, TActions> {
  return context;
}

export function defineItem<TView, TContext = RuntimeContext>() {
  return function defineTypedItem<
    TProps extends Record<string, unknown>,
    TState extends object,
    TActions extends Record<string, (...args: any[]) => any>,
    TSlots = DefaultSlots<TView>,
  >(
    item: ModelBackedImplementedItem<TView, TProps, TState, TActions, TSlots, TContext>,
  ): ModelBackedImplementedItem<TView, TProps, TState, TActions, TSlots, TContext> {
    return item;
  };
}
