import type { SceneItemInstance } from "../../../shared/types";
import type { PreactCatalogImplementation, RuntimeContext } from "./types";

export function renderPreactInstance(instance: SceneItemInstance, implementation: PreactCatalogImplementation, runtime: RuntimeContext) {
  const Component = implementation.items[instance.item];
  if (!Component) return <MissingPreactItem instance={instance} />;

  const slots: Record<string, any> = {};
  for (const [slotName, children] of Object.entries(instance.slots ?? {})) {
    slots[slotName] = children.map((child) => renderPreactInstance(child, implementation, runtime));
  }

  return <Component key={instance.id} instance={instance} props={instance.props ?? {}} state={instance.state ?? {}} slots={slots} runtime={runtime} />;
}

function MissingPreactItem({ instance }: { instance: SceneItemInstance }) {
  return (
    <div class="runtime-error">
      Missing Preact implementation for <code>{instance.item}</code> <small>({instance.id})</small>
    </div>
  );
}
