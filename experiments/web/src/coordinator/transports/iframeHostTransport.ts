import { isRuntimeToHostMessage, type HostToRuntimeMessage, type RuntimeToHostMessage } from "../protocol";
import type { HostTransport } from "../host";

export class IframeHostTransport implements HostTransport {
  private readonly targetOrigin: string;
  private readonly allowedOrigins?: Set<string>;
  private readonly targetWindow: () => Window | null | undefined;

  constructor(options: { targetWindow: () => Window | null | undefined; targetOrigin?: string; allowedOrigins?: string[] }) {
    this.targetWindow = options.targetWindow;
    this.targetOrigin = options.targetOrigin ?? window.location.origin;
    this.allowedOrigins = options.allowedOrigins ? new Set(options.allowedOrigins) : undefined;
  }

  send(message: HostToRuntimeMessage): void {
    this.targetWindow()?.postMessage(message, this.targetOrigin);
  }

  subscribe(handler: (message: RuntimeToHostMessage) => void): () => void {
    const listener = (event: MessageEvent) => {
      if (this.allowedOrigins && !this.allowedOrigins.has(event.origin)) return;
      if (!isRuntimeToHostMessage(event.data)) return;
      handler(event.data);
    };

    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }
}
