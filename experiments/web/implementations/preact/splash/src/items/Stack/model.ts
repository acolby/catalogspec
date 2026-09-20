import { defineItemModel } from "../../../../../../models";

export type StackState = Record<string, never>;
export type StackActions = Record<string, never>;

export const model = defineItemModel<StackState, StackActions>({
  actions() {
    return {};
  },
});
