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

## Identity

Catalog identity comes from `catalog.json`:

```json
{
  "id": "commerce"
}
```

Item identity is derived from path, not from an `id` field inside `item.json`.

```txt
catalogId + ItemName
```

For cross-catalog references:

```txt
catalogId/ItemName
```

Item names use PascalCase and match their directory names:

```txt
/items/ProductCard/item.json
```

The item document does not repeat its own ID. Human-readable labels use `title`.

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
| `props` | Stable configuration or environment values supplied to the catalog |
| `state` | Shared domain/session context available to catalog items |
| `actions` | Domain-level functions available across the catalog |
| `themes` | Available theme instances conforming to `theme.json` |
| `items` | PascalCase item names available in the catalog |

Catalog state defines shared context shape, not storage or state-management mechanics. See [Architecture decision records](./adrs/README.md).

## Item contract

An item is a renderable unit in a catalog. It may map to a component, layout, primitive, card, chart, workflow panel, or domain object view.

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

## Field definitions

Catalog and item surfaces use lightweight field definitions. They are intended to be readable by humans and agents, not to replace full JSON Schema.

A field definition may include:

- `type`: `string`, `number`, `integer`, `boolean`, `object`, `array`, or `any`
- `description`
- `required`
- `default`
- `enum`
- `example`

Example:

```json
{
  "sku": {
    "type": "string",
    "description": "Stable product identifier.",
    "required": true
  },
  "quantity": {
    "type": "integer",
    "description": "Selected quantity.",
    "default": 1
  }
}
```

## Props and state

`props` are data/configuration provided from outside the item.

`state` is mutable JSON data owned by the item or provided as initial scene state. Item state is distinct from catalog-level state:

- catalog `state` describes shared domain/session context
- item `state` describes local item state

CatalogSpec defines state shape. It does not prescribe where state lives or how it is updated.

## Slots

Slots are named composition points for text, raw content, or other catalog item instances.

```json
{
  "badge": {
    "title": "Badge",
    "description": "Small label rendered near the product title.",
    "accepts": ["text", "item"],
    "multiple": false,
    "required": false
  }
}
```

The full scene-level composition model belongs to future SceneSpec work.

## Actions and events

Actions are callable intents exposed by a catalog or item. CatalogSpec declares that an action exists and what arguments it accepts; it does not declare the handler.

```json
{
  "addToCart": {
    "title": "Add to cart",
    "description": "Adds this product to the active cart.",
    "props": {
      "sku": { "type": "string", "required": true },
      "quantity": { "type": "integer", "default": 1 }
    }
  }
}
```

Events are typed signals emitted by an item.

```json
{
  "selected": {
    "title": "Selected",
    "description": "Emitted when the product card is selected.",
    "props": {
      "sku": { "type": "string", "required": true }
    }
  }
}
```

## Theme contract

`theme.json` defines the shape of the theme token object. Concrete themes in `/themes/*.json` conform to that shape.

```json
{
  "version": 1,
  "description": "Theme token contract for commerce catalog items.",
  "tokens": {
    "color": {
      "background": { "type": "string" },
      "text": { "type": "string" },
      "accent": { "type": "string" }
    }
  }
}
```

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

A requirements document should be explicit, implementation-neutral, testable where possible, and aligned with `catalog.json` or `item.json`.

Suggested item structure:

```md
# ProductCard Requirements

## Purpose

## Functional requirements

## Props requirements

## State requirements

## Slot requirements

## Action requirements

## Event requirements

## Accessibility requirements

## Edge cases

## Non-goals
```

## Validation

The CLI validates catalog structure, JSON syntax, schema conformance, item/theme references, item naming, required requirements files, and theme token conformance.

```bash
cd cli
npm run validate
```

## Reference example

See the [reference commerce catalog](../examples/commerce/catalog.json).
