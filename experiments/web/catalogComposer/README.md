# Catalog Composer

Status: experimental / non-normative

Catalog Composer is the implementation-facing composition utility for the web experiment. It helps a catalog implementation declare items, contexts, models, lifecycle hooks, themes, and a framework adapter, then composes SceneSpec-style item trees into framework-native view values.

This folder currently also contains the experimental **scene runtime** entrypoint. The runtime consumes Catalog Composer, connects it to the coordinator/API environment, and starts rendering a scene into a host element.

## Public interface

Catalog implementations consume the top-level package only:

```ts
import {
  defineAdapter,
  defineCatalog,
  defineContext,
  defineItem,
  type ComposeItemView,
  type ComposeItemLifecycle,
  type ModelDefinition,
} from "../../catalogComposer";
```

Runtime code creates a scene runtime through the same public entrypoint:

```ts
import { createSceneRuntime } from "../../catalogComposer";
```

## What an implementation provides

A compatible implementation provides:

- an adapter with `boundary` and `mount`
- implemented catalog items
- optional named contexts
- concrete theme tokens
- catalog/version metadata matching the scene

Minimal shape:

```ts
export const adapter = defineAdapter<TView>({
  boundary({ key, render }) {
    return frameworkBoundary(key, render);
  },

  mount(root, view) {
    frameworkMount(view, root);
  },
});

export const implementedCatalog = defineCatalog({
  catalog,
  themes,
  context,
  items,
  adapter,
});
```

## Defining an item

Items are model-backed. The item view receives explicit inputs: item identity, props, readonly model state, bound actions, slots, emit, and runtime context.

```ts
export const model = {
  actions(state) {
    return {
      increment() {
        state.count += 1;
      },
    };
  },
} satisfies ModelDefinition<State, Actions>;

export const view: ComposeItemView<TView, Props, State, Actions, Slots, Context> = ({
  props,
  state,
  actions,
  slots,
  context,
}) => {
  return renderSomething(props, state, actions, slots, context);
};

export const implemented = defineItem<TView, Context>()({
  model,
  lifecycle: {},
  view,
});
```

## Defining a context

Contexts expose shared runtime capabilities to item views, such as `context.scene` or `context.theme`.

```ts
export const scene = defineContext<State, Actions>({
  model,
  lifecycle,
});
```

Item views consume them through `context`:

```ts
context.theme.state.tokens;
context.scene.actions.login({ provider: "demo" });
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
  index.ts          public exports
  README.md         consumer-facing interface
  ARCHITECTURE.md   internal architecture and data flow

  contracts/        implementation-facing define helpers and type contracts
  composer/         scene item tree -> framework-native view
  model/            state/action model primitive
  runtime/          scene runtime orchestration
  utils/            small shared helpers
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for internal ownership boundaries and cleanup direction.
