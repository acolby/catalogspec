import { render, type ComponentChild } from "preact";
import { createSceneMounter } from "../../createSceneMounter";
import { composeView, type PreactImplementedCatalog } from "./composeView";

export const mountScene = createSceneMounter<PreactImplementedCatalog, ComponentChild>({
  composeView,
  renderView(root: Element, view: ComponentChild) {
    render(view, root);
  },
});

export type MountSceneOptions = Parameters<typeof mountScene>[0];
