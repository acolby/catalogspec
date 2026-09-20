import type { ApiClient } from "../src/api";
import type { RuntimeCoordinator } from "../src/coordinator";
import type { CatalogImplementation, SceneSnapshot, ThemeTokens } from "../src/shared/types";
import type { RendererRuntimeContext } from "./types";

export type CreateSceneMounterOptions<TImplementation extends CatalogImplementation, TView> = {
  composeView(
    instance: SceneSnapshot["root"],
    implementation: TImplementation,
    runtime: RendererRuntimeContext,
  ): TView;
  renderView(root: Element, view: TView): void;
};

export type SceneMounterOptions<TImplementation extends CatalogImplementation> = {
  root: Element;
  coordinator: RuntimeCoordinator;
  api: ApiClient<TImplementation>;
};

export function createSceneMounter<TImplementation extends CatalogImplementation, TView>({
  composeView,
  renderView,
}: CreateSceneMounterOptions<TImplementation, TView>) {
  return function mountScene({ root, coordinator, api }: SceneMounterOptions<TImplementation>): () => void {
    let version = 0;
    let currentScene = coordinator.getScene();

    function composeAndRenderCurrentScene(): void {
      const scene = currentScene;
      const currentVersion = ++version;

      api.resolveImplementation(scene)
        .then((implementation) => {
          if (currentVersion !== version || !implementation) return;

          if (!matchesSceneCatalog(scene, implementation)) {
            throw new Error(`No matching implementation for ${scene.catalog.id}@${scene.catalog.version}.`);
          }

          const runtime: RendererRuntimeContext = {
            scene,
            theme: resolveTheme(scene, implementation),
            action: coordinator.handleAction,
            emit: coordinator.handleEvent,
            requestRender: composeAndRenderCurrentScene,
          };

          applySceneRoot(root, runtime.theme);
          renderView(root, composeView(scene.root, implementation, runtime));
        })
        .catch((error: unknown) => {
          console.error("Unable to resolve scene implementation.", error);
        });
    }

    return coordinator.onSceneChange((scene) => {
      currentScene = scene;
      composeAndRenderCurrentScene();
    });
  };
}

function matchesSceneCatalog(scene: SceneSnapshot, implementation: CatalogImplementation): boolean {
  return scene.catalog.id === implementation.catalog.id && scene.catalog.version === implementation.catalog.version;
}

function resolveTheme(scene: SceneSnapshot, implementation: CatalogImplementation): ThemeTokens | undefined {
  return implementation.themes?.[scene.theme ?? "light"] ?? implementation.themes?.light;
}

function applySceneRoot(root: Element, theme?: ThemeTokens): void {
  root.classList.add("scene-root");
  if (!(root instanceof HTMLElement)) return;

  root.style.fontFamily = theme?.font?.body ?? "";
  root.style.color = theme?.color?.text ?? "";
  root.style.background = theme?.color?.background ?? "";
}
