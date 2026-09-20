import { api } from "../api";
import { mountScene as mountPreactScene } from "../../renderers/preact";
import { createRuntimeCoordinator } from "./runtime";

export type MountSceneOptions = {
  root: Element;
  sceneId: string | null;
};

export async function mountScene({ root, sceneId }: MountSceneOptions): Promise<void> {
  const coordinator = await createRuntimeCoordinator({ sceneId });

  mountPreactScene({
    root,
    coordinator,
    api,
  });
}
