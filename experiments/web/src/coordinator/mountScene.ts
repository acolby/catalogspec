import { api } from "../api";
import { createSceneMounter, type ViewAdapter } from "../../renderers";
import { createRuntimeCoordinator } from "./runtime";

export type MountSceneOptions = {
  root: Element;
  sceneId: string | null;
};

type RuntimeImplementation = NonNullable<Awaited<ReturnType<typeof api.resolveImplementation>>>;
type RuntimeView = RuntimeImplementation extends { viewAdapter: ViewAdapter<infer TView> } ? TView : never;

const mountResolvedScene = createSceneMounter<RuntimeImplementation, RuntimeView>();

export async function mountScene({ root, sceneId }: MountSceneOptions): Promise<void> {
  const coordinator = await createRuntimeCoordinator({ sceneId });

  mountResolvedScene({
    root,
    coordinator,
    api,
  });
}
