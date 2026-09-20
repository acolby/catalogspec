import type { ApiClient } from "../src/api";
import type { RuntimeCoordinator } from "../src/coordinator";
import type { SceneSnapshot } from "../src/shared/types";

export type CreateSceneMounterOptions<TImplementation, TView, TRenderItem> = {
  renderView(root: Element, view: TView): void;
  renderScene(input: {
    scene: SceneSnapshot;
    implementation: TImplementation;
    renderItem: TRenderItem;
    onAction: RuntimeCoordinator["handleAction"];
    onEvent: RuntimeCoordinator["handleEvent"];
  }): TView;
  renderItem: TRenderItem;
};

export type SceneMounterOptions<TImplementation> = {
  root: Element;
  coordinator: RuntimeCoordinator;
  api: ApiClient<TImplementation>;
};

export function createSceneMounter<TImplementation, TView, TRenderItem>({
  renderView,
  renderScene,
  renderItem,
}: CreateSceneMounterOptions<TImplementation, TView, TRenderItem>) {
  return function mountScene({ root, coordinator, api }: SceneMounterOptions<TImplementation>): () => void {
    let version = 0;

    return coordinator.onSceneChange((scene) => {
      const currentVersion = ++version;

      api.resolveImplementation(scene)
        .then((implementation) => {
          if (currentVersion !== version || !implementation) return;

          renderView(
            root,
            renderScene({
              scene,
              implementation,
              renderItem,
              onAction: coordinator.handleAction,
              onEvent: coordinator.handleEvent,
            }),
          );
        })
        .catch((error: unknown) => {
          console.error("Unable to resolve scene implementation.", error);
        });
    });
  };
}
