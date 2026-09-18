# Concepts

This document defines the vocabulary used across CatalogSpec, planned SceneSpec work, implementations, and runtimes.

The motivating use case is session-persistent agent UI: an AI agent should be able to create, update, and operate a structured UI scene alongside a conversation without generating framework-specific code.

## CatalogSpec

CatalogSpec is the implementation-independent catalog contract. It defines the trusted vocabulary of UI/domain elements an agent may use when creating or updating a scene.

A catalog defines a coherent domain of shared props, shared state, domain actions, themes, items, and requirements.

A catalog answers:

- What domain does this catalog represent?
- What shared props/configuration are available?
- What shared domain/session state exists?
- What domain-level actions can be invoked?
- What theme token contract and concrete themes are available?
- What renderable items exist?
- What props, state, slots, actions, and events do those items expose?
- What behavior must all implementations preserve?

## Catalog

A catalog is a domain contract, not a framework implementation.

A catalog may live in any repository. CatalogSpec-compatible downstream repositories commonly place catalogs under:

```txt
/catalogs/[catalogId]/
```

This specification repository keeps reference catalogs under `/examples`.

## Catalog interface

A catalog may expose:

- `props`: stable configuration or environment values, such as locale or market
- `state`: shared domain/session state, such as current user, login status, account type, or feature flags
- `actions`: domain-level functions, such as sign-in, navigation, or cart operations
- `themes`: concrete theme instances that conform to the catalog `theme.json` contract
- `items`: PascalCase item names available in the catalog

Catalog state is shared context. Items may rely on it without requiring every item instance to receive the same values through item props. See [Architecture decision records](./adrs/README.md).

## Catalog item

A catalog item is a renderable unit. It may map to a component, layout, primitive, chart, card, workflow panel, or domain object view.

Each item has:

- identity derived from `catalogId + ItemName`
- metadata
- props
- item-local state
- optional slots / child item regions
- actions
- events
- requirements

Item names are PascalCase directory names. The item document does not repeat its own ID.

## Requirements documents

Requirements documents are human- and LLM-readable behavioral contracts.

They explain what the JSON interface means in practice, including behavior, accessibility expectations, edge cases, and non-goals.

## Theme contract

Each catalog owns a `theme.json` token contract and one or more concrete theme instances under `/themes/*.json`.

The catalog defines token shape. Implementations decide how tokens are consumed, transformed, compiled, or injected.

## SceneSpec

SceneSpec is planned.

A scene is expected to be a concrete, session-persistent composition of catalog items and values. It may specify selected theme, catalog state values, item instances, props, item-local state, slots, and action/controller wiring.

A scene is not a one-off embedded chat artifact. It is intended to live alongside the conversation and evolve as the session evolves.

Short version:

```txt
CatalogSpec defines what an agent is allowed to use.
SceneSpec defines what the agent has created for this session.
```

See [SceneSpec](./scene-spec.md).

## Implementation

An implementation is framework- or platform-specific code that fulfills a catalog.

Examples:

- React components for commerce catalog items
- SwiftUI views for commerce catalog items
- server-rendered HTML templates for commerce catalog items

Implementations should conform to the catalog contract, but they are not the source of truth.

## Runtime

A runtime mounts and orchestrates scenes using a catalog and an implementation.

A runtime may load catalogs, validate scenes, provide state/theme/actions, dispatch events, and map catalog items to implementation code.

See [Runtime model](./runtime-model.md).

## Meta-catalog

A meta-catalog is an index of catalogs. It can help a runtime, tool, or LLM discover available domains and catalog capabilities.

Examples:

- `commerce`: products, carts, orders, recommendations
- `infra`: services, metrics, traces, incidents, deploys
- `support`: tickets, customers, macros, escalations
