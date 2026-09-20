import type { ApiClient } from "../src/api";
import type { RuntimeCoordinator } from "../src/coordinator";
import type { SceneSnapshot } from "../src/shared/types";

export type CreateSceneMounterOptions<TImplementation, TView, TComposeImplementedItemView> = {
  renderView(root: Element, view: TView): void;
  composeSceneView(input: {
    scene: SceneSnapshot;
    implementation: TImplementation;
    composeImplementedItemView: TComposeImplementedItemView;
    onAction: RuntimeCoordinator["handleAction"];
    onEvent: RuntimeCoordinator["handleEvent"];
    requestRender(): void;
  }): TView;
  composeImplementedItemView: TComposeImplementedItemView;
};

export type SceneMounterOptions<TImplementation> = {
  root: Element;
  coordinator: RuntimeCoordinator;
  api: ApiClient<TImplementation>;
};

export function createSceneMounter<TImplementation, TView, TComposeImplementedItemView>({
  renderView,
  composeSceneView,
  composeImplementedItemView,
}: CreateSceneMounterOptions<TImplementation, TView, TComposeImplementedItemView>) {
  return function mountScene({ root, coordinator, api }: SceneMounterOptions<TImplementation>): () => void {
    let version = 0;
    let currentScene = coordinator.getScene();

    function composeAndRenderCurrentScene(): void {
      const scene = currentScene;
      const currentVersion = ++version;

      api.resolveImplementation(scene)
        .then((implementation) => {
          if (currentVersion !== version || !implementation) return;

          renderView(
            root,
            composeSceneView({
              scene,
              implementation,
              composeImplementedItemView,
              onAction: coordinator.handleAction,
              onEvent: coordinator.handleEvent,
              requestRender: composeAndRenderCurrentScene,
            }),
          );
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
