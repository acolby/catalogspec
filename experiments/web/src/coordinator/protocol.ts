import type { SceneItemInstance } from "../shared/types";

export type RuntimeAction = {
  name: string;
  props?: Record<string, unknown>;
  source?: SceneItemInstance;
};

export type RuntimeEvent = {
  name: string;
  props?: Record<string, unknown>;
  source?: SceneItemInstance;
};

export type HostToRuntimeMessage =
  | {
      type: "catalogspec.scene.load";
      sceneId: string;
    };

export type RuntimeToHostMessage =
  | { type: "catalogspec.runtime.ready" }
  | { type: "catalogspec.scene.rendered"; sceneId: string }
  | { type: "catalogspec.scene.event"; sceneId: string; instanceId: string; event: string; props?: Record<string, unknown> }
  | { type: "catalogspec.action.request"; sceneId: string; instanceId: string; action: string; props?: Record<string, unknown> }
  | { type: "catalogspec.runtime.error"; message: string; details?: unknown };

export function isHostToRuntimeMessage(value: unknown): value is HostToRuntimeMessage {
  if (!value || typeof value !== "object") return false;
  const candidate = value as { type?: unknown; sceneId?: unknown };
  return candidate.type === "catalogspec.scene.load" && typeof candidate.sceneId === "string";
}

export function isRuntimeToHostMessage(value: unknown): value is RuntimeToHostMessage {
  return !!value && typeof value === "object" && typeof (value as { type?: unknown }).type === "string";
}
