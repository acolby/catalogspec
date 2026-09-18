# CatalogSpec

CatalogSpec is a contract model for agent-created UI scenes: persistent, structured interfaces that live alongside a conversation and evolve as the session evolves.

The goal is to let an AI agent create and update UI by speaking JSON, without generating framework-specific code. The JSON stays bounded by strict contracts. Implementations stay decoupled and trusted.

## Vision

Agents should be able to create a scene for a conversation, keep that scene alive across turns, and update it as the conversation changes.

That requires a shared language between three things:

- the **agent**, which creates and updates the scene
- the **catalog**, which defines what the agent is allowed to use
- the **implementation**, which renders and executes the scene in a real runtime

CatalogSpec is the contract layer that keeps those pieces coherent.

## Architecture

GitHub supports Mermaid diagrams in Markdown, so the architecture can be shown directly in this README.

```mermaid
flowchart TD
  Agent[Agent session<br/>conversation, user intent, tool calls]
  Scene[SceneSpec<br/>current persistent UI scene for the session]
  Catalog[CatalogSpec<br/>trusted vocabulary of items, state, themes, actions, and events]
  Implementation[Implementation<br/>framework/platform-specific fulfillment of catalog items]
  Runtime[Runtime<br/>composes and maintains the live UI]

  Agent --> Scene
  Scene -->|speaks| Catalog
  Implementation -->|fulfills| Catalog
  Runtime -->|validates and mounts| Scene
  Runtime -->|uses contract| Catalog
  Runtime -->|uses implementation| Implementation
```

Short version:

```txt
SceneSpec speaks CatalogSpec.
Implementation fulfills CatalogSpec.
Runtime composes the live UI from SceneSpec + CatalogSpec + Implementation.
```

The runtime is not the contract and not the implementation. It is the layer that reconciles the scene with the catalog contract and the available implementation to produce a live, updateable UI.

## Layers

### CatalogSpec

Status: Active

CatalogSpec defines the language bridge between agent-authored scenes and framework-specific implementations.

A catalog describes a domain's available UI items, shared state shape, theme contract, actions, events, and behavioral requirements. It does not prescribe React, SwiftUI, Flutter, HTML, or any other target.

See [CatalogSpec](./docs/catalog-spec.md).

### SceneSpec

Status: Planned

SceneSpec will define concrete scene instances composed from catalogs. A scene represents the UI an agent has created for a particular conversation or session.

See [SceneSpec](./docs/scene-spec.md).

### Implementations

Status: Draft

An implementation fulfills a catalog for a specific framework or platform. For example, a React implementation of a commerce catalog would provide React components for the catalog's items.

### Runtime

Status: Draft

A runtime composes and maintains the live UI from a scene, a catalog contract, and an available implementation. It validates scene data, provides state/theme/actions, mounts rendered items, applies updates, and routes events.

See [Runtime model](./docs/runtime-model.md).

## Current repository contents

```txt
/docs                  specification and design docs
/schemas               JSON Schemas for the active CatalogSpec layer
/examples/commerce     reference catalog example
/cli                   validation CLI for catalog conformance
```

This repository is not a central catalog registry. Reference catalogs live under `/examples`; downstream projects commonly keep their own catalogs under `/catalogs/[catalogId]/`.

## Validation CLI

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

## Start here

- [CatalogSpec](./docs/catalog-spec.md)
- [SceneSpec](./docs/scene-spec.md)
- [Runtime model](./docs/runtime-model.md)
- [Glossary](./docs/glossary.md)
- [Architecture decision records](./docs/adrs/README.md)
