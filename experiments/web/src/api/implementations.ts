import { implementedCatalog } from "../../implementations/preact/splash";
import type { SceneSnapshot } from "../shared/types";

type ResolvedImplementation = typeof implementedCatalog;

export async function resolveImplementation(scene: SceneSnapshot): Promise<ResolvedImplementation | undefined> {
  if (scene.catalog.id === implementedCatalog.catalog.id && scene.catalog.version === implementedCatalog.catalog.version) {
    return implementedCatalog;
  }

  return undefined;
}
