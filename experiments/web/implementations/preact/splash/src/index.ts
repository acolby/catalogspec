import type { ComponentChildren, ComponentType } from "preact";
import type { ImplementedCatalog, ImplementedItemInput, ModelBackedImplementedItem } from "../../../../renderers";
import { catalog, themes } from "./generated";
import { Background } from "./items/Background";
import { CallToAction } from "./items/CallToAction";
import { Counter } from "./items/Counter";
import { Hero } from "./items/Hero";
import { Stack } from "./items/Stack";

type PreactImplementedItem = ComponentType<ImplementedItemInput<ComponentChildren, any>> | ModelBackedImplementedItem<ComponentChildren, any, any, any, any>;

export const preactImplementation: ImplementedCatalog<PreactImplementedItem> = {
  catalog: {
    id: catalog.id,
    version: catalog.version,
  },
  items: {
    Background,
    CallToAction,
    Counter,
    Hero,
    Stack,
  },
  themes,
};
