import type { ComponentChildren } from "preact";
import type { CatalogImplementation, SceneItemInstance, SceneSnapshot } from "../scene";

interface RenderSceneProps {
  scene: SceneSnapshot;
  implementation: CatalogImplementation;
  emitEvent(instanceId: string, event: string, props?: Record<string, unknown>): void;
  requestAction(instanceId: string, action: string, props?: Record<string, unknown>): void;
}

export function RenderScene(props: RenderSceneProps) {
  return <>{renderInstance(props.scene.root, props)}</>;
}

function renderInstance(instance: SceneItemInstance, props: RenderSceneProps): ComponentChildren {
  const Component = props.implementation.items[instance.item];

  if (!Component) {
    return (
      <div class="runtime-error" data-instance-id={instance.id}>
        Missing implementation for item <code>{instance.item}</code>.
      </div>
    );
  }

  return (
    <div class="scene-instance" data-instance-id={instance.id} data-item={instance.item}>
      <Component
        scene={props.scene}
        instance={instance}
        emitEvent={(event, eventProps) => props.emitEvent(instance.id, event, eventProps)}
        requestAction={(action, actionProps) => props.requestAction(instance.id, action, actionProps)}
        renderSlot={(slotName) => renderSlot(instance, slotName, props)}
      />
    </div>
  );
}

function renderSlot(instance: SceneItemInstance, slotName: string, props: RenderSceneProps): ComponentChildren {
  const children = instance.slots?.[slotName] ?? [];
  return children.map((child) => renderInstance(child, props));
}
