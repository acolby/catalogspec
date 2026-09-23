import { Item_Counter } from "../../generated";

export const controller = Item_Counter.$controller({
  select({ props, state, context }) {
    return { props, state, context };
  },
  actions({ state }) {
    return {
      increment() {
        state.count += 1;
      },
      decrement() {
        state.count -= 1;
      },
      reset() {
        state.count = state.initialCount;
      },
    };
  },
  lifecycle: {},
});
