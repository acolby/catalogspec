# CatalogSpec

CatalogSpec is a specification family for describing domain UI catalogs, composing scenes from those catalogs, and mounting those scenes in implementation-specific runtimes.

The active core today is the catalog contract: an implementation-independent description of a domain, its shared context, theme contract, renderable items, actions, events, and requirements.

This repository is not a central catalog registry. It defines the structure that catalogs, scenes, implementations, runtimes, and harnesses should follow so humans and agents can work from stable contracts.

## Conceptual stack

```txt
CatalogSpec      defines what a domain catalog makes possible
SceneSpec        defines a concrete scene composed from a catalog
Implementation  fulfills catalog items for a specific platform/framework
Runtime         mounts and orchestrates scenes using implementations
Harness         provides development, test, preview, and agent feedback loops
```

## Status

| Area | Status | Description |
|---|---|---|
| CatalogSpec | Active | Catalog directory structure, JSON schemas, reference example, and validation CLI exist. |
| SceneSpec | Planned | Future JSON shape for concrete scene instances composed from catalogs. |
| Implementation model | Draft | Vocabulary and guidance for framework-specific fulfillment of catalogs. |
| Runtime model | Draft | Vocabulary and guidance for environments that mount scenes. |
| Harness model | Draft | Vocabulary and guidance for dev/test/preview shells around runtimes. |

The current repository intentionally favors specification and guidance over framework-specific implementation code.

## CatalogSpec

A catalog is a durable domain contract, not a component library implementation. It defines:

- shared domain props/configuration
- shared domain/session state shape
- domain-level actions
- theme token contracts and concrete themes
- renderable item interfaces
- item props, state, slots, actions, and events
- human-readable behavioral requirements

A CatalogSpec-compatible catalog commonly uses this structure in downstream repos:

```txt
/catalogs/[catalogId]/
  catalog.json
  requirements.md
  theme.json
  /themes/*.json
  /items/[ItemName]/item.json
  /items/[ItemName]/requirements.md
```

This spec repo stores its reference catalog under `/examples` to avoid implying that this repository is where all catalogs should live.

## SceneSpec

SceneSpec is planned. It will describe concrete scene instances composed from a CatalogSpec catalog.

A future scene may define:

- which catalog it uses
- which theme is selected
- concrete catalog state values
- item instances and composition
- item props and initial item state
- slot contents
- action/controller wiring
- metadata useful to agents and runtimes

Short version:

```txt
CatalogSpec defines what can exist.
SceneSpec defines what does exist in one scene.
```

See [SceneSpec](./docs/scene-spec.md).

## Implementations, runtimes, and harnesses

CatalogSpec does not prescribe React, Vue, SwiftUI, Flutter, server-rendered HTML, native UI, generated UI, or any other implementation target.

The working distinction is:

- **Implementation**: framework/platform-specific code that fulfills catalog items.
- **Runtime**: an environment that loads catalogs/scenes, provides state/theme/actions, maps items to implementations, and mounts the scene.
- **Harness**: a dev/test/preview/agent shell around a runtime.

These boundaries are still being refined. See [Runtime model](./docs/runtime-model.md).

## Reference example

This repository includes a small commerce catalog as a reference example:

```txt
/examples/commerce/
  catalog.json
  requirements.md
  theme.json
  /themes/light.json
  /themes/dark.json
  /items/ProductCard/item.json
  /items/ProductCard/requirements.md
```

## Validation CLI

The nested CLI validates CatalogSpec conformance without turning the spec root into a Node package.

```bash
cd cli
npm install
npm run build
node dist/cli.js validate ../examples/commerce
```

Agent-friendly JSON output:

```bash
node dist/cli.js validate ../examples/commerce --json
```

The CLI validates structure and contracts. It does not render catalogs or provide framework bindings.

## Documentation

- [Concepts](./docs/concepts.md)
- [Catalog interface contract](./docs/interface.md)
- [Requirements documents](./docs/requirements.md)
- [SceneSpec](./docs/scene-spec.md)
- [Runtime model](./docs/runtime-model.md)
- [ADR 0001: Catalog-level shared state](./docs/adrs/0001-catalog-level-shared-state.md)

## Reference files

- [Commerce catalog](./examples/commerce/catalog.json)
- [Commerce requirements](./examples/commerce/requirements.md)
- [ProductCard item](./examples/commerce/items/ProductCard/item.json)
