import { Context_Scene } from "../../generated";

const context = Context_Scene.$context({
  actions(state) {
    return {
      login({ username }) {
        state.loggedIn = true;
        state.username = username;
      },
      logout() {
        state.loggedIn = false;
        state.username = null;
      },
    };
  },
  lifecycle: {},
});

export default context;
