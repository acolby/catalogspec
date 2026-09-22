# Catalog Composer Architecture

Status: experimental / non-normative

This folder currently contains two closely related notions:

1. **Catalog Composer**: implementation-facing contracts and scene item tree composition.
2. **Scene Runtime**: environment-facing orchestration that resolves, starts, updates, and disposes a running scene.

The design goal is low-entropy implementation code: explicit data flow, minimal framework leakage, and small implementation-provided surfaces.

## Layer responsibilities

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

### `composer/`

`composer/composeView.ts` projects a scene item subtree into `TView`.

It owns:

- scene item traversal
- item implementation lookup
- slot outlet creation through `adapter.boundary`
- item input construction: `item`, `props`, `state`, `actions`, `slots`, `emit`, `context`
- item lifecycle registration

It currently also creates and stores item models. That works for the experiment, but the intended cleanup is to move item/context model ownership into an explicit runtime model driver.

### `adapter/`

The adapter is the only framework-specific primitive Catalog Composer needs:

```ts
type ViewAdapter<TView> = {
  boundary(input: ViewAdapterBoundaryInput<TView>): TView | undefined;
  mount(root: Element, view: TView): void;
};
```

`boundary` creates embeddable slot/item boundaries. `mount` commits the completed root view into the host element.

### `model/`

`model/createItemModel.ts` is the current state/action primitive.

A model definition provides an `actions(state)` factory. Actions mutate a cloned draft and commit that draft after the action returns. Subscribers receive the next and previous readonly states.

Current policy:

- scene item `state` is used as initial model state
- once a model exists, it is runtime-owned
- model state changes emit events and request a render

Future cleanup should introduce a runtime model driver responsible for identity, reconciliation, subscriptions, invalidation, and disposal.

### `context/`

Context contracts describe named runtime capabilities exposed to items, such as `scene` and `theme`.

A runtime context value has:

```ts
{
  state,
  actions,
}
```

Context models are currently created by the scene runtime because they depend on scene inputs, implementation themes, coordinator actions, and render invalidation.

### `implementation/`

Implementation contracts describe what catalog implementations provide:

- model-backed items
- item lifecycle hooks
- item views
- implemented catalog shape

These types are implementation-facing and intentionally framework-generic over `TView`.

### `runtime/lifecycle/`

Runtime lifecycle currently exposes shared lifecycle frame types. The active ticker and cleanup registry live in `runtime/createSceneRuntime.ts`. If they grow, they should move into this nested lifecycle bucket.

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
  adapter/
  composer/
  context/ contracts
  define.ts
  implementation/
  model/ definition contracts

Scene Runtime
  runtime/
  runtime/lifecycle/
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
