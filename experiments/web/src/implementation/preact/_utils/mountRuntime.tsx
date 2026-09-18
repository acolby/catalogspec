import { render } from "preact";
import { useEffect, useMemo, useState } from "preact/hooks";
import type { RuntimeTransport } from "../../../runtime/RuntimeCoordinator";
import { RuntimeCoordinator } from "../../../runtime/RuntimeCoordinator";
import type { SceneSnapshot } from "../../../shared/types";
import { PreactRenderScene } from "./renderScene";
import type { PreactCatalogImplementation } from "./types";

export type MountPreactRuntimeOptions = {
  root: Element;
  transport: RuntimeTransport;
  implementations: PreactCatalogImplementation[];
  initialScene: SceneSnapshot;
};

export function mountPreactRuntime(options: MountPreactRuntimeOptions): void {
  render(<PreactRuntimeRoot {...options} />, options.root);
}

function PreactRuntimeRoot({ transport, implementations, initialScene }: MountPreactRuntimeOptions) {
  const coordinator = useMemo(() => new RuntimeCoordinator(transport, implementations, initialScene), [transport, implementations, initialScene]);
  const [scene, setScene] = useState<SceneSnapshot>(coordinator.getScene());

  useEffect(() => {
    const unsubscribe = coordinator.onSceneChange(setScene);
    coordinator.start();
    return () => {
      unsubscribe();
      coordinator.stop();
    };
  }, [coordinator]);

  const implementation = coordinator.getImplementation(scene);

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
