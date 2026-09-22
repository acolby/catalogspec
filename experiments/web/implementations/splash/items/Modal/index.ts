import { lifecycle } from "./lifecycle";
import { model } from "./model";
import { defineViewItem } from "../types";
import type { Actions, Props, Slots, State } from "./types";
import { view } from "./view";

export const implemented = defineViewItem<Props, State, Actions, Slots>({
  model,
  lifecycle,
  view,
});
