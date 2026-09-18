# SceneSpec

Status: Planned

SceneSpec is the planned companion to CatalogSpec for describing concrete scene instances composed from catalog items.

CatalogSpec defines what a catalog makes possible. SceneSpec will define what exists in one scene.

```txt
CatalogSpec -> SceneSpec -> runtime -> mounted scene
```

## Purpose

A scene should be a JSON document that an agent, application, test fixture, or runtime can use to describe a concrete composition of catalog items.

A scene may answer:

- Which catalog is this scene based on?
- Which theme is selected?
- What catalog-level state values are available?
- Which item instances appear in the scene?
- What props and initial item state does each item receive?
- How are slots filled?
- Which actions/controllers are wired?
- What metadata helps agents inspect, update, or debug the scene?

## Relationship to CatalogSpec

SceneSpec should depend on CatalogSpec rather than duplicate it.

A scene should reference catalog-defined items, props, state fields, slots, actions, events, and themes. The scene should not redefine the catalog contract.

Working model:

```txt
CatalogSpec defines item and catalog interfaces.
SceneSpec provides concrete values and composition.
Runtime validates and mounts the scene.
```

## Possible shape

This is illustrative only. It is not yet a committed schema.

```json
{
  "version": 1,
  "catalog": "commerce",
  "theme": "light",
  "state": {
    "isLoggedIn": true,
    "market": "US"
  },
  "root": {
    "key": "featured-product",
    "item": "ProductCard",
    "props": {
      "sku": "sku_123",
      "name": "Trail Jacket",
      "price": 128,
      "currency": "USD"
    },
    "state": {
      "quantity": 1
    },
    "slots": {
      "badge": [{ "type": "text", "text": "New" }]
    }
  }
}
```

## Expected concerns

SceneSpec may need to define or clarify:

- item tree/composition model
- item instance identity and keys
- catalog state values vs item-local state values
- theme selection
- slot content model
- references across catalogs
- action wiring and controller model
- event routing
- validation against catalog contracts
- partial scene updates
- agent-readable inspection metadata

## Non-goals for now

SceneSpec is not currently implemented. This repository does not yet provide:

- a SceneSpec JSON schema
- a scene validator
- a scene renderer
- a controller/action runtime
- layout rules
- framework-specific scene bindings

Those may be added later after the catalog contract has stabilized.
