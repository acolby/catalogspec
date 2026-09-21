import type { ComponentChildren } from "preact";
import { lifecycle } from "./lifecycle";
import { model } from "./model";
import type { Item } from "./types";
import { view } from "./view";

export const implemented = {
  model,
  lifecycle,
  view,
} satisfies Item<ComponentChildren>;
