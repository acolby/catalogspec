import { isRuntimeInboundMessage, type RuntimeInboundMessage, type RuntimeOutboundMessage } from "../shared/messages";
import type { RuntimeTransport } from "./RuntimeCoordinator";

export class IframePostMessageTransport implements RuntimeTransport {
  private readonly targetOrigin: string;
  private readonly allowedOrigins?: Set<string>;

  constructor(options: { targetOrigin?: string; allowedOrigins?: string[] } = {}) {
    this.targetOrigin = options.targetOrigin ?? window.location.origin;
    this.allowedOrigins = options.allowedOrigins ? new Set(options.allowedOrigins) : undefined;
  }

  send(message: RuntimeOutboundMessage): void {
    window.parent.postMessage(message, this.targetOrigin);
  }

  subscribe(handler: (message: RuntimeInboundMessage) => void): () => void {
    const listener = (event: MessageEvent) => {
      if (this.allowedOrigins && !this.allowedOrigins.has(event.origin)) return;
      if (!isRuntimeInboundMessage(event.data)) return;
      handler(event.data);
    };

    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }
}
