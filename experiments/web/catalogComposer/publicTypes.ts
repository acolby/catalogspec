import type { ViewAdaptedImplementedCatalog, GenericImplementedCatalog, ViewComposer } from "./composeView";
import type {
  ContextImplementation,
  ContextImplementations,
  ContextLifecycle,
  ContextLifecycleInput,
  RuntimeContext,
  RuntimeContextValue,
} from "./context";
import type {
  ImplementedItemLifecycle,
  ImplementedItemLifecycleInput,
  ImplementedItemView,
  LifecycleFrame,
  ModelBackedImplementedItem,
} from "./implementedItem";
import type { CreateItemActions, ItemModel, ItemModelDefinition, ReadonlyDeep } from "./model";
import type {
  ActionHandler,
  ComposerRuntimeContext,
  DefaultSlots,
  EventEmitter,
  ImplementedCatalog,
  ImplementedItemContext,
  ImplementedItemInput,
  ViewAdapter,
  ViewAdapterBoundaryInput,
} from "./types";

export type ComposeCatalog<TView> = ViewAdaptedImplementedCatalog<TView>;
export type ComposeCatalogBase<TView> = GenericImplementedCatalog<TView>;
export type CatalogComposer<TView> = ViewComposer<TView>;
export type CatalogImplementation<TItem, TContext extends ComposeContexts = ComposeContexts> = ImplementedCatalog<TItem, TContext>;

export type ComposeItem<
  TView,
  TProps extends Record<string, unknown>,
  TState extends object,
  TActions extends Record<string, (...args: any[]) => any>,
  TSlots = DefaultSlots<TView>,
  TContext = ComposeContextRecord,
> = ModelBackedImplementedItem<TView, TProps, TState, TActions, TSlots, TContext>;

export type ComposeItemView<
  TView,
  TProps extends Record<string, unknown>,
  TState extends object,
  TActions extends Record<string, (...args: any[]) => any>,
  TSlots = DefaultSlots<TView>,
  TContext = ComposeContextRecord,
> = ImplementedItemView<TView, TProps, TState, TActions, TSlots, TContext>;

export type ComposeItemLifecycle<
  TProps extends Record<string, unknown>,
  TState extends object,
  TActions extends Record<string, (...args: any[]) => any>,
  TContext = ComposeContextRecord,
> = ImplementedItemLifecycle<TProps, TState, TActions, TContext>;

export type ComposeItemLifecycleInput<
  TProps extends Record<string, unknown>,
  TState extends object,
  TActions extends Record<string, (...args: any[]) => any>,
  TContext = ComposeContextRecord,
> = ImplementedItemLifecycleInput<TProps, TState, TActions, TContext>;

export type ComposeItemInput<
  TView,
  TProps extends Record<string, unknown> = Record<string, unknown>,
  TState = Record<string, unknown>,
  TActions extends Record<string, (...args: any[]) => any> = Record<string, ActionHandler>,
  TSlots = DefaultSlots<TView>,
  TContext = ComposeContextRecord,
> = ImplementedItemInput<TView, TProps, TState, TActions, TSlots, TContext>;

export type ComposeItemContext<TContext = ComposeContextRecord> = ImplementedItemContext<TContext>;

export type ComposeContext<
  TState extends object,
  TActions extends Record<string, (...args: any[]) => any>,
> = ContextImplementation<TState, TActions>;

export type ComposeContexts = ContextImplementations;
export type ComposeContextLifecycle<
  TState extends object,
  TActions extends Record<string, (...args: any[]) => any>,
> = ContextLifecycle<TState, TActions>;
export type ComposeContextLifecycleInput<
  TState extends object,
  TActions extends Record<string, (...args: any[]) => any>,
> = ContextLifecycleInput<TState, TActions>;
export type ComposeContextRecord = RuntimeContext;
export type ComposeContextValue<
  TState = Record<string, unknown>,
  TActions extends Record<string, (...args: any[]) => any> = Record<string, (...args: any[]) => any>,
> = RuntimeContextValue<TState, TActions>;

export type Model<TState extends object, TActions extends Record<string, (...args: any[]) => any>> = ItemModel<TState, TActions>;
export type ModelDefinition<TState extends object, TActions extends Record<string, (...args: any[]) => any>> = ItemModelDefinition<TState, TActions>;
export type CreateModelActions<TState extends object, TActions extends Record<string, (...args: any[]) => any>> = CreateItemActions<TState, TActions>;
export type { ReadonlyDeep };

export type {
  ActionHandler,
  ComposerRuntimeContext,
  DefaultSlots,
  EventEmitter,
  LifecycleFrame,
  ViewAdapter,
  ViewAdapterBoundaryInput,
};
