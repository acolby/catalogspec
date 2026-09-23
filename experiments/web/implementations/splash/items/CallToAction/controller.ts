import { Item_CallToAction } from "../../generated";

export const controller = Item_CallToAction.$controller({
  select({ props, state, context }) {
    return { props, state, context };
  },
  actions() {
    return {};
  },
  lifecycle: {},
});
