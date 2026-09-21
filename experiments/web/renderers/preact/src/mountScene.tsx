import type { ComponentChildren } from "preact";
import { createSceneMounter } from "../../createSceneMounter";
import type { GenericImplementedCatalog } from "../../composeView";
import { adapter } from "./adapter";

export const mountScene = createSceneMounter<GenericImplementedCatalog<ComponentChildren>, ComponentChildren>({
  adapter,
});

export type MountSceneOptions = Parameters<typeof mountScene>[0];
