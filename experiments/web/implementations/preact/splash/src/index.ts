import type { ComponentChildren, ComponentType } from "preact";
import type { ImplementedCatalog, ImplementedItemInput, ModelBackedImplementedItem } from "../../../../renderers";
import { catalog, themes } from "./generated";
import { AuthButton } from "./items/AuthButton";
import { Background } from "./items/Background";
import { BetaSignupForm } from "./items/BetaSignupForm";
import { CallToAction } from "./items/CallToAction";
import { Counter } from "./items/Counter";
import { Hero } from "./items/Hero";
import { Modal } from "./items/Modal";
import { Stack } from "./items/Stack";
import { model } from "./model";

type PreactImplementedItem = ComponentType<ImplementedItemInput<ComponentChildren, any>> | ModelBackedImplementedItem<ComponentChildren, any, any, any, any>;

export const preactImplementation: ImplementedCatalog<PreactImplementedItem> = {
  catalog: {
    id: catalog.id,
    version: catalog.version,
  },
  model,
  items: {
    AuthButton,
    Background,
    BetaSignupForm,
    CallToAction,
    Counter,
    Hero,
    Modal,
    Stack,
  },
  themes,
};
