import { Item_Stack } from "../../generated";

export const controller = Item_Stack.$controller({
  select({ props, state, context }) {
    return { props, state, context };
  },
  actions() {
    return {};
  },
  lifecycle: {},
});
