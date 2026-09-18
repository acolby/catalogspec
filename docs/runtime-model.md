# Runtime model

Status: Draft / non-normative

This document defines working vocabulary for moving from CatalogSpec contracts and SceneSpec scene snapshots into running software.

The boundaries are intentionally draft. This document is design guidance only; it does not define conformance behavior. Runtime APIs, implementation manifests, action dispatch, event routing, and state ownership are not locked.

## Layers

```txt
CatalogSpec      implementation-independent domain contract
SceneSpec        concrete persisted scene snapshot protocol
Implementation  framework/platform-specific item fulfillment
Runtime         scene mounting and orchestration environment
```

## Implementation

An implementation is framework- or platform-specific code that fulfills a catalog contract.

Examples:

- React implementation of `ProductCard`
- SwiftUI implementation of `ProductCard`
- Flutter implementation of `ProductCard`
- server-rendered HTML implementation of `ProductCard`

An implementation should answer:

- Which catalog does it implement?
- Which catalog items are implemented?
- Which catalog themes are supported?
- How are catalog actions handled or delegated?
- How is catalog state consumed?
- Which catalog capabilities are unsupported?

A future implementation manifest may describe this mapping explicitly.

Illustrative only:

```json
{
  "version": 1,
  "catalog": "commerce",
  "target": "react",
  "items": {
    "ProductCard": "./items/ProductCard.tsx"
  },
  "theme": "./theme.ts",
  "actions": "./actions.ts",
  "state": "./state.ts"
}
```

## Runtime

A runtime is the environment that renders and maintains a concrete scene using a catalog and an implementation.

A runtime may be responsible for:

- loading catalog contracts
- loading or receiving scenes
- validating scene values against catalog contracts
- selecting a theme
- providing catalog state
- dispatching catalog and item actions
- routing item events
- resolving item implementations
- mounting/rendering the scene
- exposing inspection/debug data for agents and tests

The runtime is allowed to be opinionated. CatalogSpec does not require one runtime architecture.

## Relationship to this repository

This repository should remain specification-first.

It may include abstract documentation, schemas, validators, ADRs, and examples. Framework/runtime code should normally live in downstream repositories or implementation-specific packages.

If experimental runtime code is included here, it should live under an explicitly non-normative examples path such as `/examples/runtimes/...`. It must not be treated as CatalogSpec or SceneSpec conformance behavior.

## Open questions

- What should an implementation manifest be called?
- Should implementation coverage be validated by this CLI or by runtime-specific tools?
- How should action handlers be declared without coupling to a framework?
- How much layout should SceneSpec own?
- How should runtimes expose scene inspection to agents?
- Where should generated implementation code live relative to catalog contracts?
