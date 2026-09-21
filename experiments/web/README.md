# Web Experiment

Status: Experimental / non-normative

This folder is the active playground for separating a web tooling shell from a scene runtime.

## Shape

```txt
experiments/web/
  catalogs/splash/      CatalogSpec catalog contract
  scenes/               SceneSpec-style JSON snapshots
  src/shell/            host/tooling UI outside the iframe
  src/api/              local API client shim for scenes and implementations
  src/coordinator/      scene coordination and environment transports
  src/runtime/          runtime.html entrypoint
  catalogComposer/            shared web catalog composition utilities, including model primitives
  implementations/
    splash/             Splash catalog implementation, including its Preact view adapter
```

## Boundary

```txt
Shell page: /index.html
  tooling, scene picker, message log
        │
        │ postMessage
        ▼
Runtime page: /runtime.html
  thin entrypoint at src/runtime/main.ts
  scene coordinator imported from src/coordinator
  default iframe postMessage transport
  shared catalog composition utilities from catalogComposer/
  Splash implementation and Preact view adapter from implementations/splash
```

The runtime page can also be opened directly:

```txt
/runtime.html?scene=launch-hero
/runtime.html?scene=product-waitlist
```

When opened directly, it renders the selected scene without needing the shell.

## Run

```bash
cd experiments/web
npm install
npm run dev
```

Then open:

```txt
http://localhost:5173/
```

## Notes

The current runtime accepts scene load requests only:

```ts
{ type: "catalogspec.scene.load", sceneId }
```

Streaming updates, framework-neutral implementation manifests, formal SceneSpec validation, and action handling are intentionally deferred.
