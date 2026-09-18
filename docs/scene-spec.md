# SceneSpec

Status: Draft

SceneSpec defines the protocol for concrete, session-persistent UI scene documents.

A scene is the current UI instance an agent has created for a conversation or session. It is represented as JSON, persists across turns, and can be rendered by a runtime using an implementation of the referenced catalog.

SceneSpec is inspired by A2UI-style agent-to-UI protocols. Its distinction is that scenes are grounded in CatalogSpec contracts: the agent does not invent arbitrary UI code or arbitrary components. It creates a concrete scene from a bounded catalog vocabulary.

## Purpose

SceneSpec answers:

> What UI exists for this session right now?

CatalogSpec defines what an agent is allowed to use. SceneSpec defines the concrete scene the agent has created from that vocabulary.

```txt
CatalogSpec defines the vocabulary.
SceneSpec defines the scene document protocol.
A scene is the persisted session instance.
Runtime renders the scene using an implementation.
```

## Scene snapshots and updates

SceneSpec starts with the **scene snapshot**: the complete current state of a scene.

The snapshot is the canonical object that can be stored, loaded, validated, and rendered. It does not need to be optimized for patching.

A separate update protocol can later define how agents stream changes into that scene over time.

```txt
Scene snapshot
  complete, nested, persistable current scene state

Scene update protocol
  future streamable operations for creating and updating scenes
```

This separation lets the scene remain simple while leaving room for agent-friendly streaming operations.

## Scene document

A scene is locked to one catalog and one catalog version.

```json
{
  "version": 1,
  "id": "scene_123",
  "catalog": {
    "id": "commerce",
    "version": 1
  },
  "theme": "light",
  "state": {
    "isLoggedIn": true,
    "market": "US"
  },
  "root": {
    "id": "featured-product-page",
    "item": "ProductPage",
    "props": {
      "sku": "sku_123"
    },
    "state": {},
    "slots": {
      "recommendations": [
        {
          "id": "recommended-product-1",
          "item": "ProductCard",
          "props": {
            "sku": "sku_456",
            "name": "Trail Jacket",
            "price": 128,
            "currency": "USD"
          },
          "state": {
            "quantity": 1
          },
          "slots": {}
        }
      ]
    }
  }
}
```

## Scene fields

| Field | Meaning |
|---|---|
| `version` | SceneSpec document version |
| `id` | Stable scene identity, suitable for persistence and associating streams/updates |
| `catalog.id` | Catalog this scene references |
| `catalog.version` | Catalog version this scene is locked to |
| `theme` | Selected theme from the referenced catalog |
| `state` | Concrete values for catalog-level shared state |
| `root` | Single root item instance |

## Item instances

Catalog items are definitions. Scene item instances are concrete uses of those definitions.

An item instance has a stable `id` within the scene and an `item` field that references a CatalogSpec item.

```json
{
  "id": "recommended-product-1",
  "item": "ProductCard",
  "props": {},
  "state": {},
  "slots": {}
}
```

| Field | Meaning |
|---|---|
| `id` | Stable identity for this instance within the scene |
| `item` | PascalCase CatalogSpec item name |
| `props` | Concrete values conforming to the catalog item's `props` contract |
| `state` | Concrete or initial values conforming to the catalog item's `state` contract |
| `slots` | Slot content keyed by catalog-defined slot names |

Instance IDs must be unique within a scene. They are used for persistence, inspection, and future update operations.

## Root instance

A scene has one root item instance.

SceneSpec does not define generic layout semantics. If a scene needs layout or composition, the catalog should provide layout-capable items such as `ProductPage`, `DashboardLayout`, `Stack`, `Grid`, or domain-specific containers.

This keeps SceneSpec focused on composition while leaving layout meaning to the catalog and its implementations.

## Slots

Slots compose item instances inside other item instances.

Slot values are always arrays of item instances:

```json
{
  "slots": {
    "sidebar": [
      {
        "id": "cart-summary",
        "item": "CartSummary",
        "props": {},
        "state": {},
        "slots": {}
      }
    ]
  }
}
```

CatalogSpec slot definitions determine whether a slot is required, whether it accepts multiple instances, and which kinds of content are allowed.

For the initial model, SceneSpec does not define text nodes or primitive nodes. Text should be represented through catalog item props or catalog-defined items.

## Validation relationship

A scene should validate against the referenced catalog:

- `catalog.id` references a CatalogSpec catalog
- `catalog.version` matches the catalog version the scene was created against
- `theme` is included in `catalog.json.themes.available`
- scene `state` conforms to catalog-level `state`
- `root.item` exists in `catalog.json.items`
- each instance `item` exists in `catalog.json.items`
- each instance `props` conforms to the referenced item's `props`
- each instance `state` conforms to the referenced item's `state`
- each instance `slots` conforms to the referenced item's `slots`
- instance IDs are unique within the scene

## Deferred protocol areas

The snapshot model intentionally defers several important areas:

### Streaming updates

Agents should eventually be able to stream operations that create and update a scene. Those operations should target the scene snapshot but do not need to share the same shape as the snapshot.

Possible future operation categories:

- create scene
- replace scene
- set theme
- set catalog state
- add instance
- replace instance
- remove instance
- set instance props
- set instance state
- append to slot
- replace slot

### Actions, events, and controllers

CatalogSpec defines available actions and events. SceneSpec will later need a protocol for exposing controllable actions to an agent and applying action results back to the scene.

This is deferred from the initial scene snapshot.

### Multi-catalog scenes

Initial scenes reference one catalog. Multi-catalog scenes may be powerful later, but they introduce versioning, namespace, theme, state, and implementation-resolution questions.

### Primitive content

Initial scenes compose catalog item instances only. Text, markdown, and other primitive content can be modeled through catalog items or item props for now.

## Non-goals for the initial snapshot

SceneSpec does not currently define:

- a SceneSpec JSON schema
- a scene validator
- a streaming update protocol
- action/event/controller wiring
- expression language
- generic layout DSL
- multi-catalog composition
- framework-specific rendering behavior
