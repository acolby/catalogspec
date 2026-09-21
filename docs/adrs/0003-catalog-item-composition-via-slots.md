# ADR 0003: Catalog item composition via slots

## Status

Accepted

## Context

CatalogSpec separates public catalog contracts from renderer/framework implementations. Catalog items are part of the public scene vocabulary: they may have props, state, actions, events, slots, lifecycle behavior, runtime identity, validation, and debug traces.

Renderer/framework implementations also need ordinary UI reuse. For example, a Modal implementation may want private primitives such as `CloseButton`, `Backdrop`, or `DialogSurface`. These primitives can be useful implementation details without becoming catalog items.

Without a clear boundary, implementation authors may directly import and render one catalog item implementation from another catalog item implementation. That bypasses scene item instances and makes state ownership, lifecycle, events, validation, and debug tracing ambiguous.

## Decision

Catalog items compose other catalog items through declared slots and scene item instances.

A scene item instance gives each composed catalog item explicit runtime-visible identity, props, state, slots, action/event context, lifecycle participation, and validation surface.

Implementation-private UI primitives may be freely used inside a catalog item implementation, but they are not catalog items unless they are part of the public scene vocabulary.

Use this rule of thumb:

- If it needs CatalogSpec/runtime semantics, compose it as a catalog item through slots.
- If it is only visual or implementation reuse, keep it private to the implementation.

Renderer/framework implementations should not secretly compose catalog items by importing another catalog item's implementation and rendering it directly. If a catalog item must be externally configurable, independently stateful, lifecycle-aware, event-emitting, or visible to scene authors, it should be represented as a scene item instance.

## Consequences

This preserves clear ownership of:

- scene-local item identity
- item props and state
- item actions and events
- lifecycle and tick behavior
- validation
- debug/instrumentation traces
- renderer/runtime composition boundaries

It also keeps implementation reuse practical. Implementations may still use private framework components, helper functions, style utilities, and local primitives internally.

Future catalog-level composition features, such as templates, prefabs, default slot content, or generated composition helpers, may be added later. They should preserve the same boundary: catalog item composition remains runtime-visible, while private UI primitive reuse remains an implementation detail.
