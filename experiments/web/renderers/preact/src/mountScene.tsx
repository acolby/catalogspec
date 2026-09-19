import { render } from "preact";
import { useEffect, useState } from "preact/hooks";
import type { createRuntimeCoordinator } from "../../../src/coordinator";
import type { SceneSnapshot } from "../../../src/shared/types";
import { renderScene } from "./renderScene";
import type { PreactCatalogImplementation } from "./types";

export type MountSceneOptions = {
  root: Element;
  coordinator: Awaited<ReturnType<typeof createRuntimeCoordinator>>;
  resolveImplementation: (scene: SceneSnapshot) => Promise<PreactCatalogImplementation | undefined>;
};

export function mountScene(options: MountSceneOptions): void {
  render(<SceneRoot {...options} />, options.root);
}

function SceneRoot({ coordinator, resolveImplementation }: MountSceneOptions) {
  const [scene, setScene] = useState<SceneSnapshot>(coordinator.getScene());
  const [implementation, setImplementation] = useState<PreactCatalogImplementation>();
  const [isResolving, setIsResolving] = useState(true);

  useEffect(() => coordinator.onSceneChange(setScene), [coordinator]);

  useEffect(() => {
    let isCurrent = true;
    setIsResolving(true);

    resolveImplementation(scene)
      .then((nextImplementation) => {
        if (!isCurrent) return;
        setImplementation(nextImplementation);
      })
      .catch(() => {
        if (!isCurrent) return;
        setImplementation(undefined);
      })
      .finally(() => {
        if (!isCurrent) return;
        setIsResolving(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [resolveImplementation, scene]);

  return (
    <main class="runtime-frame-root">
      <div class="runtime-frame-marker">Runtime iframe · {scene.id}</div>
      {isResolving ? <div class="runtime-error">Resolving implementation for {scene.catalog.id}@{scene.catalog.version}</div> : null}
      {!isResolving && implementation ? renderScene({ scene, implementation, onAction: coordinator.handleAction, onEvent: coordinator.handleEvent }) : null}
      {!isResolving && !implementation ? <div class="runtime-error">No implementation for {scene.catalog.id}@{scene.catalog.version}</div> : null}
    </main>
  );
}
