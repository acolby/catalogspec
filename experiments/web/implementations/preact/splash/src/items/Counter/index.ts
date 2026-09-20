import { model } from "./model";
import type { Item } from "./types";
import { view } from "./view";

export const Counter = {
  model,
  view,
} satisfies Item;
