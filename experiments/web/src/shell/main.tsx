import { render } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { isRuntimeOutboundMessage, type RuntimeInboundMessage, type RuntimeOutboundMessage } from "../shared/messages";
import { scenes } from "../shared/scenes";
import "../styles.css";

function ShellApp() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [sceneId, setSceneId] = useState("launch-hero");
  const [messages, setMessages] = useState<RuntimeOutboundMessage[]>([]);

  useEffect(() => {
    const listener = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (!isRuntimeOutboundMessage(event.data)) return;

      setMessages((items) => [event.data, ...items].slice(0, 12));
      if (event.data.type === "catalogspec.runtime.ready") {
        postToRuntime({ type: "catalogspec.scene.replace", scene: scenes[sceneId] });
      }
    };

    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, [sceneId]);

  function postToRuntime(message: RuntimeInboundMessage): void {
    iframeRef.current?.contentWindow?.postMessage(message, window.location.origin);
  }

  function loadScene(nextSceneId: string): void {
    setSceneId(nextSceneId);
    postToRuntime({ type: "catalogspec.scene.replace", scene: scenes[nextSceneId] });
  }

  return (
    <main class="shell-root">
      <section class="shell-panel">
        <p class="kicker">Experimental / non-normative</p>
        <h1>CatalogSpec Web Experiment</h1>
        <p>
          The shell is outside the iframe. The runtime lives inside <code>runtime.html</code>, receives scene snapshots over <code>postMessage</code>, and renders them with the Preact Splash implementation.
        </p>
        <label>
          Scene
          <select value={sceneId} onChange={(event) => loadScene((event.currentTarget as HTMLSelectElement).value)}>
            {Object.keys(scenes).map((id) => (
              <option value={id}>{id}</option>
            ))}
          </select>
        </label>
        <div class="shell-links">
          <a href={`/runtime.html?scene=${sceneId}`} target="_blank" rel="noreferrer">Open runtime URL</a>
        </div>
      </section>

      <section class="iframe-card" aria-label="Runtime iframe">
        <iframe ref={iframeRef} title="CatalogSpec runtime iframe" src={`/runtime.html?scene=${sceneId}`} />
      </section>

      <aside class="message-log" aria-label="Runtime messages">
        <h2>Runtime messages</h2>
        {messages.length === 0 ? <p class="muted">Waiting for runtime messages.</p> : null}
        <ol>
          {messages.map((message, index) => (
            <li key={index}><code>{JSON.stringify(message)}</code></li>
          ))}
        </ol>
      </aside>
    </main>
  );
}

render(<ShellApp />, document.getElementById("shell-root")!);
