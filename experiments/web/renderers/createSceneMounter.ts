import type { ApiClient } from "../src/api";
import type { RuntimeCoordinator } from "../src/coordinator";
import type { SceneSnapshot } from "../src/shared/types";

export type CreateSceneMounterOptions<TImplementation, TView, TRenderImplementedItem> = {
  renderView(root: Element, view: TView): void;
  renderScene(input: {
    scene: SceneSnapshot;
    implementation: TImplementation;
    renderImplementedItem: TRenderImplementedItem;
    onAction: RuntimeCoordinator["handleAction"];
    onEvent: RuntimeCoordinator["handleEvent"];
    requestRender(): void;
  }): TView;
  renderImplementedItem: TRenderImplementedItem;
};

export type SceneMounterOptions<TImplementation> = {
  root: Element;
  coordinator: RuntimeCoordinator;
  api: ApiClient<TImplementation>;
};

export function createSceneMounter<TImplementation, TView, TRenderImplementedItem>({
  renderView,
  renderScene,
  renderImplementedItem,
}: CreateSceneMounterOptions<TImplementation, TView, TRenderImplementedItem>) {
  return function mountScene({ root, coordinator, api }: SceneMounterOptions<TImplementation>): () => void {
    let version = 0;
    let currentScene = coordinator.getScene();

    function renderCurrentScene(): void {
      const scene = currentScene;
      const currentVersion = ++version;

      api.resolveImplementation(scene)
        .then((implementation) => {
          if (currentVersion !== version || !implementation) return;

          renderView(
            root,
            renderScene({
              scene,
              implementation,
              renderImplementedItem,
              onAction: coordinator.handleAction,
              onEvent: coordinator.handleEvent,
              requestRender: renderCurrentScene,
            }),
          );
        })
        .catch((error: unknown) => {
          console.error("Unable to resolve scene implementation.", error);
        });
    }

    return coordinator.onSceneChange((scene) => {
      currentScene = scene;
      renderCurrentScene();
    });
  };
}
