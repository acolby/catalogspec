# Experimental Web Runtime

Status: Experimental / non-normative

This package is a playground for rendering SceneSpec scene snapshots on the web. It does not define CatalogSpec or SceneSpec conformance behavior.

The goal is to explore runtime primitives without making them part of the core specification.

## Boundary model

```txt
Demo wrapper
  example/dev UI, controls, sample scene switching
        │
        ▼
Runtime shell
  receives scene snapshots, gathers events/action intents/errors
        │
        ▼
Scene renderer
  renders scene item instances using a catalog implementation
        │
        ▼
Implementation
  framework-specific fulfillment of catalog item definitions
```

The demo wrapper embeds the runtime shell in an iframe. The rendered scene lives inside that iframe; demo controls and logs live outside it.

```txt
Host app / demo wrapper
        │
        │ postMessage
        ▼
Runtime iframe
        │
        ▼
Runtime shell
```

The iframe boundary is intentional: it helps separate demo tooling from the scene runtime and gives us a starting point for technology-agnostic host communication.

## Included experiment

This example uses Preact and Vite because they keep the web experiment small.

It includes:

- a runtime shell
- host adapter primitives
- an iframe-oriented `postMessage` adapter
- an in-memory adapter for demos/tests
- a simple SceneSpec snapshot renderer
- an experimental commerce catalog implementation for `ProductCard`
- a demo wrapper that embeds `/runtime.html` and sends scene snapshots into the shell with `postMessage`

## Run

```bash
cd examples/runtimes/web
npm install
npm run dev
```

## Message surface

The initial message surface intentionally supports full scene replacement only. Streaming scene updates are deferred.

Inbound messages:

```ts
{ type: "catalogspec.scene.replace", scene: SceneSnapshot }
```

Outbound messages:

```ts
{ type: "catalogspec.runtime.ready" }
{ type: "catalogspec.scene.rendered", sceneId: string }
{ type: "catalogspec.scene.event", sceneId: string, instanceId: string, event: string, props?: object }
{ type: "catalogspec.action.request", sceneId: string, instanceId: string, action: string, props?: object }
{ type: "catalogspec.runtime.error", message: string, details?: unknown }
```

These messages are experimental and may change.
