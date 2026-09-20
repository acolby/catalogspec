import { render, type ComponentChild } from "preact";
import { createSceneMounter } from "../../createSceneMounter";
import { composeImplementedItemView } from "./composeImplementedItemView";
import { composeSceneView } from "./composeSceneView";

export const mountScene = createSceneMounter({
  renderView(root: Element, view: ComponentChild) {
    render(view, root);
  },
  composeSceneView,
  composeImplementedItemView,
});

export type MountSceneOptions = Parameters<typeof mountScene>[0];
