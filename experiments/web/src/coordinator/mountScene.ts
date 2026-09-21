import { api } from "../api";
import { createCatalogMounter, type ViewAdapter } from "../../catalogComposer";
import { createRuntimeCoordinator } from "./runtime";

export type MountSceneOptions = {
  root: Element;
  sceneId: string | null;
};

type RuntimeImplementation = NonNullable<Awaited<ReturnType<typeof api.resolveImplementation>>>;
type RuntimeView = RuntimeImplementation extends { adapter: ViewAdapter<infer TView> } ? TView : never;

const mountResolvedScene = createCatalogMounter<RuntimeImplementation, RuntimeView>();

export async function mountScene({ root, sceneId }: MountSceneOptions): Promise<void> {
  const coordinator = await createRuntimeCoordinator({ sceneId });

  mountResolvedScene({
    root,
    coordinator,
    api,
  });
}
