import { lifecycle } from "./lifecycle";
import { model } from "./model";
import type { Implementation } from "./types";

export const scene = {
  model,
  lifecycle,
} satisfies Implementation;

export type { Actions, State, Value } from "./types";
