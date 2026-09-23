import type { ViewAdaptedImplementedCatalog } from "./catalog";
import type { ContextImplementation, RuntimeContext } from "./context";
import type { ImplementedItemController } from "./item";
import type { ViewAdapter } from "./adapter";

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

export function defineItemController<TContext = RuntimeContext>() {
  return function defineTypedController<
    TProps extends Record<string, unknown>,
    TState extends object,
    TActions extends Record<string, (...args: any[]) => any>,
    TSelected = { props: TProps; state: TState; context: TContext },
  >(
    controller: ImplementedItemController<TProps, TState, TActions, TContext, TSelected>,
  ): ImplementedItemController<TProps, TState, TActions, TContext, TSelected> {
    return controller;
  };
}

