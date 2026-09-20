# Renderers

Status: experimental / non-normative

A renderer adapts scene data and catalog implementations to a native UI framework such as Preact, React, Lit, or another target.

The renderer contract uses two important words:

- **compose**: turn scene/item runtime input into a framework-specific view value, such as Preact `ComponentChild`, React `ReactNode`, or Lit `TemplateResult`.
- **render**: commit that framework-specific view value into a host target, such as a DOM element.

In other words, `compose*View` builds the view tree; `renderView` mounts/updates it.

In this experiment, the renderer layer is separate from:

- `src/coordinator/` — scene orchestration, host/runtime messaging, and scene lifecycle
- `src/api/` — local API client shim for scenes and implementations
- `implementations/` — catalog-specific component implementations

## Current shape

```txt
renderers/
  createSceneMounter.ts   # shared factory for renderer-specific mounters
  index.ts
  preact/
    index.ts
    src/
      mountScene.tsx                 # Preact mounter created from createSceneMounter
      composeSceneView.tsx           # scene -> Preact view value
      composeImplementedItemView.tsx # scene item instance -> implemented item input -> Preact view value
```

## Stateful item model scaffold

`models/` contains an experimental item model scaffold inspired by the sibling ProxyModel project. It lets an implemented item separate model/state/actions from view rendering:

```ts
export const model = {
  actions: state => ({
    increment() {
      state.count += 1;
    },
  }),
} satisfies Model;

export const Counter = {
  model,
  view,
} satisfies Item;
```

Initial/current state is supplied by the scene/runtime item instance, not by the implemented item view. `composeImplementedItemView` is the adapter that creates/looks up the item model from that state, passes readonly model state and bound actions into the view, emits state transitions, and requests a renderer update. This is intentionally early scaffolding for framework-independent state/action handling and debug tooling.

## Responsibility split

### `createSceneMounter`

Shared renderer utility. It wires together:

- the runtime coordinator
- the API client
- a renderer-specific `composeSceneView`
- a renderer-specific `composeImplementedItemView`
- a renderer-specific `renderView`

Together these form the framework-specific renderer contract.

It does not know Preact, React, Lit, or any specific catalog.

### `composeSceneView`

Framework-specific scene view composer.

It receives:

- the scene snapshot
- the resolved catalog implementation
- `composeImplementedItemView`
- action/event handlers from the runtime coordinator

It returns the framework view value for the whole scene without committing it to the DOM.

### `composeImplementedItemView`

Framework-specific item view composer.

It receives one scene item instance, finds the matching implemented item in the catalog implementation, composes slots recursively, binds model state/actions to the item view, and returns the framework view value for that item.

### `renderView`

Framework/native mount primitive.

For Preact this is effectively:

```ts
render(view, root);
```

It takes the framework view value returned by `composeSceneView` and commits it into the DOM root.

## Flow

```mermaid
flowchart TD
  A[Runtime page] --> B[coordinator.mountScene]
  B --> C[createRuntimeCoordinator]
  C --> D[API fetchScene sceneId]
  D --> E[RuntimeCoordinator]
  B --> F[renderer/preact mountScene]
  F --> G[createSceneMounter]

  E -->|onSceneChange scene| G
  G --> H[API resolveImplementation scene]
  H --> I[Catalog implementation]

  G --> J[composeSceneView]
  I --> J
  J --> K[composeImplementedItemView root]
  K --> L[Implemented item view]
  L --> K
  K --> J
  J --> M[Framework view]
  M --> N[renderView]
  N --> O[DOM root]

  L -->|action/event| E
```

## Preact flow

```mermaid
sequenceDiagram
  participant Main as runtime/main.ts
  participant CoordMount as coordinator/mountScene
  participant Coord as RuntimeCoordinator
  participant Api as api
  participant PreactMount as renderers/preact mountScene
  participant Mounter as createSceneMounter
  participant Scene as composeSceneView
  participant Item as composeImplementedItemView
  participant DOM as DOM root

  Main->>CoordMount: mountScene({ root, sceneId })
  CoordMount->>Coord: createRuntimeCoordinator({ sceneId })
  Coord->>Api: fetchScene(sceneId)
  Api-->>Coord: SceneSnapshot
  CoordMount->>PreactMount: mountScene({ root, coordinator, api })
  PreactMount->>Mounter: createSceneMounter({ renderView, composeSceneView, composeImplementedItemView })
  Coord-->>Mounter: onSceneChange(scene)
  Mounter->>Api: resolveImplementation(scene)
  Api-->>Mounter: ImplementedCatalog
  Mounter->>Scene: composeSceneView({ scene, implementation, composeImplementedItemView, onAction, onEvent })
  Scene->>Item: composeImplementedItemView(scene.root, implementation, runtime)
  Item-->>Scene: Preact view tree
  Scene-->>Mounter: Preact view
  Mounter->>DOM: renderView(root, view)
```

## Naming note

Exports inside a renderer are intentionally framework-local:

```ts
import { mountScene, composeSceneView, composeImplementedItemView } from "../../renderers/preact";
```

The import path already identifies the framework, so exported names do not include `Preact`.
