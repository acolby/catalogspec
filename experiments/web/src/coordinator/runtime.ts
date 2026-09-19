import type { SceneSnapshot } from "../shared/types";
import { api } from "../api";
import type { HostToRuntimeMessage, RuntimeAction, RuntimeEvent, RuntimeToHostMessage } from "./protocol";
import { IframeRuntimeTransport } from "./transports/iframeRuntimeTransport";

export type SceneListener = (scene: SceneSnapshot) => void;

export type RuntimeTransport = {
  send(message: RuntimeToHostMessage): void;
  subscribe(handler: (message: HostToRuntimeMessage) => void): () => void;
};

export type RuntimeCoordinator = {
  getScene(): SceneSnapshot;
  onSceneChange(listener: SceneListener): () => void;
  handleAction(action: RuntimeAction): void;
  handleEvent(event: RuntimeEvent): void;
};

type CreateRuntimeCoordinatorOptions = {
  sceneId?: string | null;
  initialScene?: SceneSnapshot;
  fetchScene?: (sceneId: string | null | undefined) => Promise<SceneSnapshot>;
  transport?: RuntimeTransport;
  targetOrigin?: string;
  allowedOrigins?: string[];
};

export async function createRuntimeCoordinator(options: CreateRuntimeCoordinatorOptions): Promise<RuntimeCoordinator> {
  const loadScene = options.fetchScene ?? api.fetchScene;
  const initialScene = options.initialScene ?? await loadScene(options.sceneId);
  const transport = options.transport ?? new IframeRuntimeTransport({
    targetOrigin: options.targetOrigin ?? window.location.origin,
    allowedOrigins: options.allowedOrigins ?? [window.location.origin],
  });
  let currentScene = initialScene;
  const listeners = new Set<SceneListener>();

  function publishScene(scene: SceneSnapshot): void {
    currentScene = scene;
    for (const listener of listeners) listener(scene);
    transport.send({ type: "catalogspec.scene.rendered", sceneId: scene.id });
  }

  transport.subscribe((message) => {
    if (message.type !== "catalogspec.scene.load") return;

    loadScene(message.sceneId)
      .then(publishScene)
      .catch((error: unknown) => {
        transport.send({ type: "catalogspec.runtime.error", message: `Unable to load scene ${message.sceneId}.`, details: error });
      });
  });

  transport.send({ type: "catalogspec.runtime.ready" });
  transport.send({ type: "catalogspec.scene.rendered", sceneId: initialScene.id });

  return {
    getScene() {
      return currentScene;
    },

    onSceneChange(listener) {
      listeners.add(listener);
      listener(currentScene);
      return () => listeners.delete(listener);
    },

    handleEvent(event) {
      transport.send({
        type: "catalogspec.scene.event",
        sceneId: currentScene.id,
        instanceId: event.source?.id ?? "unknown",
        event: event.name,
        props: event.props,
      });
    },

    handleAction(action) {
      transport.send({
        type: "catalogspec.action.request",
        sceneId: currentScene.id,
        instanceId: action.source?.id ?? "unknown",
        action: action.name,
        props: action.props,
      });
    },
  };
}
