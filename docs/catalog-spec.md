# CatalogSpec

Status: Active

CatalogSpec defines the contract vocabulary that connects agent-created scenes to framework-specific implementations.

A catalog says what an agent is allowed to use when building a scene, and what an implementation must fulfill to render that scene coherently.

## Purpose

CatalogSpec keeps generated UI bounded and implementation-independent.

It defines:

- domain-level props/configuration
- shared domain/session state shape
- domain-level actions
- theme token contracts and concrete themes
- renderable item interfaces
- item props, state, slots, actions, and events
- human-readable behavioral requirements

CatalogSpec does not define how UI is rendered, how state is stored, or which framework is used.

## Standard catalog structure

Downstream CatalogSpec-compatible projects commonly use:

```txt
/catalogs/[catalogId]/
  catalog.json
  requirements.md
  theme.json
  /themes/*.json
  /items/[ItemName]/item.json
  /items/[ItemName]/requirements.md
```

This specification repository keeps reference catalogs under `/examples` instead of `/catalogs` because it is not a catalog registry.

## Catalog contract

`catalog.json` defines the domain-level contract:

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

| Surface | Meaning |
|---|---|
| `props` | Shared configuration/environment values supplied to the catalog |
| `state` | Shared domain/session state available to catalog items |
| `actions` | Domain-level functions available across the catalog |
| `themes` | Available theme instances conforming to `theme.json` |
| `items` | PascalCase item names available in the catalog |

Catalog state defines shared context shape, not storage or state-management mechanics. See [ADR 0001](./adrs/0001-catalog-level-shared-state.md).

## Item contract

Items are named by their PascalCase directory name. The item document does not repeat its own ID.

```txt
/items/ProductCard/item.json
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

## Theme contract

`theme.json` defines the shape of the theme token object. Concrete themes in `/themes/*.json` conform to that shape.

Themes may be injected at runtime, compiled at build time, transformed into CSS variables, mapped to native styles, or consumed directly. The catalog does not prescribe the implementation.

## Requirements documents

`requirements.md` files are human- and LLM-readable behavioral contracts. They describe what the JSON boundary means in practice.

Use requirements documents for:

- required behavior
- accessibility expectations
- edge cases
- state semantics
- action semantics
- event semantics
- non-goals

## Validation

The CLI validates catalog structure, JSON syntax, schema conformance, item/theme references, item naming, required requirements files, and theme token conformance.

```bash
cd cli
npm run validate
```

## More detail

- [Catalog interface contract](./interface.md)
- [Requirements documents](./requirements.md)
- [Reference commerce catalog](../examples/commerce/catalog.json)
