import type { CatalogImplementation } from "../../src/shared/types";
import type { ViewAdapter } from "./adapter";
import type { ContextImplementations } from "./context";
import type { ModelBackedImplementedItem } from "./item";

export type ImplementedCatalog<TImplementedItem, TContext extends ContextImplementations = ContextImplementations> = CatalogImplementation<TImplementedItem> & {
  context?: TContext;
};

export type GenericImplementedItem<TView> = ModelBackedImplementedItem<TView, any, any, any, any, any, any>;

export type GenericImplementedCatalog<TView> = ImplementedCatalog<GenericImplementedItem<TView>, any>;

export type ViewAdaptedImplementedCatalog<TView> = GenericImplementedCatalog<TView> & {
  adapter: ViewAdapter<TView>;
};
