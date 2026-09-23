import { Item_Hero } from "../../generated";

export const controller = Item_Hero.$controller({
  select({ props, state, context }) {
    return { props, state, context };
  },
  actions() {
    return {};
  },
  lifecycle: {},
});
