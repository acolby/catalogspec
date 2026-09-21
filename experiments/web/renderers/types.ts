import type { RuntimeCoordinator } from "../src/coordinator";
import type { CatalogImplementation, SceneItemInstance, SceneSnapshot, ThemeTokens } from "../src/shared/types";
import type { ContextImplementations, RuntimeContext } from "./context";
import type { LifecycleFrame } from "./implementedItem";

export type ActionHandler = (props?: Record<string, unknown>) => void;

export type EventEmitter = (event: string, props?: Record<string, unknown>) => void;

export type ImplementedItemContext<TContext = RuntimeContext> = {
  item: {
    id: string;
    name: string;
  };
  emit: EventEmitter;
  context: TContext;
};

export type DefaultSlots<TView> = Record<string, TView[]>;

export type ImplementedItemInput<
  TView,
  TProps extends Record<string, unknown> = Record<string, unknown>,
  TState = Record<string, unknown>,
  TActions extends Record<string, (...args: any[]) => any> = Record<string, ActionHandler>,
  TSlots = DefaultSlots<TView>,
  TContext = RuntimeContext,
> = ImplementedItemContext<TContext> & {
  props: TProps;
  state: TState;
  actions: TActions;
  slots: TSlots;
};

export type ImplementedItem<
  TView,
  TProps extends Record<string, unknown> = Record<string, unknown>,
  TSlots = DefaultSlots<TView>,
  TContext = RuntimeContext,
> = (input: ImplementedItemInput<TView, TProps, Record<string, unknown>, Record<string, ActionHandler>, TSlots, TContext>) => TView;

export type ImplementedCatalog<TImplementedItem, TContext extends ContextImplementations = ContextImplementations> = CatalogImplementation<TImplementedItem> & {
  context?: TContext;
};

export type RendererRuntimeContext = {
  scene: SceneSnapshot;
  theme?: ThemeTokens;
  action: RuntimeCoordinator["handleAction"];
  emit: RuntimeCoordinator["handleEvent"];
  context: RuntimeContext;
  lifecycle: {
    enterItem(id: string, unmount?: () => void): void;
    onTick(callback: (frame: LifecycleFrame) => void): () => void;
  };
  requestRender(): void;
};

export type ComposeView<TView, TImplementedCatalog> = (
  instance: SceneItemInstance,
  implementedCatalog: TImplementedCatalog,
  runtime: RendererRuntimeContext,
) => TView;
