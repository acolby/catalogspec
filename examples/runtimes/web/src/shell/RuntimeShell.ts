import { signal } from "@preact/signals";
import type { CatalogImplementation, SceneSnapshot } from "../scene";
import type { HostAdapter, RuntimeOutboundMessage } from "./messages";

export class RuntimeShell {
  readonly scene = signal<SceneSnapshot | null>(null);
  readonly errors = signal<string[]>([]);

  private unsubscribe?: () => void;

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
  }

  replaceScene(scene: SceneSnapshot): void {
    const implementation = this.resolveImplementation(scene);
    if (!implementation) {
      this.reportError(`No implementation registered for catalog ${scene.catalog.id}@${scene.catalog.version}.`);
      return;
    }

    this.scene.value = scene;
    this.send({ type: "catalogspec.scene.rendered", sceneId: scene.id });
  }

  getImplementation(scene: SceneSnapshot): CatalogImplementation | undefined {
    return this.resolveImplementation(scene);
  }

  emitInstanceEvent(instanceId: string, event: string, props?: Record<string, unknown>): void {
    const scene = this.scene.value;
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
    const scene = this.scene.value;
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
    this.errors.value = [...this.errors.value, message];
    this.send({ type: "catalogspec.runtime.error", message, details });
  }

  private send(message: RuntimeOutboundMessage): void {
    this.adapter.send(message);
  }
}
