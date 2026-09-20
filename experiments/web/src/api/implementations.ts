import { preactImplementation } from "../../implementations/preact/splash";
import type { SceneSnapshot } from "../shared/types";

type ResolvedImplementation = typeof preactImplementation;

export async function resolveImplementation(scene: SceneSnapshot): Promise<ResolvedImplementation | undefined> {
  if (scene.catalog.id === preactImplementation.catalog.id && scene.catalog.version === preactImplementation.catalog.version) {
    return preactImplementation;
  }

  return undefined;
}
