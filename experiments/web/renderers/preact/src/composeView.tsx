import type { ComponentChildren, ComponentType } from "preact";
import { createItemModel } from "../../../models";
import { isModelBackedImplementedItem, type ModelBackedImplementedItem } from "../../implementedItem";
import type { ActionHandler, ImplementedCatalog, ImplementedItemInput, RendererRuntimeContext } from "../../types";
import type { SceneItemInstance } from "../../../src/shared/types";

type PreactPlainImplementedItem = ComponentType<ImplementedItemInput<ComponentChildren, any, any, any, any, any>>;
type PreactModelBackedImplementedItem = ModelBackedImplementedItem<ComponentChildren, any, any, any, any, any>;
type PreactImplementedItem = PreactPlainImplementedItem | PreactModelBackedImplementedItem;
export type PreactImplementedCatalog = ImplementedCatalog<PreactImplementedItem, any>;

type ModelRecord = {
  model: ReturnType<typeof createItemModel<any, any>>;
  unsubscribe: () => void;
  mounted: boolean;
};

const itemModels = new Map<string, ModelRecord>();

export function composeView(instance: SceneItemInstance, implementedCatalog: PreactImplementedCatalog, runtime: RendererRuntimeContext) {
  runtime.lifecycle.enterItem(instance.id);

  const implementedItem = implementedCatalog.items[instance.item];
  if (!implementedItem) return <MissingItem instance={instance} />;

  const slots: Record<string, ComponentChildren | undefined> = {};
  for (const [slotName, children] of Object.entries(instance.slots ?? {})) {
    slots[slotName] = createSlotOutlet(instance, slotName, children, implementedCatalog, runtime);
  }

  const baseInput = {
    item: { id: instance.id, name: instance.item },
    props: instance.props ?? {},
    slots,
    emit: (event: string, props?: Record<string, unknown>) => runtime.emit({ name: event, source: instance, props }),
    context: runtime.context,
  };

  if (isModelBackedImplementedItem(implementedItem)) {
    const model = getItemModel(instance, implementedItem, runtime);
    mountItem(instance, implementedItem, model, runtime);
    const View = implementedItem.view;

    return (
      <View
        key={instance.id}
        {...baseInput}
        state={model.state()}
        actions={model.actions()}
      />
    );
  }

  const Component = implementedItem as PreactPlainImplementedItem;
  return (
    <Component
      key={instance.id}
      {...baseInput}
      state={instance.state ?? {}}
      actions={createActions((action, props) => runtime.action({ name: action, source: instance, props }))}
    />
  );
}

export type ComposeView = typeof composeView;

function getItemModel(instance: SceneItemInstance, implementedItem: PreactModelBackedImplementedItem, runtime: RendererRuntimeContext) {
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
  implementedItem: PreactModelBackedImplementedItem,
  model: ReturnType<typeof createItemModel<any, any>>,
  runtime: RendererRuntimeContext,
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

function lifecycleInput(instance: SceneItemInstance, model: ReturnType<typeof createItemModel<any, any>>, runtime: RendererRuntimeContext) {
  return {
    item: { id: instance.id, name: instance.item },
    props: instance.props ?? {},
    state: model.state(),
    actions: model.actions(),
    emit: (event: string, props?: Record<string, unknown>) => runtime.emit({ name: event, source: instance, props }),
    context: runtime.context,
  };
}

function createSlotOutlet(
  parent: SceneItemInstance,
  slotName: string,
  children: SceneItemInstance[],
  implementedCatalog: PreactImplementedCatalog,
  runtime: RendererRuntimeContext,
): ComponentChildren | undefined {
  if (children.length === 0) return undefined;

  return (
    <SlotOutlet
      key={`${parent.id}:${slotName}`}
      parentId={parent.id}
      slotName={slotName}
      childrenInstances={children}
      implementedCatalog={implementedCatalog}
      runtime={runtime}
    />
  );
}

function SlotOutlet({
  childrenInstances,
  implementedCatalog,
  runtime,
}: {
  parentId: string;
  slotName: string;
  childrenInstances: SceneItemInstance[];
  implementedCatalog: PreactImplementedCatalog;
  runtime: RendererRuntimeContext;
}) {
  return <>{childrenInstances.map((child) => composeView(child, implementedCatalog, runtime))}</>;
}

function createActions(dispatch: (action: string, props?: Record<string, unknown>) => void): Record<string, ActionHandler> {
  return new Proxy({}, {
    get(_target, property) {
      if (typeof property !== "string") return undefined;
      return (props?: Record<string, unknown>) => dispatch(property, props);
    },
  }) as Record<string, ActionHandler>;
}

function MissingItem({ instance }: { instance: SceneItemInstance }) {
  return (
    <div class="runtime-error">
      Missing implementation for <code>{instance.item}</code> <small>({instance.id})</small>
    </div>
  );
}
