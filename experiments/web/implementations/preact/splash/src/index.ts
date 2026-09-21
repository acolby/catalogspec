import type { ComponentChildren } from "preact";
import type { ImplementedCatalog, ModelBackedImplementedItem } from "../../../../renderers";
import { context } from "./contexts";
import { catalog, themes } from "./generated";
import { implemented as AuthButton } from "./items/AuthButton";
import { implemented as Background } from "./items/Background";
import { implemented as BetaSignupForm } from "./items/BetaSignupForm";
import { implemented as CallToAction } from "./items/CallToAction";
import { implemented as Counter } from "./items/Counter";
import { implemented as Hero } from "./items/Hero";
import { implemented as Modal } from "./items/Modal";
import { implemented as Stack } from "./items/Stack";
import { implemented as ThemePicker } from "./items/ThemePicker";

type PreactImplementedItem = ModelBackedImplementedItem<ComponentChildren, any, any, any, any, any>;

export const preactImplementation: ImplementedCatalog<PreactImplementedItem> = {
  catalog: {
    id: catalog.id,
    version: catalog.version,
  },
  context,
  items: {
    AuthButton,
    Background,
    BetaSignupForm,
    CallToAction,
    Counter,
    Hero,
    Modal,
    Stack,
    ThemePicker,
  },
  themes,
};
