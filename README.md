# CatalogSpec

CatalogSpec is a specification for structuring implementation-independent UI catalog contracts.

It defines a directory structure, JSON contract shape, requirements-document convention, and theme convention that humans, applications, and LLMs can use to author catalogs for dynamic scene composition.

This repository is not intended to be the central home for every catalog. A catalog may live in an application repo, design-system repo, domain repo, standalone catalog repo, or implementation repo. This repository defines how those catalogs should be structured.

A catalog is not a component library implementation. A catalog is the durable domain contract that sits above implementation. It defines shared domain context, theme contracts, renderable item interfaces, and functional requirements that every implementation must respect.

Implementations are downstream instantiations. They may be React, Vue, Svelte, SwiftUI, Flutter, server-rendered HTML, native UI, generated UI, or something else entirely.

CatalogSpec defines what a catalog makes possible. A future SceneSpec can define concrete scene instances composed from a catalog.

## Core position

The important maintained artifact in any CatalogSpec-compatible project is this:

```txt
/catalogs/[catalogId]/
  catalog.json
  requirements.md
  theme.json
  /themes/*.json
  /items/[ItemName]/item.json
  /items/[ItemName]/requirements.md
```

The implementation is a technical detail.

The catalog captures the information the business, product, design system, and AI generation layer care about:

- what domain this catalog represents
- what shared props/configuration are available
- what shared state exists across the domain
- what domain-level actions exist
- what themes and design tokens are available
- what items can be rendered
- what each item accepts, manages, exposes, emits, and requires

## Locked conventions

These conventions define the CatalogSpec shape. Use them when creating or maintaining a catalog in this repository or any downstream repository:

- Catalogs live under `/catalogs/[catalogId]/`.
- Each catalog is a domain contract, not an implementation package.
- Each catalog owns `catalog.json`, `requirements.md`, `theme.json`, `/themes`, and `/items`.
- Item names are PascalCase directory names, e.g. `ProductCard`.
- Item documents do not repeat their own ID.
- Item contracts stay inline in `item.json`.
- Behavioral detail belongs in `requirements.md`.
- Theme token shape belongs in `theme.json`.
- Concrete themes live in `/themes/*.json`.
- Implementation code is downstream and must not become the source of truth.

## Reference repository structure

This repository includes a small commerce catalog as a reference example of the specification.

```txt
/catalogs/
  /commerce/
    catalog.json          # catalog/domain interface
    requirements.md       # catalog/domain behavioral requirements
    theme.json            # theme token contract

    /themes/
      light.json          # concrete theme instance
      dark.json           # concrete theme instance

    /items/
      /ProductCard/
        item.json         # item interface contract
        requirements.md   # item behavioral requirements

/docs/
  concepts.md
  interface.md
  requirements.md

/schemas/
  catalog.schema.json
  instance.schema.json
  theme.schema.json
  theme-instance.schema.json
```

## Catalog contract

A catalog represents a domain. It moves forward as a unit.

`catalog.json` defines:

```json
{
  "version": 1,
  "id": "commerce",
  "name": "Commerce",
  "description": "A catalog for product discovery and cart-oriented commerce UI.",
  "props": {},
  "state": {},
  "actions": {},
  "themes": {
    "default": "light",
    "available": ["light", "dark"]
  },
  "items": ["ProductCard"]
}
```

Catalog-level surfaces:

| Surface | Meaning |
|---|---|
| `props` | Shared configuration/environment values supplied to the catalog |
| `state` | Shared domain/session state available to catalog items |
| `actions` | Domain-level functions available across the catalog |
| `themes` | Available theme instances conforming to `theme.json` |
| `items` | PascalCase item names available in the catalog |

Catalog state is shared context. Items may rely on it without requiring every instance to repeat the same values through item props.

## Theme contract

`theme.json` defines the shape of the theme token object. Concrete themes in `/themes/*.json` conform to that shape.

```txt
/catalogs/commerce/theme.json
/catalogs/commerce/themes/light.json
/catalogs/commerce/themes/dark.json
```

Themes may be injected at runtime, compiled at build time, transformed into CSS variables, mapped to native styles, or consumed directly. The catalog does not prescribe the implementation.

## Item contract

Items are named by their PascalCase directory name. The item document does not repeat an `id`.

```txt
/catalogs/commerce/items/ProductCard/item.json
```

An item defines five interface surfaces:

```json
{
  "version": 1,
  "title": "Product Card",
  "description": "Displays a product summary and exposes purchase-oriented interactions.",
  "kind": "component",
  "props": {},
  "state": {},
  "slots": {},
  "actions": {},
  "events": {}
}
```

| Surface | Meaning |
|---|---|
| `props` | External data/configuration given to the item |
| `state` | Internal mutable JSON state the item may manage |
| `slots` | Named composition points for child content/items |
| `actions` | Callable functions exposed by the item |
| `events` | Signals emitted by the item |

## Requirements documents

`requirements.md` files are human- and LLM-readable behavioral contracts. They are intentionally not the primary machine-readable interface.

Use them to document:

- required behavior
- accessibility expectations
- edge cases
- state semantics
- action semantics
- event semantics
- non-goals

The JSON files define the boundary. The requirements files define what that boundary means in practice.

## Validation CLI

This repository includes a nested CLI package for validating catalog conformance without turning the specification root into a Node package.

```bash
cd cli
npm install
npm run build
node dist/cli.js validate ../catalogs/commerce
```

Agent-friendly JSON output:

```bash
node dist/cli.js validate ../catalogs/commerce --json
```

The CLI is specification tooling. It validates structure and contracts; it does not render catalogs or provide framework bindings.

## Implementation boundary

This repository defines the catalog specification and validation tooling, not implementations.

A renderer, binding, or generated application may choose how to:

- render items
- manage state
- dispatch actions
- listen to events
- inject catalog state
- compile or apply themes
- validate examples
- persist data

Those choices belong to an implementation layer. They must conform to the catalog, but they are not the catalog.

## Start here

- [Concepts](./docs/concepts.md)
- [Interface contract](./docs/interface.md)
- [Requirements documents](./docs/requirements.md)
- [Commerce catalog](./catalogs/commerce/catalog.json)
- [Commerce requirements](./catalogs/commerce/requirements.md)
- [ProductCard item](./catalogs/commerce/items/ProductCard/item.json)
