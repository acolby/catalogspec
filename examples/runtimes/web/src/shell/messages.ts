import type { SceneSnapshot } from "../scene";

export type RuntimeInboundMessage =
  | {
      type: "catalogspec.scene.replace";
      scene: SceneSnapshot;
    };

export type RuntimeOutboundMessage =
  | {
      type: "catalogspec.runtime.ready";
    }
  | {
      type: "catalogspec.scene.rendered";
      sceneId: string;
    }
  | {
      type: "catalogspec.scene.event";
      sceneId: string;
      instanceId: string;
      event: string;
      props?: Record<string, unknown>;
    }
  | {
      type: "catalogspec.action.request";
      sceneId: string;
      instanceId: string;
      action: string;
      props?: Record<string, unknown>;
    }
  | {
      type: "catalogspec.runtime.error";
      message: string;
      details?: unknown;
    };

export interface HostAdapter {
  send(message: RuntimeOutboundMessage): void;
  subscribe(handler: (message: RuntimeInboundMessage) => void): () => void;
}
