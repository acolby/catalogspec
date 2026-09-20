import { defineItemModel } from "../../../../../../models";

export type HeroState = Record<string, never>;
export type HeroActions = Record<string, never>;

export const model = defineItemModel<HeroState, HeroActions>({
  actions() {
    return {};
  },
});
