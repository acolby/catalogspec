# Catalog interface contract

Status: Active

This is the canonical interface contract for CatalogSpec. It defines two related interface layers:

- catalog interfaces, which describe shared domain context and domain-level actions
- item interfaces, which describe the boundary of a renderable item

An item interface has five surfaces:

- `props`: data given to the item
- `state`: internal mutable data the item may manage
- `slots`: child/content regions the item accepts
- `actions`: functions that can be invoked on the item
- `events`: signals emitted by the item

## Identity

Item identity is derived from its path, not from an `id` or `name` field inside the item.

```txt
catalogId + ItemName
```

For cross-catalog references:

```txt
catalogId/ItemName
```

Item names use PascalCase and should match their directory names. Human-readable labels should use `title`:

```txt
/catalogs/commerce/items/ProductCard/item.json
/catalogs/commerce/items/CartSummary/item.json
```

The item document does not repeat its own ID. Item contracts are kept inline in `item.json`.

Items may also include a sibling `requirements.md` file for human- and LLM-readable functional requirements.

## `catalog.json`

```json
{
  "version": 1,
  "id": "commerce",
  "name": "Commerce",
  "description": "Composable commerce UI and actions.",
  "labels": ["shop", "products"],
  "props": {
    "locale": {
      "type": "string",
      "description": "Current locale for formatting copy, dates, and numbers."
    },
    "market": {
      "type": "string",
      "description": "Commerce market or region."
    }
  },
  "state": {
    "currentUser": {
      "type": "object",
      "description": "The currently authenticated user, if one exists."
    },
    "isLoggedIn": {
      "type": "boolean",
      "description": "Whether there is an authenticated user."
    },
    "featureFlags": {
      "type": "object",
      "description": "Feature flags available to commerce items."
    }
  },
  "actions": {
    "signIn": {
      "title": "Sign in",
      "description": "Starts the sign-in flow for the current user.",
      "props": {}
    }
  },
  "themes": {
    "default": "light",
    "available": ["light", "dark"]
  },
  "items": ["ProductCard", "CartSummary"],
  "createdAt": "2026-09-17T00:00:00.000Z",
  "updatedAt": "2026-09-17T00:00:00.000Z"
}
```

## Catalog interface

A catalog represents a domain, not just a bag of components. Catalog-level interface fields describe shared context available across scenes and items in that domain.

| Surface | Direction | Meaning |
|---|---:|---|
| `props` | input | Stable configuration/environment values supplied to the catalog |
| `state` | shared context | Shared domain/session state available to catalog items, generally read-only from an item perspective |
| `actions` | callable | Domain-level functions available across the catalog |
| `themes` | design | Available theme instances that conform to `theme.json` |
| `items` | registry | PascalCase item names provided by the catalog |

Catalog-level `props`, `state`, and `actions` use the same field definition style as item-level surfaces. Catalog events are intentionally omitted; item events remain the primary signal surface.

## Theme contract

Each catalog owns a top-level `theme.json` file that defines the shape of theme tokens available to items.

```txt
/catalogs/commerce/theme.json
/catalogs/commerce/themes/light.json
/catalogs/commerce/themes/dark.json
```

`theme.json` defines token names and descriptions. Files under `themes/` provide concrete values for those tokens.

```json
{
  "version": 1,
  "description": "Theme token contract for commerce catalog items.",
  "tokens": {
    "color": {
      "background": { "type": "string" },
      "surface": { "type": "string" },
      "text": { "type": "string" },
      "accent": { "type": "string" }
    },
    "space": {
      "sm": { "type": "string" },
      "md": { "type": "string" }
    }
  }
}
```

A concrete theme conforms to that token shape:

```json
{
  "version": 1,
  "name": "Light",
  "tokens": {
    "color": {
      "background": "#ffffff",
      "surface": "#f8fafc",
      "text": "#111827",
      "accent": "#2563eb"
    },
    "space": {
      "sm": "8px",
      "md": "16px"
    }
  }
}
```

The catalog does not prescribe whether themes are injected at runtime, compiled at build time, transformed into CSS variables, or mapped into native style systems.

## `item.json`

```json
{
  "version": 1,
  "title": "Product Card",
  "description": "Displays a product with primary purchase actions.",
  "kind": "component",
  "props": {},
  "state": {},
  "slots": {},
  "actions": {},
  "events": {}
}
```

## Item interface

A catalog item should answer five questions:

| Surface | Direction | Meaning |
|---|---:|---|
| `props` | input | What data/configuration does this item take? |
| `state` | internal | What mutable JSON state can this item manage? |
| `slots` | input/composition | What children/components can be injected? |
| `actions` | callable | What functions can be invoked on this item? |
| `events` | output | What signals can this item emit? |

## Props

Props are documented fields, not necessarily full JSON Schema. They should be easy for humans and LLMs to read.

```json
{
  "sku": {
    "type": "string",
    "description": "Stable product identifier.",
    "required": true
  },
  "name": {
    "type": "string",
    "description": "Display name.",
    "required": true
  },
  "price": {
    "type": "number",
    "description": "Price amount in the minor-independent currency unit.",
    "required": true
  },
  "currency": {
    "type": "string",
    "description": "ISO 4217 currency code.",
    "required": true
  }
}
```

A prop definition may include:

- `type`: `string`, `number`, `integer`, `boolean`, `object`, `array`, or `any`
- `description`
- `required`
- `default`
- `enum`
- `example`

## State

State describes the internal mutable JSON object an item may manage. It is part of the item boundary because examples, tests, tooling, and inspection surfaces may need to understand or initialize it.

State uses the same field definition shape as props.

```json
{
  "quantity": {
    "type": "integer",
    "description": "Currently selected quantity.",
    "default": 1
  },
  "detailsOpen": {
    "type": "boolean",
    "description": "Whether the product details area is expanded.",
    "default": false
  }
}
```

State is not the same as props:

- `props` are given to the item by the outside world.
- `state` is owned and changed by the item over time.

## Slots

Slots are named insertion points for text, raw markup, or other catalog item instances.

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

## Actions

Actions are functions exposed by the item. They describe callable intent and the arguments the function accepts. They do not declare handlers. The host app, runtime, or binding decides how the function is implemented.

```json
{
  "addToCart": {
    "title": "Add to cart",
    "description": "Adds this product to the active cart.",
    "props": {
      "sku": {
        "type": "string",
        "required": true,
        "description": "Product SKU to add. Usually copied from item props.sku."
      },
      "quantity": {
        "type": "integer",
        "required": true,
        "default": 1
      }
    },
    "returns": {
      "cartId": { "type": "string" },
      "lineCount": { "type": "integer" }
    }
  }
}
```

Think of an action as:

```ts
addToCart(props: { sku: string; quantity: number }): Promise<{ cartId: string; lineCount: number }>
```

The catalog defines that this function exists. It does not define where the function lives.

## Events

Events are typed signals emitted by the item.

```json
{
  "selected": {
    "title": "Selected",
    "description": "Emitted when the product card is selected.",
    "props": {
      "sku": {
        "type": "string",
        "required": true
      }
    }
  },
  "actionCompleted": {
    "title": "Action completed",
    "description": "Emitted after an action completes.",
    "props": {
      "action": { "type": "string", "required": true },
      "result": { "type": "object" }
    }
  }
}
```

## Item instance document

This early item instance shape shows the kind of JSON an LLM or app should eventually be able to emit. Future SceneSpec work will define concrete scene-level composition more completely.

```json
{
  "version": 1,
  "catalog": "commerce",
  "item": "ProductCard",
  "key": "sku_123",
  "props": {
    "sku": "sku_123",
    "name": "Trail Jacket",
    "price": 128,
    "currency": "USD"
  },
  "state": {
    "quantity": 1,
    "detailsOpen": false
  },
  "slots": {
    "badge": [{ "type": "text", "text": "New" }]
  },
  "actions": {
    "primary": {
      "action": "addToCart",
      "props": { "sku": "sku_123", "quantity": 1 }
    }
  }
}
```

## Slot content

Catalog instances can embed other catalog item instances.

```json
{
  "type": "item",
  "catalog": "commerce",
  "item": "Price",
  "props": { "amount": 128, "currency": "USD" }
}
```

## Runtime relationship

A runtime should read catalog and item interfaces, validate scene or item instance data against them, expose declared actions, route events, and preserve enough trace data for debugging agent-produced UIs.

CatalogSpec does not prescribe a runtime architecture. See [Runtime model](./runtime-model.md).
