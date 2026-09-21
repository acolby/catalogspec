import { scene } from "./scene";
import type { Value as SceneValue } from "./scene";
import { theme } from "./theme";
import type { Value as ThemeValue } from "./theme";

export type Context = {
  scene: SceneValue;
  theme: ThemeValue;
};

export const context = {
  scene,
  theme,
};
