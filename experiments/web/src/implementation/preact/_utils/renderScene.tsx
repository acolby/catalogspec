import type { SceneSnapshot, ThemeTokens } from "../../../shared/types";
import { renderPreactInstance } from "./renderInstance";
import type { PreactCatalogImplementation, RuntimeContext } from "./types";

export type PreactRenderSceneProps = {
  scene: SceneSnapshot;
  implementation: PreactCatalogImplementation;
  onAction: RuntimeContext["action"];
  onEvent: RuntimeContext["emit"];
};

export function PreactRenderScene({ scene, implementation, onAction, onEvent }: PreactRenderSceneProps) {
  if (scene.catalog.id !== implementation.catalog.id || scene.catalog.version !== implementation.catalog.version) {
    return <PreactRuntimeError message={`No matching implementation for ${scene.catalog.id}@${scene.catalog.version}.`} />;
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
      {renderPreactInstance(scene.root, implementation, runtime)}
    </div>
  );
}

function resolveTheme(scene: SceneSnapshot, implementation: PreactCatalogImplementation): ThemeTokens | undefined {
  return implementation.themes?.[scene.theme ?? "light"] ?? implementation.themes?.light;
}

function PreactRuntimeError({ message }: { message: string }) {
  return <div class="runtime-error">{message}</div>;
}
