import type { SceneSnapshot } from "../shared/types";

export type ApiClient<TImplementation = unknown> = {
  sceneIds: string[];
  fetchScene(sceneId: string | null | undefined): Promise<SceneSnapshot>;
  resolveImplementation(scene: SceneSnapshot): Promise<TImplementation | undefined>;
};
