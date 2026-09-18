import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [preact()],
  build: {
    rollupOptions: {
      input: {
        shell: "index.html",
        runtime: "runtime.html"
      }
    }
  }
});
