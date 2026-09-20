import { defineItemModel } from "../../../../../../models";

export type CounterState = {
  count: number;
  initialCount: number;
};

export type CounterActions = {
  increment(): void;
  decrement(): void;
  reset(): void;
};

export const model = defineItemModel<CounterState, CounterActions>({
  actions(state) {
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
});
