import { render, type ComponentChild } from "preact";
import { createSceneMounter } from "../../../src/coordinator/createSceneMounter";
import { renderItem } from "./renderItem";
import { renderScene } from "./renderScene";

export const mountScene = createSceneMounter({
  renderView(root: Element, view: ComponentChild) {
    render(view, root);
  },
  renderScene,
  renderItem,
});

export type MountSceneOptions = Parameters<typeof mountScene>[0];
