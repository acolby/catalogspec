import { render, type ComponentChildren } from "preact";
import { defineAdapter } from "../../catalogComposer";


export const adapter = defineAdapter<ComponentChildren>({
  boundary({ key, render }) {
    return <SlotBoundary key={key} render={render} />;
  },

  mount(root, view) {
    render(view, root);
  },
});

function SlotBoundary({ render }: { render(): ComponentChildren | readonly ComponentChildren[] | undefined }) {
  return <>{render()}</>;
}
