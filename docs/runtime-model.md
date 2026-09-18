# Runtime model

Status: Draft

This document defines working vocabulary for moving from CatalogSpec contracts and future SceneSpec documents into running software.

The boundaries are intentionally draft. They should guide discussion without locking this repository into a specific framework or runtime architecture.

## Layers

```txt
CatalogSpec      implementation-independent domain contract
SceneSpec        concrete scene composition and values
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

A runtime is the environment that mounts and orchestrates a scene using a catalog and an implementation.

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

It may include abstract documentation, schemas, validators, ADRs, and examples. It should avoid framework-specific runtime code unless explicitly introduced as a separate example or package.

Framework-specific runtimes are expected to live in downstream repositories or implementation-specific packages.

## Open questions

- What should an implementation manifest be called?
- Should implementation coverage be validated by this CLI or by runtime-specific tools?
- How should action handlers be declared without coupling to a framework?
- How much layout should SceneSpec own?
- How should runtimes expose scene inspection to agents?
- Where should generated implementation code live relative to catalog contracts?
