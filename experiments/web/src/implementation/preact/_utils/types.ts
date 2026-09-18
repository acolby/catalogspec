import type { ComponentChildren, ComponentType } from "preact";
import type { CatalogImplementation, RuntimeContext, SceneItemInstance } from "../../../shared/types";

export type PreactItemComponentProps<TProps extends Record<string, unknown> = Record<string, unknown>> = {
  instance: SceneItemInstance;
  props: TProps;
  state: Record<string, unknown>;
  slots: Record<string, ComponentChildren>;
  runtime: RuntimeContext;
};

export type PreactItemComponent = ComponentType<PreactItemComponentProps<any>>;

export type PreactCatalogImplementation = CatalogImplementation<PreactItemComponent>;
