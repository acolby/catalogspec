import type { CatalogImplementation, SceneSnapshot } from "../scene";
import type { HostAdapter, RuntimeOutboundMessage } from "./messages";

type SceneListener = (scene: SceneSnapshot | null) => void;

export class RuntimeShell {
  private currentScene: SceneSnapshot | null = null;
  private unsubscribe?: () => void;
  private sceneListeners = new Set<SceneListener>();

  constructor(
    private readonly adapter: HostAdapter,
    private readonly implementations: CatalogImplementation[],
  ) {}

  start(): void {
    this.unsubscribe = this.adapter.subscribe((message) => {
      if (message.type === "catalogspec.scene.replace") {
        this.replaceScene(message.scene);
      }
    });

    this.send({ type: "catalogspec.runtime.ready" });
  }

  stop(): void {
    this.unsubscribe?.();
    this.unsubscribe = undefined;
    this.sceneListeners.clear();
  }

  getScene(): SceneSnapshot | null {
    return this.currentScene;
  }

  onSceneChange(listener: SceneListener): () => void {
    this.sceneListeners.add(listener);
    listener(this.currentScene);
    return () => this.sceneListeners.delete(listener);
  }

  replaceScene(scene: SceneSnapshot): void {
    const implementation = this.resolveImplementation(scene);
    if (!implementation) {
      this.reportError(`No implementation registered for catalog ${scene.catalog.id}@${scene.catalog.version}.`);
      return;
    }

    this.currentScene = scene;
    this.notifySceneListeners();
    this.send({ type: "catalogspec.scene.rendered", sceneId: scene.id });
  }

  getImplementation(scene: SceneSnapshot): CatalogImplementation | undefined {
    return this.resolveImplementation(scene);
  }

  emitInstanceEvent(instanceId: string, event: string, props?: Record<string, unknown>): void {
    const scene = this.currentScene;
    if (!scene) return;

    this.send({
      type: "catalogspec.scene.event",
      sceneId: scene.id,
      instanceId,
      event,
      props,
    });
  }

  requestAction(instanceId: string, action: string, props?: Record<string, unknown>): void {
    const scene = this.currentScene;
    if (!scene) return;

    this.send({
      type: "catalogspec.action.request",
      sceneId: scene.id,
      instanceId,
      action,
      props,
    });
  }

  private resolveImplementation(scene: SceneSnapshot): CatalogImplementation | undefined {
    return this.implementations.find(
      (implementation) =>
        implementation.catalog.id === scene.catalog.id &&
        implementation.catalog.version === scene.catalog.version,
    );
  }

  private reportError(message: string, details?: unknown): void {
    this.send({ type: "catalogspec.runtime.error", message, details });
  }

  private notifySceneListeners(): void {
    for (const listener of this.sceneListeners) {
      listener(this.currentScene);
    }
  }

  private send(message: RuntimeOutboundMessage): void {
    this.adapter.send(message);
  }
}
