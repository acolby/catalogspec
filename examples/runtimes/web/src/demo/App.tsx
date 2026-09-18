import { useEffect, useRef, useState } from "preact/hooks";
import type { RuntimeInboundMessage, RuntimeOutboundMessage } from "../shell/messages";
import { alternateScene, sampleScene } from "./sampleScene";

export function DemoApp() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [messages, setMessages] = useState<RuntimeOutboundMessage[]>([]);

  useEffect(() => {
    const listener = (event: MessageEvent) => {
      if (!isRuntimeOutboundMessage(event.data)) {
        return;
      }

      setMessages((current) => [event.data, ...current].slice(0, 12));

      if (event.data.type === "catalogspec.runtime.ready") {
        postToRuntime({ type: "catalogspec.scene.replace", scene: sampleScene });
      }
    };

    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, []);

  function postToRuntime(message: RuntimeInboundMessage): void {
    iframeRef.current?.contentWindow?.postMessage(message, window.location.origin);
  }

  return (
    <main class="demo-shell">
      <section class="demo-panel">
        <p class="demo-kicker">Experimental / non-normative</p>
        <h1>CatalogSpec Web Runtime</h1>
        <p>
          This wrapper is demo-only. The scene renders inside an iframe runtime shell. The wrapper and
          iframe communicate through <code>postMessage</code>, which keeps demo controls separate from the rendered scene.
        </p>
        <div class="demo-actions">
          <button type="button" onClick={() => postToRuntime({ type: "catalogspec.scene.replace", scene: sampleScene })}>
            Load product scene
          </button>
          <button type="button" onClick={() => postToRuntime({ type: "catalogspec.scene.replace", scene: alternateScene })}>
            Load alternate scene
          </button>
        </div>
      </section>

      <section class="runtime-frame" aria-label="Rendered scene iframe">
        <iframe ref={iframeRef} title="CatalogSpec runtime shell" src="/runtime.html" />
      </section>

      <aside class="message-log" aria-label="Runtime messages">
        <h2>Runtime shell messages</h2>
        {messages.length === 0 ? <p>No messages yet.</p> : null}
        <ol>
          {messages.map((message, index) => (
            <li key={index}>
              <code>{JSON.stringify(message)}</code>
            </li>
          ))}
        </ol>
      </aside>
    </main>
  );
}

function isRuntimeOutboundMessage(value: unknown): value is RuntimeOutboundMessage {
  return !!value && typeof value === "object" && typeof (value as { type?: unknown }).type === "string";
}
