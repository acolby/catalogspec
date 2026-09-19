import { render } from "preact";
import { useEffect, useState } from "preact/hooks";
import type { createRuntimeCoordinator } from "../../../coordinator";
import type { SceneSnapshot } from "../../../shared/types";
import { PreactRenderScene } from "./renderScene";
import type { PreactCatalogImplementation } from "./types";

export type MountPreactRuntimeOptions = {
  root: Element;
  coordinator: Awaited<ReturnType<typeof createRuntimeCoordinator>>;
  implementations: PreactCatalogImplementation[];
};

export function mountPreactRuntime(options: MountPreactRuntimeOptions): void {
  render(<PreactRuntimeRoot {...options} />, options.root);
}

function PreactRuntimeRoot({ coordinator, implementations }: MountPreactRuntimeOptions) {
  const [scene, setScene] = useState<SceneSnapshot>(coordinator.getScene());

  useEffect(() => coordinator.onSceneChange(setScene), [coordinator]);

  const implementation = getImplementation(scene, implementations);

  return (
    <main class="runtime-frame-root">
      <div class="runtime-frame-marker">Runtime iframe · {scene.id}</div>
      {implementation ? (
        <PreactRenderScene scene={scene} implementation={implementation} onAction={(action) => coordinator.handleAction(action)} onEvent={(event) => coordinator.handleEvent(event)} />
      ) : (
        <div class="runtime-error">No implementation for {scene.catalog.id}@{scene.catalog.version}</div>
      )}
    </main>
  );
}

function getImplementation(scene: SceneSnapshot, implementations: PreactCatalogImplementation[]): PreactCatalogImplementation | undefined {
  return implementations.find((implementation) => implementation.catalog.id === scene.catalog.id && implementation.catalog.version === scene.catalog.version);
}
