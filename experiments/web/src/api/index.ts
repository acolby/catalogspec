import { fetchScene, sceneIds } from "./scenes";
import { resolveImplementation } from "./implementations";
import type { ApiClient } from "./types";

export { fetchScene, sceneIds } from "./scenes";
export { resolveImplementation } from "./implementations";
export type { ApiClient } from "./types";

export const api = {
  fetchScene,
  sceneIds,
  resolveImplementation,
} satisfies ApiClient;
