import type { ComponentChildren } from "preact";

export interface SceneSnapshot {
  version: 1;
  id: string;
  catalog: {
    id: string;
    version: number;
  };
  theme: string;
  state?: Record<string, unknown>;
  root: SceneItemInstance;
}

export interface SceneItemInstance {
  id: string;
  item: string;
  props?: Record<string, unknown>;
  state?: Record<string, unknown>;
  slots?: Record<string, SceneItemInstance[]>;
}

export interface InstanceRuntimeContext {
  scene: SceneSnapshot;
  instance: SceneItemInstance;
  emitEvent(event: string, props?: Record<string, unknown>): void;
  requestAction(action: string, props?: Record<string, unknown>): void;
  renderSlot(slotName: string): ComponentChildren;
}

export type CatalogComponent = (context: InstanceRuntimeContext) => ComponentChildren;

export interface CatalogImplementation {
  catalog: {
    id: string;
    version: number;
  };
  items: Record<string, CatalogComponent>;
}
