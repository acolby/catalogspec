import { useEffect, useMemo, useState } from "preact/hooks";
import type { RuntimeOutboundMessage } from "../shell/messages";
import { InMemoryHostAdapter } from "../shell/host-adapters/inMemory";
import { RuntimeShell } from "../shell/RuntimeShell";
import { RenderScene } from "../renderer/renderScene";
import { commerceImplementation } from "../implementations/commerce";
import { alternateScene, sampleScene } from "./sampleScene";

export function DemoApp() {
  const adapter = useMemo(() => new InMemoryHostAdapter(), []);
  const shell = useMemo(() => new RuntimeShell(adapter, [commerceImplementation]), [adapter]);
  const [messages, setMessages] = useState<RuntimeOutboundMessage[]>([]);

  useEffect(() => {
    const unsubscribeMessages = adapter.onRuntimeMessage((message) => {
      setMessages((current) => [message, ...current].slice(0, 12));
    });

    shell.start();
    adapter.postToRuntime({ type: "catalogspec.scene.replace", scene: sampleScene });

    return () => {
      unsubscribeMessages();
      shell.stop();
    };
  }, [adapter, shell]);

  const scene = shell.scene.value;
  const implementation = scene ? shell.getImplementation(scene) : undefined;

  return (
    <main class="demo-shell">
      <section class="demo-panel">
        <p class="demo-kicker">Experimental / non-normative</p>
        <h1>CatalogSpec Web Runtime</h1>
        <p>
          This wrapper is demo-only. It talks to the runtime shell through an in-memory host adapter,
          mirroring the boundary an iframe <code>postMessage</code> adapter would use.
        </p>
        <div class="demo-actions">
          <button type="button" onClick={() => adapter.postToRuntime({ type: "catalogspec.scene.replace", scene: sampleScene })}>
            Load product scene
          </button>
          <button type="button" onClick={() => adapter.postToRuntime({ type: "catalogspec.scene.replace", scene: alternateScene })}>
            Load alternate scene
          </button>
        </div>
      </section>

      <section class="runtime-frame" aria-label="Rendered scene">
        {scene && implementation ? (
          <RenderScene
            scene={scene}
            implementation={implementation}
            emitEvent={(instanceId, event, props) => shell.emitInstanceEvent(instanceId, event, props)}
            requestAction={(instanceId, action, props) => shell.requestAction(instanceId, action, props)}
          />
        ) : (
          <div class="runtime-empty">No scene loaded.</div>
        )}
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
