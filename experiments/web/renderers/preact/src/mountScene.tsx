import { render, type ComponentChild } from "preact";
import { createSceneMounter } from "../../createSceneMounter";
import { renderImplementedItem } from "./renderImplementedItem";
import { renderScene } from "./renderScene";

export const mountScene = createSceneMounter({
  renderView(root: Element, view: ComponentChild) {
    render(view, root);
  },
  renderScene,
  renderImplementedItem,
});

export type MountSceneOptions = Parameters<typeof mountScene>[0];
