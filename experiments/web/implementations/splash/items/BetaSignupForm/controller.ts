import { Item_BetaSignupForm } from "../../generated";

export const controller = Item_BetaSignupForm.$controller({
  select({ props, state, context }) {
    return { props, state, context };
  },
  actions(state) {
    return {
      updateEmail({ email }) {
        state.email = email;
        state.submitted = false;
      },
      submit() {
        state.submitted = true;
      },
    };
  },
  lifecycle: {},
});
