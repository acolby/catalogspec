import { render, type ComponentChildren } from "preact";
import type { BoundaryInput, ViewAdapter } from "../../types";

export const adapter: ViewAdapter<ComponentChildren> = {
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
