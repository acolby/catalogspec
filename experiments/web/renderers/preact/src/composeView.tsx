import type { ComponentChildren } from "preact";
import { composeView as composeGeneric, type GenericImplementedCatalog } from "../../composeView";
import type { RendererRuntimeContext } from "../../types";
import type { SceneItemInstance } from "../../../src/shared/types";
import { adapter } from "./adapter";

export type PreactImplementedCatalog = GenericImplementedCatalog<ComponentChildren>;

/**
 * Compatibility wrapper around the renderer-agnostic composer.
 * Prefer createSceneMounter({ adapter }) for new framework integrations.
 */
export function composeView(
  instance: SceneItemInstance,
  implementedCatalog: PreactImplementedCatalog,
  runtime: RendererRuntimeContext,
) {
  return composeGeneric(instance, implementedCatalog, runtime, adapter);
}

export type ComposeView = typeof composeView;
