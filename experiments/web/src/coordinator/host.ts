import { api } from "../api";
import type { HostToRuntimeMessage, RuntimeToHostMessage } from "./protocol";
import { IframeHostTransport } from "./transports/iframeHostTransport";

export type HostTransport = {
  send(message: HostToRuntimeMessage): void;
  subscribe(handler: (message: RuntimeToHostMessage) => void): () => void;
};

export type ActionRequest = {
  sceneId: string;
  instanceId: string;
  action: string;
  props?: Record<string, unknown>;
};

export type SceneEvent = {
  sceneId: string;
  instanceId: string;
  event: string;
  props?: Record<string, unknown>;
};

export type HostCoordinator = {
  getSceneIds(): string[];
  loadScene(sceneId: string): void;
  onReady(listener: () => void): () => void;
  onRendered(listener: (sceneId: string) => void): () => void;
  onActionRequest(listener: (request: ActionRequest) => void): () => void;
  onSceneEvent(listener: (event: SceneEvent) => void): () => void;
  onMessage(listener: (message: RuntimeToHostMessage) => void): () => void;
};

type CreateHostCoordinatorOptions = {
  targetWindow: () => Window | null | undefined;
  transport?: HostTransport;
  targetOrigin?: string;
  allowedOrigins?: string[];
};

export function createHostCoordinator(options: CreateHostCoordinatorOptions): HostCoordinator {
  const transport = options.transport ?? new IframeHostTransport({
    targetWindow: options.targetWindow,
    targetOrigin: options.targetOrigin ?? window.location.origin,
    allowedOrigins: options.allowedOrigins ?? [window.location.origin],
  });
  const readyListeners = new Set<() => void>();
  const renderedListeners = new Set<(sceneId: string) => void>();
  const actionListeners = new Set<(request: ActionRequest) => void>();
  const eventListeners = new Set<(event: SceneEvent) => void>();
  const messageListeners = new Set<(message: RuntimeToHostMessage) => void>();

  transport.subscribe((message) => {
    for (const listener of messageListeners) listener(message);

    if (message.type === "catalogspec.runtime.ready") {
      for (const listener of readyListeners) listener();
    }

    if (message.type === "catalogspec.scene.rendered") {
      for (const listener of renderedListeners) listener(message.sceneId);
    }

    if (message.type === "catalogspec.action.request") {
      const request = { sceneId: message.sceneId, instanceId: message.instanceId, action: message.action, props: message.props };
      for (const listener of actionListeners) listener(request);
    }

    if (message.type === "catalogspec.scene.event") {
      const event = { sceneId: message.sceneId, instanceId: message.instanceId, event: message.event, props: message.props };
      for (const listener of eventListeners) listener(event);
    }
  });

  return {
    getSceneIds() {
      return api.sceneIds;
    },

    loadScene(sceneId) {
      transport.send({ type: "catalogspec.scene.load", sceneId });
    },

    onReady(listener) {
      readyListeners.add(listener);
      return () => readyListeners.delete(listener);
    },

    onRendered(listener) {
      renderedListeners.add(listener);
      return () => renderedListeners.delete(listener);
    },

    onActionRequest(listener) {
      actionListeners.add(listener);
      return () => actionListeners.delete(listener);
    },

    onSceneEvent(listener) {
      eventListeners.add(listener);
      return () => eventListeners.delete(listener);
    },

    onMessage(listener) {
      messageListeners.add(listener);
      return () => messageListeners.delete(listener);
    },
  };
}
