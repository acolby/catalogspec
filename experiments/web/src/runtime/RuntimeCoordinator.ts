import type { RuntimeInboundMessage, RuntimeOutboundMessage } from "../shared/messages";
import type { CatalogImplementation, RuntimeAction, RuntimeEvent, SceneSnapshot } from "../shared/types";

type SceneListener = (scene: SceneSnapshot) => void;

export type RuntimeTransport = {
  send(message: RuntimeOutboundMessage): void;
  subscribe(handler: (message: RuntimeInboundMessage) => void): () => void;
};

export class RuntimeCoordinator<TImplementation extends CatalogImplementation = CatalogImplementation> {
  private sceneListeners = new Set<SceneListener>();
  private unsubscribe?: () => void;

  constructor(
    private readonly transport: RuntimeTransport,
    private readonly implementations: TImplementation[],
    private currentScene: SceneSnapshot,
  ) {}

  start(): void {
    this.unsubscribe = this.transport.subscribe((message) => {
      if (message.type === "catalogspec.scene.replace") {
        this.replaceScene(message.scene);
      }
    });
    this.transport.send({ type: "catalogspec.runtime.ready" });
    this.publishCurrentScene();
  }

  stop(): void {
    this.unsubscribe?.();
    this.sceneListeners.clear();
  }

  getScene(): SceneSnapshot {
    return this.currentScene;
  }

  onSceneChange(listener: SceneListener): () => void {
    this.sceneListeners.add(listener);
    listener(this.currentScene);
    return () => this.sceneListeners.delete(listener);
  }

  getImplementation(scene: SceneSnapshot): TImplementation | undefined {
    return this.implementations.find((implementation) => implementation.catalog.id === scene.catalog.id && implementation.catalog.version === scene.catalog.version);
  }

  replaceScene(scene: SceneSnapshot): void {
    if (!this.getImplementation(scene)) {
      this.transport.send({ type: "catalogspec.runtime.error", message: `No implementation registered for ${scene.catalog.id}@${scene.catalog.version}.` });
      return;
    }

    this.currentScene = scene;
    this.publishCurrentScene();
  }

  handleEvent(event: RuntimeEvent): void {
    this.transport.send({
      type: "catalogspec.scene.event",
      sceneId: this.currentScene.id,
      instanceId: event.source?.id ?? "unknown",
      event: event.name,
      props: event.props,
    });
  }

  handleAction(action: RuntimeAction): void {
    this.transport.send({
      type: "catalogspec.action.request",
      sceneId: this.currentScene.id,
      instanceId: action.source?.id ?? "unknown",
      action: action.name,
      props: action.props,
    });
  }

  private publishCurrentScene(): void {
    for (const listener of this.sceneListeners) listener(this.currentScene);
    this.transport.send({ type: "catalogspec.scene.rendered", sceneId: this.currentScene.id });
  }
}
