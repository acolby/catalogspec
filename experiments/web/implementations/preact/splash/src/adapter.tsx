import { render, type ComponentChildren } from "preact";
import type { BoundaryInput, ViewAdapter } from "../../../../renderers";

export const viewAdapter: ViewAdapter<ComponentChildren> = {
  boundary(input) {
    return <Boundary key={input.key} input={input} />;
  },

  mount(root, view) {
    render(view, root);
  },
};

function Boundary({ input }: { input: BoundaryInput<ComponentChildren> }) {
  return <>{input.render()}</>;
}
