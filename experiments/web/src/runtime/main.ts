import { mountPreactRuntime } from "../implementation/preact/_utils";
import { splashPreactImplementation } from "../implementation/preact/splash";
import { getScene } from "../shared/scenes";
import { IframePostMessageTransport } from "./postMessageTransport";
import "../styles.css";

const initialScene = getScene(new URLSearchParams(window.location.search).get("scene"));
const transport = new IframePostMessageTransport({
  targetOrigin: window.location.origin,
  allowedOrigins: [window.location.origin],
});

mountPreactRuntime({
  root: document.getElementById("runtime-root")!,
  transport,
  implementations: [splashPreactImplementation],
  initialScene,
});
