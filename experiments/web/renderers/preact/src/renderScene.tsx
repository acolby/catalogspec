import type { ComponentChildren, ComponentType } from "preact";
import type { ModelBackedImplementedItem } from "../../implementedItem";
import type { ImplementedCatalog, ImplementedItemInput, RendererRuntimeContext } from "../../types";
import type { SceneSnapshot, ThemeTokens } from "../../../src/shared/types";
import type { RenderImplementedItem } from "./renderImplementedItem";

type PreactImplementedItem = ComponentType<ImplementedItemInput<ComponentChildren, any>> | ModelBackedImplementedItem<ComponentChildren, any, any, any, any>;
type PreactImplementedCatalog = ImplementedCatalog<PreactImplementedItem>;

export type RenderSceneProps = {
  scene: SceneSnapshot;
  implementation: PreactImplementedCatalog;
  renderImplementedItem: RenderImplementedItem;
  onAction: RendererRuntimeContext["action"];
  onEvent: RendererRuntimeContext["emit"];
  requestRender: RendererRuntimeContext["requestRender"];
};

export function renderScene({ scene, implementation, renderImplementedItem, onAction, onEvent, requestRender }: RenderSceneProps) {
  if (scene.catalog.id !== implementation.catalog.id || scene.catalog.version !== implementation.catalog.version) {
    return <RuntimeError message={`No matching implementation for ${scene.catalog.id}@${scene.catalog.version}.`} />;
  }

  const theme = resolveTheme(scene, implementation);
  const runtime: RendererRuntimeContext = {
    scene,
    theme,
    action: onAction,
    emit: onEvent,
    requestRender,
  };

  return (
    <div class="scene-root" style={{ fontFamily: theme?.font?.body, color: theme?.color?.text, background: theme?.color?.background }}>
      {renderImplementedItem(scene.root, implementation, runtime)}
    </div>
  );
}

function resolveTheme(scene: SceneSnapshot, implementation: PreactImplementedCatalog): ThemeTokens | undefined {
  return implementation.themes?.[scene.theme ?? "light"] ?? implementation.themes?.light;
}

function RuntimeError({ message }: { message: string }) {
  return <div class="runtime-error">{message}</div>;
}
