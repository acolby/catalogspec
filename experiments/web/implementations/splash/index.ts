import type { ViewAdaptedImplementedCatalog } from "../../renderers";
import { adapter, type ImplementationView } from "./adapter";
import { context } from "./contexts";
import { catalog, themes } from "./generated";
import { items } from "./items";

export const implementedCatalog: ViewAdaptedImplementedCatalog<ImplementationView> = {
  catalog: {
    id: catalog.id,
    version: catalog.version,
  },
  context,
  items,
  themes,
  adapter,
};
