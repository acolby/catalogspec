import { lifecycle } from "./lifecycle";
import { model } from "./model";
import { defineSplashItem } from "../types";
import type { Actions, Props, Slots, State } from "./types";
import { view } from "./view";

export const implemented = defineSplashItem<Props, State, Actions, Slots>({
  model,
  lifecycle,
  view,
});
