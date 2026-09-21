import { render, type ComponentChildren } from "preact";
import type { BoundaryInput, ViewAdapter } from "../../../../renderers";

export type ImplementationView = ComponentChildren;

export const viewAdapter: ViewAdapter<ImplementationView> = {
  boundary(input) {
    return <Boundary key={input.key} input={input} />;
  },

  mount(root, view) {
    render(view, root);
  },
};

function Boundary({ input }: { input: BoundaryInput<ImplementationView> }) {
  return <>{input.render()}</>;
}
