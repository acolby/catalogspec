# Concepts

## Meta-catalog

A meta-catalog is an index of catalogs. It lets a runtime or LLM discover available regimes of UI and action semantics.

Examples:

- `commerce`: products, carts, orders, recommendations.
- `infra`: services, metrics, traces, incidents, deploys.
- `support`: tickets, customers, macros, escalations.

## Catalog

A catalog defines a coherent domain of shared props, shared state, domain actions, themes, items, policies, and examples.

A catalog answers:

- What shared props/configuration are available across the domain?
- What shared state is available across the domain?
- What domain-level action functions can be invoked?
- What theme token contract and concrete themes are available?
- What UI items exist?
- What props and slots do those items accept?
- What internal state can those items manage?
- What item-level action functions can be invoked?
- What item events can be emitted?
- What examples can an LLM copy or adapt?
- What runtime capabilities are required?

## Catalog interface

A catalog may expose:

- `props`: stable configuration or environment values, such as locale or market.
- `state`: shared domain/session state, such as current user, login status, account type, or feature flags.
- `actions`: domain-level functions, such as sign-in, navigation, or cart operations.
- `themes`: concrete theme instances that conform to the catalog `theme.json` contract.
- `items`: the PascalCase item names available in the catalog.

Catalog state is shared context. Items may rely on it without requiring every item instance to receive the same values through item props.

## Catalog item

A catalog item is a renderable unit. It may map to a component, layout, primitive, chart, card, workflow panel, or domain object view.

Each item has:

- identity: `catalogId + ItemName`, where `ItemName` is the PascalCase item directory name
- metadata
- props
- state
- optional slots / child item regions
- actions
- events
- examples
- runtime hints

## Instance document

An instance document is the JSON an LLM or app sends to a renderer.

```json
{
  "catalog": "commerce",
  "item": "ProductCard",
  "key": "product-123",
  "props": {
    "name": "Trail Jacket",
    "price": "$128"
  },
  "state": {
    "quantity": 1
  },
  "actions": {
    "primary": {
      "action": "addToCart",
      "props": { "sku": "product-123", "quantity": 1 }
    }
  }
}
```

## Actions

Actions are named functions that can be invoked from UI, an agent, or a runtime.

Actions should declare:

- `title`
- `description`
- `props`: the function arguments
- `returns`: optional return fields

Actions do not declare handlers. The catalog defines the callable surface; the host, runtime, or binding decides how calls are implemented.

## Bindings / runtimes

A binding translates the interface into a concrete runtime.

Potential bindings:

- `web`: React/Preact/Web Components renderer.
- `native`: mobile/native view renderer.
- `agent`: an LLM tool-call or chat-renderer surface.
- `server`: static or streaming HTML renderer.
