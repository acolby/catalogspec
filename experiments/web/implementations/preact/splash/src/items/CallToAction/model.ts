import { defineItemModel } from "../../../../../../models";

export type CallToActionState = Record<string, never>;
export type CallToActionActions = Record<string, never>;

export const model = defineItemModel<CallToActionState, CallToActionActions>({
  actions() {
    return {};
  },
});
