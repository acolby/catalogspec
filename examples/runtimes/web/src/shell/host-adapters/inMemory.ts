import type { HostAdapter, RuntimeInboundMessage, RuntimeOutboundMessage } from "../messages";

export class InMemoryHostAdapter implements HostAdapter {
  private inboundHandlers = new Set<(message: RuntimeInboundMessage) => void>();
  private outboundHandlers = new Set<(message: RuntimeOutboundMessage) => void>();

  send(message: RuntimeOutboundMessage): void {
    for (const handler of this.outboundHandlers) {
      handler(message);
    }
  }

  subscribe(handler: (message: RuntimeInboundMessage) => void): () => void {
    this.inboundHandlers.add(handler);
    return () => this.inboundHandlers.delete(handler);
  }

  postToRuntime(message: RuntimeInboundMessage): void {
    for (const handler of this.inboundHandlers) {
      handler(message);
    }
  }

  onRuntimeMessage(handler: (message: RuntimeOutboundMessage) => void): () => void {
    this.outboundHandlers.add(handler);
    return () => this.outboundHandlers.delete(handler);
  }
}
