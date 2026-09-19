import { createRuntimeCoordinator } from "../coordinator";
import { mountPreactRuntime } from "../implementation/preact/_utils";
import { preactImplementation } from "../implementation/preact/splash";
import "../styles.css";

async function main() {
  const coordinator = await createRuntimeCoordinator({
    sceneId: new URLSearchParams(window.location.search).get("scene"),
  });

  mountPreactRuntime({
    root: document.getElementById("runtime-root")!,
    coordinator,
    implementations: [preactImplementation],
  });
}

main().catch((error: unknown) => {
  document.getElementById("runtime-root")!.innerHTML = `<main class="runtime-frame-root"><div class="runtime-error">Unable to start runtime.</div></main>`;
  console.error(error);
});
