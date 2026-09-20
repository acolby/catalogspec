import { model } from "./model";
import type { Item } from "./types";
import { view } from "./view";

export const Hero = {
  model,
  view,
} satisfies Item;
