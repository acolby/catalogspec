import type { SceneSnapshot, ThemeTokens } from "../../../src/shared/types";
import type { PreactCatalogImplementation, RuntimeContext } from "./types";
import type { RenderItem } from "./renderItem";

export type RenderSceneProps = {
  scene: SceneSnapshot;
  implementation: PreactCatalogImplementation;
  renderItem: RenderItem;
  onAction: RuntimeContext["action"];
  onEvent: RuntimeContext["emit"];
};

export function renderScene({ scene, implementation, renderItem, onAction, onEvent }: RenderSceneProps) {
  if (scene.catalog.id !== implementation.catalog.id || scene.catalog.version !== implementation.catalog.version) {
    return <RuntimeError message={`No matching implementation for ${scene.catalog.id}@${scene.catalog.version}.`} />;
  }

  const theme = resolveTheme(scene, implementation);
  const runtime: RuntimeContext = {
    scene,
    theme,
    action: onAction,
    emit: onEvent,
  };

  return (
    <div class="scene-root" style={{ fontFamily: theme?.font?.body, color: theme?.color?.text, background: theme?.color?.background }}>
      {renderItem(scene.root, implementation, runtime)}
    </div>
  );
}

function resolveTheme(scene: SceneSnapshot, implementation: PreactCatalogImplementation): ThemeTokens | undefined {
  return implementation.themes?.[scene.theme ?? "light"] ?? implementation.themes?.light;
}

function RuntimeError({ message }: { message: string }) {
  return <div class="runtime-error">{message}</div>;
}
