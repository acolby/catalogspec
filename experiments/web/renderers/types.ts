import type { RuntimeCoordinator } from "../src/coordinator";
import type { CatalogImplementation, SceneItemInstance, SceneSnapshot, ThemeTokens } from "../src/shared/types";

export type ActionHandler = (props?: Record<string, unknown>) => void;

export type EventEmitter = (event: string, props?: Record<string, unknown>) => void;

export type ImplementedItemContext<TTheme = ThemeTokens> = {
  item: {
    id: string;
    name: string;
  };
  emit: EventEmitter;
  scene: {
    theme?: TTheme;
    state: Record<string, unknown>;
    actions: Record<string, ActionHandler>;
  };
};

export type ImplementedItemInput<
  TView,
  TProps extends Record<string, unknown> = Record<string, unknown>,
  TTheme = ThemeTokens,
  TState = Record<string, unknown>,
  TActions extends Record<string, (...args: any[]) => any> = Record<string, ActionHandler>,
> = ImplementedItemContext<TTheme> & {
  props: TProps;
  state: TState;
  actions: TActions;
  slots: Record<string, TView>;
};

export type ImplementedItem<
  TView,
  TProps extends Record<string, unknown> = Record<string, unknown>,
  TTheme = ThemeTokens,
> = (input: ImplementedItemInput<TView, TProps, TTheme>) => TView;

export type ImplementedCatalog<TImplementedItem, TModel = unknown> = CatalogImplementation<TImplementedItem> & {
  model?: TModel;
};

export type RendererRuntimeContext = {
  scene: SceneSnapshot;
  theme?: ThemeTokens;
  action: RuntimeCoordinator["handleAction"];
  emit: RuntimeCoordinator["handleEvent"];
  sceneState: Record<string, unknown>;
  sceneActions: Record<string, (...args: any[]) => any>;
  requestRender(): void;
};

export type ComposeView<TView, TImplementedCatalog> = (
  instance: SceneItemInstance,
  implementedCatalog: TImplementedCatalog,
  runtime: RendererRuntimeContext,
) => TView;
