# Agent Guidance

This repository defines CatalogSpec and related abstract guidance for future SceneSpec, implementation, and runtime layers.

Use it as the reference for creating and maintaining implementation-independent catalog contracts in downstream repositories. Do not treat this repository as the central registry or required home for all catalogs.

## Purpose

CatalogSpec specifies how to structure domain/UI catalog contracts so they can be consumed by humans, LLMs, renderers, tests, downstream application implementations, and future scene runtimes.

The durable artifacts in a CatalogSpec catalog are:

- catalog interfaces
- item interfaces
- requirements documents
- theme contracts
- concrete theme instances
- JSON schemas for those contracts

Implementations and runtimes are downstream instantiations. They may live in separate repositories, application repositories, or implementation-specific packages.

## Canonical catalog structure

When creating or modifying a catalog, use this structure:

```txt
/catalogs/[catalogId]/
  catalog.json          # catalog/domain interface
  requirements.md       # catalog/domain behavioral requirements
  theme.json            # theme token contract

  /themes/
    [themeName].json    # concrete theme instance

  /items/
    /[ItemName]/
      item.json         # item interface contract
      requirements.md   # item behavioral requirements
```

## Catalog rules

- A catalog represents a domain, not a framework implementation.
- `catalog.json` defines shared catalog props, named contexts, themes, and items.
- Catalog contexts are shared domain/session/environment capabilities available to items.
- Context actions are callable functions grouped under their named context.
- `theme.json` defines the shape of theme tokens.
- `/themes/*.json` files provide concrete theme values that conform to `theme.json`.
- `requirements.md` explains behavior, expectations, edge cases, and non-goals.
- A catalog may live in any repo; this specification defines the structure it should follow.

## Item rules

- Item names are PascalCase directory names, e.g. `ProductCard`.
- `item.json` must not repeat its own item ID.
- Human-readable labels use `title`.
- Item contracts stay inline in `item.json`.
- Item interfaces use these surfaces:
  - `props`: external data/configuration given to the item
  - `state`: internal mutable JSON state the item may manage
  - `slots`: named composition points
  - `actions`: callable item functions
  - `events`: emitted item signals
- Behavioral details belong in `requirements.md`, not in over-complicated JSON constraints.

## Implementation guidance

Do not add framework-specific implementations to a specification/catalog contract repo unless explicitly requested.

Framework-specific work includes:

- React components
- Preact components
- Lit components
- Vue components
- Svelte components
- native/mobile implementations
- CSS build systems
- bundlers
- application runtimes
- action dispatch frameworks
- state-management libraries

Those belong in downstream implementation repos or implementation-specific packages that consume the catalog contract.

## Good agent behavior

When working on a catalog:

1. Preserve the catalog directory structure.
2. Keep JSON focused on interface shape.
3. Put behavioral nuance in `requirements.md`.
4. Keep implementation details out of the contract unless explicitly requested.
5. Use `theme.json` for theme token shape and `/themes/*.json` for concrete theme values.
6. Keep item names PascalCase and derived from directory names.
7. Treat examples in this repo as reference examples, not as the only place catalogs may live.
8. Keep SceneSpec, runtime, and implementation docs clearly marked as planned or draft until they have schemas/tooling.

## Bias

Prefer small, stable, implementation-independent contracts.

The goal is to help agents and humans get their own catalogs right.
