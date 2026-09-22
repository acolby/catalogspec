import { defineContext } from "../../../../catalogComposer";
import { lifecycle } from "./lifecycle";
import { model } from "./model";
import type { Actions, State } from "./types";

export const theme = defineContext<State, Actions>({
  model,
  lifecycle,
});

export type { Actions, State, Value } from "./types";
