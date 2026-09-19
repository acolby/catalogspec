import { mountScene } from "../coordinator";
import "../styles.css";

mountScene({
  root: document.getElementById("runtime-root")!,
  sceneId: new URLSearchParams(window.location.search).get("scene"),
});
