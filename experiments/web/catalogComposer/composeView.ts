import { createItemModel } from "./model";
import type { SceneItemInstance } from "../src/shared/types";
import { type ModelBackedImplementedItem } from "./implementedItem";
import type { ImplementedCatalog, ComposerRuntimeContext, ViewAdapter } from "./types";

type GenericImplementedItem<TView> = ModelBackedImplementedItem<TView, any, any, any, any, any>;
export type GenericImplementedCatalog<TView> = ImplementedCatalog<GenericImplementedItem<TView>, any>;
export type ViewAdaptedImplementedCatalog<TView> = GenericImplementedCatalog<TView> & {
  adapter: ViewAdapter<TView>;
};

type ModelRecord = {
  model: ReturnType<typeof createItemModel<any, any>>;
  unsubscribe: () => void;
  mounted: boolean;
};

export type ViewComposer<TView> = {
  composeView(
    instance: SceneItemInstance,
    implementedCatalog: GenericImplementedCatalog<TView>,
    runtime: ComposerRuntimeContext,
    adapter: ViewAdapter<TView>,
  ): TView;
  dispose(): void;
};

export function createViewComposer<TView>(): ViewComposer<TView> {
  const itemModels = new Map<string, ModelRecord>();

  function composeView(
    instance: SceneItemInstance,
    implementedCatalog: GenericImplementedCatalog<TView>,
    runtime: ComposerRuntimeContext,
    adapter: ViewAdapter<TView>,
  ): TView {
    runtime.lifecycle.enterItem(instance.id);

    const implementedItem = implementedCatalog.items[instance.item];
    if (!implementedItem) throw new Error(`Missing implementation for ${instance.item} (${instance.id}).`);

    const slots: Record<string, TView | undefined> = {};
    for (const [slotName, children] of Object.entries(instance.slots ?? {})) {
      slots[slotName] = createSlotOutlet(instance, slotName, children, implementedCatalog, runtime, adapter);
    }

    const model = getItemModel(instance, implementedItem, runtime);
    mountItem(instance, implementedItem, model, runtime);

    return implementedItem.view({
      item: { id: instance.id, name: instance.item },
      props: instance.props ?? {},
      slots,
      emit: (event: string, props?: Record<string, unknown>) => runtime.emit({ name: event, source: instance, props }),
      context: runtime.context,
      state: model.state(),
      actions: model.actions(),
    });
  }

  function createSlotOutlet(
    parent: SceneItemInstance,
    slotName: string,
    children: SceneItemInstance[],
    implementedCatalog: GenericImplementedCatalog<TView>,
    runtime: ComposerRuntimeContext,
    adapter: ViewAdapter<TView>,
  ): TView | undefined {
    if (children.length === 0) return undefined;

    return adapter.boundary({
      key: `${parent.id}:${slotName}`,
      kind: "slot",
      render: () => children.map((child) => composeView(child, implementedCatalog, runtime, adapter)),
    });
  }

  function getItemModel(
    instance: SceneItemInstance,
    implementedItem: GenericImplementedItem<TView>,
    runtime: ComposerRuntimeContext,
  ) {
    const key = instance.id;
    const existing = itemModels.get(key);
    if (existing) return existing.model;

    const model = createItemModel(
      instance.state ?? {},
      implementedItem.model,
    );
    const unsubscribe = model.subscribe((state, previous) => {
      runtime.emit({ name: "stateChanged", source: instance, props: { state, previous } });
      runtime.requestRender();
    });

    itemModels.set(key, { model, unsubscribe, mounted: false });
    return model;
  }

  function mountItem(
    instance: SceneItemInstance,
    implementedItem: GenericImplementedItem<TView>,
    model: ReturnType<typeof createItemModel<any, any>>,
    runtime: ComposerRuntimeContext,
  ): void {
    const record = itemModels.get(instance.id);
    if (!record || record.mounted) return;

    const lifecycle = implementedItem.lifecycle;
    const cleanupMount = lifecycle?.mount?.(lifecycleInput(instance, model, runtime));
    const unsubscribeTick = lifecycle?.tick
      ? runtime.lifecycle.onTick((frame) => lifecycle.tick?.(lifecycleInput(instance, model, runtime), frame))
      : undefined;

    record.mounted = true;
    runtime.lifecycle.enterItem(instance.id, () => {
      unsubscribeTick?.();
      if (typeof cleanupMount === "function") cleanupMount();
      lifecycle?.unmount?.(lifecycleInput(instance, model, runtime));
      record.unsubscribe();
      itemModels.delete(instance.id);
    });
  }

  function dispose(): void {
    for (const record of itemModels.values()) record.unsubscribe();
    itemModels.clear();
  }

  return { composeView, dispose };
}

const defaultComposer = createViewComposer<any>();

export function composeView<TView>(
  instance: SceneItemInstance,
  implementedCatalog: GenericImplementedCatalog<TView>,
  runtime: ComposerRuntimeContext,
  adapter: ViewAdapter<TView>,
): TView {
  return defaultComposer.composeView(instance, implementedCatalog, runtime, adapter);
}

function lifecycleInput(instance: SceneItemInstance, model: ReturnType<typeof createItemModel<any, any>>, runtime: ComposerRuntimeContext) {
  return {
    item: { id: instance.id, name: instance.item },
    props: instance.props ?? {},
    state: model.state(),
    actions: model.actions(),
    emit: (event: string, props?: Record<string, unknown>) => runtime.emit({ name: event, source: instance, props }),
    context: runtime.context,
  };
}
