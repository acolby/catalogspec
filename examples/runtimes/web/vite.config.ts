import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [preact()],
  build: {
    rollupOptions: {
      input: {
        demo: "index.html",
        runtime: "runtime.html",
      },
    },
  },
});
