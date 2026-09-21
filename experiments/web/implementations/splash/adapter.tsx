import { render, type ComponentChildren } from "preact";
import type { ViewAdapter, ViewAdapterBoundaryInput } from "../../catalogComposer";

export type ImplementationView = ComponentChildren;

export const adapter: ViewAdapter<ImplementationView> = {
  boundary(input) {
    return (
      <Boundary
        key={input.key}
        input={input}
      />
    );
  },

  mount(root, view) {
    render(view, root);
  },
};

function Boundary({ input }: { input: ViewAdapterBoundaryInput<ImplementationView> }) {
  return <>{input.render()}</>;
}
