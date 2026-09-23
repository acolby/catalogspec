# Catalog Composer

Status: experimental / non-normative

Catalog Composer is the implementation-facing composition utility for the web experiment. It helps a catalog implementation declare item controllers, item views, contexts, themes, and a framework adapter, then composes SceneSpec-style item trees into framework-native view values.

This folder currently also contains the experimental **scene runtime** entrypoint. The runtime consumes Catalog Composer, connects it to the coordinator/API environment, and starts rendering a scene into a host element.

## Public interface

Controller and context behavior use the framework-neutral entrypoint:

```ts
import {
  defineContext,
  defineItemController,
} from "../../catalogComposer";
```

Preact views use the Preact-bound contract module:

```ts
import { defineItem, adapter, type ItemSlot } from "../../catalogComposer/contracts/preact";
```

Runtime code creates a scene runtime through the top-level entrypoint:

```ts
import { createSceneRuntime } from "../../catalogComposer";
```

## What an implementation provides

A compatible implementation provides:

- implemented catalog items
- optional named contexts
- concrete theme tokens
- an adapter with `boundary` and `mount`
- catalog/version metadata matching the scene

Minimal shape:

```ts
export const implementedCatalog = defineCatalog({
  catalog,
  themes,
  context,
  items,
  adapter,
});
```

## Defining an item

Each item has a controller and a view.

`controller.ts` owns model and lifecycle behavior:

```ts
export const controller = defineItemController<Props, State, Actions>({
  model: {
    actions(state) {
      return {
        increment() {
          state.count += 1;
        },
      };
    },
  },
  lifecycle: {},
});
```

`index.tsx` owns the framework view. The view factory takes an options object with `controller`, so props, state, actions, and context are inferred from the controller while leaving room for future options:

```tsx
export const implemented = defineItem({ controller })<Slots>(({ props, state, actions }) => {
  return <button onClick={() => actions.increment()}>{state.count}</button>;
});
```

## Starting a scene runtime

Runtime code wires a root element, coordinator, and API client into a scene runtime:

```ts
const runtime = createSceneRuntime({ root, coordinator, api });
const dispose = runtime.start();
```

The runtime resolves the implementation for the active scene, creates runtime context values, composes the scene root through the implementation adapter, and commits the resulting framework view.

## Source layout

```txt
catalogComposer/
  contracts/        implementation-facing define helpers and type contracts
    preact/         Preact-bound adapter and view contract helpers
  composer/         scene item tree -> framework-native view
  model/            state/action model primitive
  runtime/          scene runtime orchestration
  utils/            small shared helpers
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for internal ownership boundaries and cleanup direction.
