import { render, type ComponentChildren } from "preact";
import { defineAdapter } from "../../catalogComposer";

export type ImplementationView = ComponentChildren;

export const adapter = defineAdapter<ImplementationView>({
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
});

type BoundaryProps = {
  input: Parameters<typeof adapter.boundary>[0];
};

function Boundary({ input }: BoundaryProps) {
  return <>{input.render()}</>;
}
