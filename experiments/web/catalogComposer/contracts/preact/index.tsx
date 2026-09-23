import { render as mountPreact, type ComponentChildren } from "preact";
import { defineAdapter, defineCatalog as defineBaseCatalog } from "../define";
import type { ViewAdaptedImplementedCatalog } from "../catalog";
import type { DefaultSlots } from "../composer";
import type { ImplementedItemController, ImplementedItemView, ModelBackedImplementedItem } from "../item";

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

type ControllerProps<TController> = TController extends ImplementedItemController<infer TProps, any, any, any> ? TProps : never;
type ControllerState<TController> = TController extends ImplementedItemController<any, infer TState, any, any> ? TState : never;
type ControllerActions<TController> = TController extends ImplementedItemController<any, any, infer TActions, any> ? TActions : never;
type ControllerContext<TController> = TController extends ImplementedItemController<any, any, any, infer TContext> ? TContext : never;

export function defineItem<TContext>() {
  return function defineTypedItem<
    TController extends ImplementedItemController<any, any, any, TContext>,
  >({ controller }: { controller: TController }) {
    return function defineItemView<TSlots = DefaultSlots<View>>(
      view: ImplementedItemView<
        View,
        ControllerProps<TController>,
        ControllerState<TController>,
        ControllerActions<TController>,
        TSlots,
        ControllerContext<TController>
      >,
    ): ModelBackedImplementedItem<
      View,
      ControllerProps<TController>,
      ControllerState<TController>,
      ControllerActions<TController>,
      TSlots,
      ControllerContext<TController>
    > {
      return {
        ...controller,
        view,
      } as ModelBackedImplementedItem<
        View,
        ControllerProps<TController>,
        ControllerState<TController>,
        ControllerActions<TController>,
        TSlots,
        ControllerContext<TController>
      >;
    };
  };
}


function SlotBoundary({
  render,
}: {
  render(): View | readonly View[] | undefined;
}) {
  return <>{render()}</>;
}
