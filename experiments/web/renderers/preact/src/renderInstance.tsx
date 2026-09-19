import type { SceneItemInstance } from "../../../src/shared/types";
import type { PreactCatalogImplementation, RuntimeContext } from "./types";

export function renderInstance(instance: SceneItemInstance, implementation: PreactCatalogImplementation, runtime: RuntimeContext) {
  const Component = implementation.items[instance.item];
  if (!Component) return <MissingItem instance={instance} />;

  const slots: Record<string, any> = {};
  for (const [slotName, children] of Object.entries(instance.slots ?? {})) {
    slots[slotName] = children.map((child) => renderInstance(child, implementation, runtime));
  }

  return <Component key={instance.id} instance={instance} props={instance.props ?? {}} state={instance.state ?? {}} slots={slots} runtime={runtime} />;
}

function MissingItem({ instance }: { instance: SceneItemInstance }) {
  return (
    <div class="runtime-error">
      Missing implementation for <code>{instance.item}</code> <small>({instance.id})</small>
    </div>
  );
}
