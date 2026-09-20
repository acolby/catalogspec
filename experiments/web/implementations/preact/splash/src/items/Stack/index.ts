import { lifecycle } from "./lifecycle";
import { model } from "./model";
import type { Item } from "./types";
import { view } from "./view";

export const Stack = {
  model,
  lifecycle,
  view,
} satisfies Item;
