import { preactImplementation } from "../../implementations/preact/splash";
import type { PreactCatalogImplementation } from "../../renderers/preact";
import type { SceneSnapshot } from "../shared/types";

export async function resolveImplementation(scene: SceneSnapshot): Promise<PreactCatalogImplementation | undefined> {
  if (scene.catalog.id === preactImplementation.catalog.id && scene.catalog.version === preactImplementation.catalog.version) {
    return preactImplementation;
  }

  return undefined;
}
