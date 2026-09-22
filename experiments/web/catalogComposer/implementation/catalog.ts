import type { CatalogImplementation } from "../../src/shared/types";
import type { ContextImplementations } from "../context/types";

export type ImplementedCatalog<TImplementedItem, TContext extends ContextImplementations = ContextImplementations> = CatalogImplementation<TImplementedItem> & {
  context?: TContext;
};
