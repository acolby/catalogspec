import type { ApiClient } from "../src/api";
import type { RuntimeCoordinator } from "../src/coordinator";
import type { CatalogImplementation, SceneSnapshot, ThemeTokens } from "../src/shared/types";
import { createItemModel, type ItemModel } from "../models";
import type { ContextImplementation, ContextImplementations, RuntimeContext } from "./context";
import { composeView, type ViewAdaptedImplementedCatalog } from "./composeView";
import type { ActionHandler, RendererRuntimeContext } from "./types";

type ContextBackedImplementation<TItem = unknown> = CatalogImplementation<TItem> & {
  context?: ContextImplementations;
};

type ContextModelRecord = {
  key: string;
  model: ItemModel<any, any>;
  unsubscribe: () => void;
  cleanup?: () => void;
  tickUnsubscribe?: () => void;
};

export type CreateSceneMounterOptions = Record<string, never>;

export type SceneMounterOptions<TImplementation extends ContextBackedImplementation> = {
  root: Element;
  coordinator: RuntimeCoordinator;
  api: ApiClient<TImplementation>;
};

export function createSceneMounter<TImplementation extends ContextBackedImplementation & ViewAdaptedImplementedCatalog<TView>, TView>(
  _options: CreateSceneMounterOptions = {},
) {
  return function mountScene({ root, coordinator, api }: SceneMounterOptions<TImplementation>): () => void {
    let version = 0;
    let currentScene = coordinator.getScene();
    const contextModels = new Map<string, ContextModelRecord>();
    let activeItemIds = new Set<string>();
    const mountedItemCleanups = new Map<string, () => void>();
    const tickCallbacks = new Set<(frame: { now: number; deltaMs: number }) => void>();
    let animationFrame = 0;
    let previousTick = 0;

    function composeAndRenderCurrentScene(): void {
      const scene = currentScene;
      const currentVersion = ++version;

      api.resolveImplementation(scene)
        .then((implementation) => {
          if (currentVersion !== version || !implementation) return;

          if (!matchesSceneCatalog(scene, implementation)) {
            throw new Error(`No matching implementation for ${scene.catalog.id}@${scene.catalog.version}.`);
          }

          const context = createRuntimeContext(scene, implementation);
          const theme = context.theme?.state?.tokens as ThemeTokens | undefined;

          const runtime: RendererRuntimeContext = {
            scene,
            theme,
            action: coordinator.handleAction,
            emit: coordinator.handleEvent,
            context,
            lifecycle: {
              enterItem(id, unmount) {
                activeItemIds.add(id);
                if (unmount && !mountedItemCleanups.has(id)) mountedItemCleanups.set(id, unmount);
              },
              onTick(callback) {
                tickCallbacks.add(callback);
                startTicker();
                return () => {
                  tickCallbacks.delete(callback);
                  stopTickerIfIdle();
                };
              },
            },
            requestRender: composeAndRenderCurrentScene,
          };

          activeItemIds = new Set<string>();
          applySceneRoot(root, theme);
          implementation.viewAdapter.mount(root, composeView(scene.root, implementation, runtime, implementation.viewAdapter));
          unmountInactiveItems();
        })
        .catch((error: unknown) => {
          console.error("Unable to resolve scene implementation.", error);
        });
    }

    function createRuntimeContext(scene: SceneSnapshot, implementation: TImplementation): RuntimeContext {
      const context: RuntimeContext = {};
      const implementations: ContextImplementations = implementation.context ?? {};

      for (const [name, contextImplementation] of Object.entries(implementations)) {
        const model = getContextModel(name, scene, implementation, contextImplementation);
        context[name] = {
          state: model.state(),
          actions: createContextActions({
            modelActions: model.actions(),
            dispatchExternalAction: (action, props) => coordinator.handleAction({ name: action, props }),
          }),
        };
      }

      return context;
    }

    function getContextModel(
      name: string,
      scene: SceneSnapshot,
      implementation: TImplementation,
      contextImplementation: ContextImplementation<any, any>,
    ): ItemModel<any, any> {
      const key = `${scene.catalog.id}@${scene.catalog.version}:${scene.id}:${name}`;
      const existing = contextModels.get(name);
      if (existing?.key === key) return existing.model;

      existing?.tickUnsubscribe?.();
      existing?.cleanup?.();
      existing?.unsubscribe();

      const model = createItemModel(initialContextState(name, scene, implementation), contextImplementation.model);
      const unsubscribe = model.subscribe((state, previous) => {
        coordinator.handleEvent({ name: `${name}ContextChanged`, props: { state, previous } });
        composeAndRenderCurrentScene();
      });
      const lifecycleInput = () => ({ state: model.state(), actions: model.actions() });
      const cleanup = contextImplementation.lifecycle.mount?.(lifecycleInput());
      const tickUnsubscribe = contextImplementation.lifecycle.tick
        ? registerTick((frame) => contextImplementation.lifecycle.tick?.(lifecycleInput(), frame))
        : undefined;

      const record: ContextModelRecord = {
        key,
        model,
        unsubscribe,
        cleanup: typeof cleanup === "function" ? cleanup : undefined,
        tickUnsubscribe,
      };
      contextModels.set(name, record);
      return model;
    }

    function initialContextState(name: string, scene: SceneSnapshot, implementation: TImplementation): Record<string, unknown> {
      if (name === "scene") {
        return scene.context?.scene?.state ?? {};
      }
      if (name === "theme") {
        const fallbackThemeName = "light";
        const contextThemeName = scene.context?.theme?.state?.name;
        const themeName = typeof contextThemeName === "string" ? contextThemeName : fallbackThemeName;
        const tokens = implementation.themes?.[themeName] ?? implementation.themes?.[fallbackThemeName] ?? implementation.themes?.light;
        return {
          name: themeName,
          tokens,
          available: Object.keys(implementation.themes ?? {}),
        };
      }
      return scene.context?.[name]?.state ?? {};
      return {};
    }

    function registerTick(callback: (frame: { now: number; deltaMs: number }) => void): () => void {
      tickCallbacks.add(callback);
      startTicker();
      return () => {
        tickCallbacks.delete(callback);
        stopTickerIfIdle();
      };
    }

    function startTicker(): void {
      if (animationFrame || tickCallbacks.size === 0) return;
      previousTick = performance.now();
      const tick = (now: number) => {
        animationFrame = 0;
        const frame = { now, deltaMs: Math.min(now - previousTick, 100) };
        previousTick = now;
        for (const callback of [...tickCallbacks]) callback(frame);
        if (tickCallbacks.size > 0) animationFrame = requestAnimationFrame(tick);
      };
      animationFrame = requestAnimationFrame(tick);
    }

    function stopTickerIfIdle(): void {
      if (tickCallbacks.size > 0 || !animationFrame) return;
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    }

    function unmountInactiveItems(): void {
      for (const [id, cleanup] of [...mountedItemCleanups]) {
        if (activeItemIds.has(id)) continue;
        cleanup();
        mountedItemCleanups.delete(id);
      }
      stopTickerIfIdle();
    }

    const unsubscribeSceneChange = coordinator.onSceneChange((scene) => {
      currentScene = scene;
      composeAndRenderCurrentScene();
    });

    return () => {
      unsubscribeSceneChange();
      for (const record of contextModels.values()) {
        record.tickUnsubscribe?.();
        record.cleanup?.();
        record.unsubscribe();
      }
      contextModels.clear();
      for (const cleanup of mountedItemCleanups.values()) cleanup();
      mountedItemCleanups.clear();
      tickCallbacks.clear();
      stopTickerIfIdle();
    };
  };
}

function matchesSceneCatalog(scene: SceneSnapshot, implementation: CatalogImplementation): boolean {
  return scene.catalog.id === implementation.catalog.id && scene.catalog.version === implementation.catalog.version;
}

function applySceneRoot(root: Element, theme?: ThemeTokens): void {
  root.classList.add("scene-root");
  if (!(root instanceof HTMLElement)) return;

  root.style.fontFamily = theme?.font?.body ?? "";
  root.style.color = theme?.color?.text ?? "";
  root.style.background = theme?.color?.background ?? "";
}

function createContextActions({
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
