import type { RuntimeCoordinator } from "../../src/coordinator";
import type { SceneItemInstance, SceneSnapshot, ThemeTokens } from "../../src/shared/types";
import type { ViewAdapter } from "../adapter";
import type { RuntimeContext } from "../context/types";
import type { LifecycleFrame } from "../implementation/item";

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

export type DefaultSlots<TView> = Record<string, TView | undefined>;

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

export type ComposerRuntimeContext = {
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
  runtime: ComposerRuntimeContext,
  adapter: ViewAdapter<TView>,
) => TView;
