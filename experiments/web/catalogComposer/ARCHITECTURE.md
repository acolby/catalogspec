# Catalog Composer Architecture

Status: experimental / non-normative

This folder currently contains two closely related notions:

1. **Catalog Composer**: implementation-facing contracts and scene item tree composition.
2. **Scene Runtime**: environment-facing orchestration that resolves, starts, updates, and disposes a running scene.

The design goal is low-entropy implementation code: explicit data flow, minimal framework leakage, and small implementation-provided surfaces.

## Current source shape

```txt
catalogComposer/
  contracts/  implementation-facing define helpers and type contracts
  composer/   scene item tree -> framework-native view
  model/      state/action model primitive
  runtime/    scene runtime orchestration
  utils/      small shared helpers
```

Most implementation-facing type complexity is intentionally consolidated into `contracts/` so the top-level tree reflects the code with actual runtime behavior.

## Layer responsibilities

### `contracts/`

`contracts/` owns the type and authoring surface shared by implementation authors and Catalog Composer internals.

It contains:

- `defineAdapter`, `defineCatalog`, `defineContext`, `defineItem`
- framework adapter contracts
- implemented catalog/item/context contracts
- item view and lifecycle contracts
- model definition aliases
- composer runtime input contracts

This directory should contain no scene traversal, DOM work, transport logic, API access, or runtime state management. It is the contract vocabulary for the rest of the system.

### `composer/`

`composer/composeView.ts` projects a scene item subtree into `TView`.

It owns:

- scene item traversal
- item implementation lookup
- slot outlet creation through `adapter.boundary`
- item input construction: `item`, `props`, `state`, `actions`, `slots`, `emit`, `context`
- item lifecycle registration

It currently also creates and stores item models. That works for the experiment, but the intended cleanup is to move item/context model ownership into an explicit runtime model driver.

### `model/`

`model/createItemModel.ts` is the current state/action primitive.

A model definition provides an `actions(state)` factory. Actions mutate a cloned draft and commit that draft after the action returns. Subscribers receive the next and previous readonly states.

Current policy:

- scene item `state` is used as initial model state
- once a model exists, it is runtime-owned
- model state changes emit events and request a render

Future cleanup should introduce a runtime model driver responsible for identity, reconciliation, subscriptions, invalidation, and disposal.

### `runtime/`

`runtime/createSceneRuntime.ts` wraps the runtime environment around a catalog implementation.

It owns:

- scene subscription through the runtime coordinator
- implementation resolution through the API client
- catalog/version compatibility checks
- runtime context creation
- theme selection and root DOM styling
- one shared tick loop for context and item lifecycle hooks
- render invalidation
- final framework mount through `implementation.adapter.mount`

It should not know about Preact, React, Lit, or any specific catalog.

The public shape is runtime-oriented:

```ts
const runtime = createSceneRuntime({ root, coordinator, api });
const dispose = runtime.start();
```

### `utils/`

Only small, cross-cutting utilities belong here. Domain concepts such as model, context, lifecycle, composition, or runtime orchestration should stay in their named folders.

## Runtime flow

```txt
Runtime coordinator
  ↓ scene change
runtime/createSceneRuntime.start()
  ↓ resolve implementation
  ↓ create runtime context
  ↓ apply root theme styles
composer/composeView(scene.root)
  ↓ recursively create item views and slot outlets
implementation adapter.mount(root, view)
  ↓
framework DOM commit
```

## Item render flow

```txt
SceneItemInstance
  ↓
composeView
  ↓ lookup implemented item
  ↓ create slot outlets
  ↓ create/lookup model
  ↓ bind item input
implementedItem.view(input)
  ↓
TView
```

## Conceptual package boundary

Longer term, this can split into two top-level notions or packages:

```txt
Catalog Composer
  contracts/
  composer/
  model definition contracts

Scene Runtime
  runtime/
  model driver/execution
  context model execution
  coordinator/API integration
```

Dependency direction should be one-way:

```txt
Scene Runtime -> Catalog Composer
```

Catalog Composer should define implementation contracts and compose views. Scene Runtime should own environment coordination, model instance execution, lifecycle scheduling, and host mounting.

## Current cleanup direction

The adapter boundary is intentionally small and should remain stable. The main coupling to reduce is model/runtime ownership.

Recommended next step:

```ts
type ModelDriver = {
  item(instance, implementedItem): BoundModel;
  context(name, implementation): BoundModel;
  disposeInactiveItems(activeIds: Set<string>): void;
  dispose(): void;
};
```

With that extraction:

- `composeView` becomes closer to pure scene-to-view projection
- `createSceneRuntime` no longer directly manages context model details
- identity and state reconciliation policies become explicit
- render invalidation can later be scheduled or batched

## Important current policies

- Item model identity is currently keyed by scene item instance id.
- Context model identity is keyed by catalog id/version, scene id, and context name.
- Scene item state is initial state, not an automatic patch source after model creation.
- Slot outlets are adapter-native values, not pre-composed child arrays.
- Implementations consume only the public `catalogComposer` entrypoint.
