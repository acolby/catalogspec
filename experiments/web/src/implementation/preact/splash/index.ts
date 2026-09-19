import type { PreactCatalogImplementation } from "../_utils";
import { catalog, themes } from "./generated";
import { Background } from "./items/Background";
import { CallToAction } from "./items/CallToAction";
import { Hero } from "./items/Hero";
import { Stack } from "./items/Stack";

export const preactImplementation: PreactCatalogImplementation = {
  catalog: {
    id: catalog.id,
    version: catalog.version,
  },
  items: {
    Background,
    CallToAction,
    Hero,
    Stack,
  },
  themes,
};
