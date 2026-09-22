import { api } from "../api";
import { createSceneRuntime, type ViewAdapter } from "../../catalogComposer";
import { createRuntimeCoordinator } from "./runtime";

export type MountSceneOptions = {
  root: Element;
  sceneId: string | null;
};

type RuntimeImplementation = NonNullable<Awaited<ReturnType<typeof api.resolveImplementation>>>;
type RuntimeView = RuntimeImplementation extends { adapter: ViewAdapter<infer TView> } ? TView : never;

export async function mountScene({ root, sceneId }: MountSceneOptions): Promise<void> {
  const coordinator = await createRuntimeCoordinator({ sceneId });
  const runtime = createSceneRuntime<RuntimeImplementation, RuntimeView>({
    root,
    coordinator,
    api,
  });

  runtime.start();
}
