# Web Experiment

Status: Experimental / non-normative

This folder is the active playground for separating a web tooling shell from a scene runtime.

## Shape

```txt
experiments/web/
  catalogs/splash/      CatalogSpec catalog contract
  scenes/               SceneSpec-style JSON snapshots
  src/shell/            host/tooling UI outside the iframe
  src/runtime/          framework-neutral runtime coordinator/transport used by runtime.html
  src/implementation/
    preact/_utils/      Preact-coupled runtime mounting and scene rendering utilities
    preact/splash/      Preact implementation of the Splash catalog
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
  iframe-safe runtime coordinator
  Preact mount/render utilities from implementation/preact/_utils
  Preact Splash implementation
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

The current runtime accepts full scene replacement only:

```ts
{ type: "catalogspec.scene.replace", scene }
```

Streaming updates, framework-neutral implementation manifests, formal SceneSpec validation, and action handling are intentionally deferred.
