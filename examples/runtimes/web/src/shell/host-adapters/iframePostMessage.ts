import type { HostAdapter, RuntimeInboundMessage, RuntimeOutboundMessage } from "../messages";

interface IframePostMessageOptions {
  targetOrigin?: string;
  allowedOrigins?: string[];
}

export class IframePostMessageHostAdapter implements HostAdapter {
  private targetOrigin: string;
  private allowedOrigins?: Set<string>;

  constructor(options: IframePostMessageOptions = {}) {
    this.targetOrigin = options.targetOrigin ?? "*";
    this.allowedOrigins = options.allowedOrigins ? new Set(options.allowedOrigins) : undefined;
  }

  send(message: RuntimeOutboundMessage): void {
    window.parent.postMessage(message, this.targetOrigin);
  }

  subscribe(handler: (message: RuntimeInboundMessage) => void): () => void {
    const listener = (event: MessageEvent) => {
      if (this.allowedOrigins && !this.allowedOrigins.has(event.origin)) {
        return;
      }

      if (!isRuntimeInboundMessage(event.data)) {
        return;
      }

      handler(event.data);
    };

    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }
}

function isRuntimeInboundMessage(value: unknown): value is RuntimeInboundMessage {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as { type?: unknown; scene?: unknown };
  return candidate.type === "catalogspec.scene.replace" && !!candidate.scene;
}
