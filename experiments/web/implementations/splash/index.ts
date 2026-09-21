import type { ComposeCatalog } from "../../catalogComposer";
import { adapter, type ImplementationView } from "./adapter";
import { context } from "./contexts";
import { catalog, themes } from "./generated";
import { items } from "./items";

export const implementedCatalog: ComposeCatalog<ImplementationView> = {
  catalog: {
    id: catalog.id,
    version: catalog.version,
  },
  context,
  items,
  themes,
  adapter,
};
