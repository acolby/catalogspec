# ADR 0005: Scene-level singleton contexts

## Status

Accepted

## Context

ADR 0004 introduced named catalog contexts for shared ambient capabilities such as scene/session state, theme, authentication, feature flags, locale, and other cross-item concerns.

A possible extension would be to treat contexts like provider-scoped values in a component tree: a context could be instantiated multiple times, placed around a subtree, and resolved by nested items according to provider scope. This would support cases such as multiple chat windows, editors, documents, or panels that each have their own local shared model.

However, CatalogSpec is trying to define a bounded composition layer for humans, LLMs, renderers, tests, and downstream implementations. Arbitrary provider-scoped contexts would make composition substantially more complex. A scene would need to specify provider placement, provider identity, nested scope resolution, movement/copy semantics, action routing, validation rules, and debug behavior.

That complexity would make item composition less loose and more dependent on an opinionated tree topology.

## Decision

Catalog contexts are scene-level singleton capabilities.

For a rendered scene/session, each named context has one ambient instance:

```txt
context.scene
context.theme
context.auth
context.flags
context.intl
```

Catalog contexts are not provider-scoped, repeatable, or dynamically nested within the item tree.

Repeatable scoped behavior should be modeled as catalog item instances with their own props, item state, actions, lifecycle, events, and slots. For example, multiple chat windows should be represented as multiple `Chat` or `ChatWindow` item instances rather than multiple scoped `chat` contexts.

If a unit needs a strongly scoped internal model, that is a signal that the unit should likely be represented as a catalog item boundary. The implementation may manage internal private structure, but the CatalogSpec composition surface remains the item instance and its declared slots.

Nested scenes or scene-like subtrees with their own contexts may be explored later, but they are not part of the current CatalogSpec/SceneSpec model.

## Consequences

This keeps scene composition simpler and more agent-friendly:

- context lookup is explicit by name, not by nearest provider scope
- moving an item does not silently change which context instance it reads
- scene snapshots do not need provider topology
- validators do not need scoped context resolution
- runtimes can initialize one model per named context per scene/session
- debug and instrumentation can treat context state/actions as scene-level ambient capabilities

The tradeoff is that contexts cannot directly model repeated local shared state. Repeated local state must live behind item instance identity and item models.

This is intentional. It preserves loose catalog item composition and avoids turning CatalogSpec into a framework-specific provider system.
