import { defineCatalog } from "../../catalogComposer/contracts/preact";
import { adapter } from "./adapter";
import { context } from "./contexts";
import { catalog, themes } from "./generated";
import { items } from "./items";

export const implementedCatalog = defineCatalog({
  catalog: {
    id: catalog.id,
    version: catalog.version,
  },
  context,
  items,
  themes,
  adapter,
});
