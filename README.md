# CatalogSpec

CatalogSpec is a contract model for agent-created UI scenes: persistent, structured interfaces that live alongside a conversation and evolve as the session evolves.

It lets an AI agent create and update a durable UI scene by speaking structured JSON instead of generating framework-specific code. Catalogs define the trusted vocabulary of available domain UI items, state, themes, actions, and events. Scenes instantiate that vocabulary for a particular session. Runtimes mount scenes using framework-specific implementations.

The active core today is the catalog contract: an implementation-independent description of a domain, its shared context, theme contract, renderable items, actions, events, and requirements.

This repository is not a central catalog registry. It defines the structure that catalogs, scenes, implementations, runtimes, and harnesses should follow so humans and agents can create session-persistent UI from stable contracts.

## Conceptual stack

```txt
CatalogSpec      defines the trusted UI/domain vocabulary an agent may use
SceneSpec        defines a concrete session scene composed from a catalog
Implementation  fulfills catalog items for a specific platform/framework
Runtime         mounts, updates, and orchestrates scenes using implementations
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

A catalog is a durable domain contract, not a component library implementation. It gives agents a bounded language for creating UI without inventing arbitrary components or code. It defines:

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

SceneSpec is planned. It will describe concrete, session-persistent scene instances composed from a CatalogSpec catalog.

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
CatalogSpec defines what an agent is allowed to use.
SceneSpec defines what the agent has created for this session.
Runtime keeps that scene mounted, updated, and interactive.
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
