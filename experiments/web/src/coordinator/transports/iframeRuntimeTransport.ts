import { isHostToRuntimeMessage, type HostToRuntimeMessage, type RuntimeToHostMessage } from "../protocol";
import type { RuntimeTransport } from "../runtime";

export class IframeRuntimeTransport implements RuntimeTransport {
  private readonly targetOrigin: string;
  private readonly allowedOrigins?: Set<string>;

  constructor(options: { targetOrigin?: string; allowedOrigins?: string[] } = {}) {
    this.targetOrigin = options.targetOrigin ?? window.location.origin;
    this.allowedOrigins = options.allowedOrigins ? new Set(options.allowedOrigins) : undefined;
  }

  send(message: RuntimeToHostMessage): void {
    window.parent.postMessage(message, this.targetOrigin);
  }

  subscribe(handler: (message: HostToRuntimeMessage) => void): () => void {
    const listener = (event: MessageEvent) => {
      if (this.allowedOrigins && !this.allowedOrigins.has(event.origin)) return;
      if (!isHostToRuntimeMessage(event.data)) return;
      handler(event.data);
    };

    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }
}
