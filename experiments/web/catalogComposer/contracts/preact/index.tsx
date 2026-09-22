import { render as mountPreact, type ComponentChildren } from "preact";
import { defineAdapter, defineCatalog as defineBaseCatalog, defineItem as defineBaseItem } from "../define";
import type { ViewAdaptedImplementedCatalog } from "../catalog";
import type { DefaultSlots } from "../composer";
import type {
  ComposeItemLifecycle,
  ComposeItemView,
  ModelDefinition,
} from "../public";

export type View = ComponentChildren;
export type ItemSlot = View;

export const adapter = defineAdapter<View>({
  boundary({ key, render }) {
    return (
      <SlotBoundary
        key={key}
        render={render}
      />
    );
  },

  mount(root, view) {
    mountPreact(view, root);
  },
});

export function defineCatalog(catalog: ViewAdaptedImplementedCatalog<View>): ViewAdaptedImplementedCatalog<View> {
  return defineBaseCatalog<View>(catalog);
}

export function defineItem<TContext>() {
  return defineBaseItem<View, TContext>();
}

export type ItemModel<
  TState extends object,
  TActions extends Record<string, (...args: any[]) => any>,
> = ModelDefinition<TState, TActions>;

export type ItemLifecycle<
  TProps extends Record<string, unknown>,
  TState extends object,
  TActions extends Record<string, (...args: any[]) => any>,
  TContext,
> = ComposeItemLifecycle<TProps, TState, TActions, TContext>;

export type ItemView<
  TProps extends Record<string, unknown>,
  TState extends object,
  TActions extends Record<string, (...args: any[]) => any>,
  TSlots = DefaultSlots<View>,
  TContext = unknown,
> = ComposeItemView<View, TProps, TState, TActions, TSlots, TContext>;

function SlotBoundary({
  render,
}: {
  render(): View | readonly View[] | undefined;
}) {
  return <>{render()}</>;
}
