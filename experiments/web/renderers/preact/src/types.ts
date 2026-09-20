import type { ComponentChildren, ComponentType } from "preact";
import type { RuntimeCoordinator } from "../../../src/coordinator";
import type { CatalogImplementation, SceneItemInstance, SceneSnapshot, ThemeTokens } from "../../../src/shared/types";

export type RuntimeContext = {
  scene: SceneSnapshot;
  theme?: ThemeTokens;
  action: RuntimeCoordinator["handleAction"];
  emit: RuntimeCoordinator["handleEvent"];
};

export type PreactItemComponentProps<TProps extends Record<string, unknown> = Record<string, unknown>> = {
  instance: SceneItemInstance;
  props: TProps;
  state: Record<string, unknown>;
  slots: Record<string, ComponentChildren>;
  runtime: RuntimeContext;
};

export type PreactItemComponent = ComponentType<PreactItemComponentProps<any>>;

export type PreactCatalogImplementation = CatalogImplementation<PreactItemComponent>;
