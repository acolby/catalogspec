import { defineItemController as defineBaseItemController } from "../../../catalogComposer";
import { defineItem as definePreactItem, type ItemSlot } from "../../../catalogComposer/contracts/preact";
import type { Context } from "../contexts";

export type { ItemSlot };

export const defineItemController = defineBaseItemController<Context>();
export const defineItem = definePreactItem<Context>();
