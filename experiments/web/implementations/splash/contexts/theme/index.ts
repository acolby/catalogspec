import { Context_Theme, themes } from "../../generated";

const context = Context_Theme.$context({
  actions(state) {
    return {
      setTheme({ name }) {
        state.name = name;
        state.tokens = themes[name];
      },
    };
  },
  lifecycle: {},
});

export default context;
