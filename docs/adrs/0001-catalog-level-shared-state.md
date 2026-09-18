# ADR 0001: Catalog-level shared state

## Status

Accepted

## Context

CatalogSpec catalogs represent domains, not just component suites. Items in a catalog often need access to shared ambient context such as:

- current user
- authentication status
- account or organization context
- B2B/B2C mode
- active market or region
- permissions
- feature flags
- cart summary

Without a catalog-level state contract, this context would need to be handled in one of several weaker ways:

1. Repeated through item props on every item that might need it.
2. Left implicit in implementation-specific globals.
3. Defined only at the scene/runtime layer, leaving items without a clear contract for what shared context exists.
4. Described only in prose requirements, making it harder for agents and tooling to reason about.

CatalogSpec needs a way to describe shared domain/session context while remaining implementation-independent.

## Decision

Catalogs may define a top-level `state` object in `catalog.json`.

Catalog-level state defines the shape of shared domain/session context available to items in the catalog.

Catalog-level state does not prescribe:

- where state is stored
- who owns state updates
- how state is transported
- whether state is client-side, server-side, or both
- which state-management library is used
- whether state is injected at runtime, loaded from an API, derived from a session, or supplied by a scene

Catalog state centralizes the shared context shape, not the implementation mechanics.

## Consequences

### Positive

- Items can rely on a known shared context shape.
- Catalog authors can define domain/session context once instead of repeating it through item props.
- Agents can reason about ambient domain context when composing or modifying scenes.
- Implementations can validate or inspect expected shared context without reading framework-specific source code.
- Scenes or runtimes can provide concrete values for catalog state while still conforming to the catalog contract.

### Tradeoffs

- Catalog state may be mistaken for the complete application state model.
- Catalog authors must avoid putting item-local state into catalog state.
- Implementations still need to decide how shared state is stored, updated, injected, synchronized, and persisted.
- Catalog state shape changes can affect many items because the catalog moves forward as a domain unit.

## Guidance

Use catalog-level state for shared domain/session context that multiple items may reasonably need to know about.

Good examples:

- `currentUser`
- `isLoggedIn`
- `isB2B`
- `activeOrganization`
- `market`
- `permissions`
- `featureFlags`
- `cartSummary`

Do not use catalog-level state for:

- item-local UI state
- renderer-specific state
- framework internals
- transient implementation details
- component-private state
- values that only one item owns internally

Item-local mutable state belongs in the item's `item.json` under `state`.

Catalog-level state describes shared context shape. Item-level state describes per-item internal mutable state.

## Future relationship to scenes

A future SceneSpec may provide concrete values for catalog state when describing a rendered scene.

In that model:

```txt
CatalogSpec defines the catalog state shape.
SceneSpec provides concrete state values for a scene.
The runtime decides how those values are stored, updated, and injected.
```

This ADR does not require SceneSpec to exist. It only preserves the distinction between shared catalog state shape and runtime state implementation.
