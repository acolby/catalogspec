import { render } from "preact";
import { useEffect, useMemo, useState } from "preact/hooks";
import { commerceImplementation } from "./implementations/commerce";
import { RenderScene } from "./renderer/renderScene";
import type { SceneSnapshot } from "./scene";
import { IframePostMessageHostAdapter } from "./shell/host-adapters/iframePostMessage";
import { RuntimeShell } from "./shell/RuntimeShell";
import "./styles.css";

function RuntimeFrame() {
  const adapter = useMemo(() => new IframePostMessageHostAdapter({ targetOrigin: window.location.origin }), []);
  const shell = useMemo(() => new RuntimeShell(adapter, [commerceImplementation]), [adapter]);
  const [scene, setScene] = useState<SceneSnapshot | null>(null);

  useEffect(() => {
    const unsubscribeScene = shell.onSceneChange(setScene);
    shell.start();

    return () => {
      unsubscribeScene();
      shell.stop();
    };
  }, [shell]);

  const implementation = scene ? shell.getImplementation(scene) : undefined;

  return (
    <main class="runtime-shell-root">
      {scene && implementation ? (
        <RenderScene
          scene={scene}
          implementation={implementation}
          emitEvent={(instanceId, event, props) => shell.emitInstanceEvent(instanceId, event, props)}
          requestAction={(instanceId, action, props) => shell.requestAction(instanceId, action, props)}
        />
      ) : (
        <div class="runtime-empty">Waiting for scene snapshot.</div>
      )}
    </main>
  );
}

render(<RuntimeFrame />, document.getElementById("runtime-root")!);
