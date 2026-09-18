import { render } from "preact";
import { DemoApp } from "./demo/App";
import "./styles.css";

render(<DemoApp />, document.getElementById("app")!);
