import { Item_Modal } from "../../generated";

export const controller = Item_Modal.$controller({
  select({ props, state, context }) {
    return { props, state, context };
  },
  actions({ state }) {
    return {
      open() {
        state.open = true;
      },
      close() {
        state.open = false;
      },
    };
  },
  lifecycle: {},
});
