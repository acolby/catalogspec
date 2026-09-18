import type { SceneSnapshot } from "./types";

export type RuntimeInboundMessage =
  | {
      type: "catalogspec.scene.replace";
      scene: SceneSnapshot;
    };

export type RuntimeOutboundMessage =
  | { type: "catalogspec.runtime.ready" }
  | { type: "catalogspec.scene.rendered"; sceneId: string }
  | { type: "catalogspec.scene.event"; sceneId: string; instanceId: string; event: string; props?: Record<string, unknown> }
  | { type: "catalogspec.action.request"; sceneId: string; instanceId: string; action: string; props?: Record<string, unknown> }
  | { type: "catalogspec.runtime.error"; message: string; details?: unknown };

export function isRuntimeOutboundMessage(value: unknown): value is RuntimeOutboundMessage {
  return !!value && typeof value === "object" && typeof (value as { type?: unknown }).type === "string";
}

export function isRuntimeInboundMessage(value: unknown): value is RuntimeInboundMessage {
  if (!value || typeof value !== "object") return false;
  const candidate = value as { type?: unknown; scene?: unknown };
  return candidate.type === "catalogspec.scene.replace" && !!candidate.scene;
}
