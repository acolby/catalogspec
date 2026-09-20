import type { ApiClient } from "../src/api";
import type { RuntimeCoordinator } from "../src/coordinator";
import type { CatalogImplementation, SceneSnapshot, ThemeTokens } from "../src/shared/types";
import { createItemModel, type ItemModel, type ItemModelDefinition } from "../models";
import type { ActionHandler, RendererRuntimeContext } from "./types";

type SceneModelDefinition = ItemModelDefinition<any, any>;
type SceneModelImplementation<TItem = unknown> = CatalogImplementation<TItem> & {
  model?: SceneModelDefinition;
};

export type CreateSceneMounterOptions<TImplementation extends SceneModelImplementation, TView> = {
  composeView(
    instance: SceneSnapshot["root"],
    implementation: TImplementation,
    runtime: RendererRuntimeContext,
  ): TView;
  renderView(root: Element, view: TView): void;
};

export type SceneMounterOptions<TImplementation extends SceneModelImplementation> = {
  root: Element;
  coordinator: RuntimeCoordinator;
  api: ApiClient<TImplementation>;
};

export function createSceneMounter<TImplementation extends SceneModelImplementation, TView>({
  composeView,
  renderView,
}: CreateSceneMounterOptions<TImplementation, TView>) {
  return function mountScene({ root, coordinator, api }: SceneMounterOptions<TImplementation>): () => void {
    let version = 0;
    let currentScene = coordinator.getScene();
    let sceneModel: ItemModel<any, any> | undefined;
    let sceneModelKey: string | undefined;
    let unsubscribeSceneModel: (() => void) | undefined;

    function composeAndRenderCurrentScene(): void {
      const scene = currentScene;
      const currentVersion = ++version;

      api.resolveImplementation(scene)
        .then((implementation) => {
          if (currentVersion !== version || !implementation) return;

          if (!matchesSceneCatalog(scene, implementation)) {
            throw new Error(`No matching implementation for ${scene.catalog.id}@${scene.catalog.version}.`);
          }

          const sceneRuntimeModel = getSceneModel(scene, implementation);
          const sceneState = sceneRuntimeModel?.state() ?? scene.state ?? {};
          const sceneActions = createSceneActions({
            modelActions: sceneRuntimeModel?.actions(),
            dispatchExternalAction: (action, props) => coordinator.handleAction({ name: action, props }),
          });

          const runtime: RendererRuntimeContext = {
            scene,
            theme: resolveTheme(scene, implementation),
            action: coordinator.handleAction,
            emit: coordinator.handleEvent,
            sceneState,
            sceneActions,
            requestRender: composeAndRenderCurrentScene,
          };

          applySceneRoot(root, runtime.theme);
          renderView(root, composeView(scene.root, implementation, runtime));
        })
        .catch((error: unknown) => {
          console.error("Unable to resolve scene implementation.", error);
        });
    }

    function getSceneModel(scene: SceneSnapshot, implementation: TImplementation): ItemModel<any, any> | undefined {
      if (!implementation.model) return undefined;
      const key = `${scene.catalog.id}@${scene.catalog.version}:${scene.id}`;
      if (sceneModel && sceneModelKey === key) return sceneModel;

      unsubscribeSceneModel?.();
      sceneModelKey = key;
      sceneModel = createItemModel(scene.state ?? {}, implementation.model);
      unsubscribeSceneModel = sceneModel.subscribe((state, previous) => {
        coordinator.handleEvent({ name: "sceneStateChanged", props: { state, previous } });
        composeAndRenderCurrentScene();
      });
      return sceneModel;
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

function createSceneActions({
  modelActions,
  dispatchExternalAction,
}: {
  modelActions?: Record<string, (...args: any[]) => any>;
  dispatchExternalAction(action: string, props?: Record<string, unknown>): void;
}): Record<string, (...args: any[]) => any> {
  return new Proxy(modelActions ?? {}, {
    get(target, property) {
      if (typeof property !== "string") return undefined;
      const modelAction = target[property];
      if (typeof modelAction === "function") return modelAction;
      return (props?: Record<string, unknown>) => dispatchExternalAction(property, props);
    },
  }) as Record<string, ActionHandler>;
}
