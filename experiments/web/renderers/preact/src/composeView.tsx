import type { ComponentChildren, ComponentType } from "preact";
import { createItemModel } from "../../../models";
import { isModelBackedImplementedItem, type ModelBackedImplementedItem } from "../../implementedItem";
import type { ActionHandler, ImplementedCatalog, ImplementedItemInput, RendererRuntimeContext } from "../../types";
import type { SceneItemInstance } from "../../../src/shared/types";

type PreactPlainImplementedItem = ComponentType<ImplementedItemInput<ComponentChildren, any>>;
type PreactModelBackedImplementedItem = ModelBackedImplementedItem<ComponentChildren, any, any, any>;
type PreactImplementedItem = PreactPlainImplementedItem | PreactModelBackedImplementedItem;
export type PreactImplementedCatalog = ImplementedCatalog<PreactImplementedItem>;

type ModelRecord = {
  model: ReturnType<typeof createItemModel<any, any>>;
  unsubscribe: () => void;
};

const itemModels = new Map<string, ModelRecord>();

export function composeView(instance: SceneItemInstance, implementedCatalog: PreactImplementedCatalog, runtime: RendererRuntimeContext) {
  const implementedItem = implementedCatalog.items[instance.item];
  if (!implementedItem) return <MissingItem instance={instance} />;

  const slots: Record<string, ComponentChildren> = {};
  for (const [slotName, children] of Object.entries(instance.slots ?? {})) {
    slots[slotName] = children.map((child) => composeView(child, implementedCatalog, runtime));
  }

  const baseInput = {
    item: { id: instance.id, name: instance.item },
    props: instance.props ?? {},
    slots,
    emit: (event: string, props?: Record<string, unknown>) => runtime.emit({ name: event, source: instance, props }),
    scene: {
      theme: runtime.theme,
      state: runtime.scene.state ?? {},
      actions: createActions((action, props) => runtime.action({ name: action, props })),
    },
  };

  if (isModelBackedImplementedItem(implementedItem)) {
    const model = getItemModel(instance, implementedItem, runtime);
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

  itemModels.set(key, { model, unsubscribe });
  return model;
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
