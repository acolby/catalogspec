import { defineItemModel } from "../../../../../../models";

export type BackgroundState = Record<string, never>;
export type BackgroundActions = Record<string, never>;

export const model = defineItemModel<BackgroundState, BackgroundActions>({
  actions() {
    return {};
  },
});
