# Architecture decision records

Architecture decision records capture durable decisions behind CatalogSpec and related SceneSpec/runtime work.

ADRs are for decisions that affect the shape of the specification, not for every implementation detail or open question.

## Index

| ADR | Status | Decision |
|---|---|---|
| [0001: Catalog-level shared state](./0001-catalog-level-shared-state.md) | Accepted | Catalogs may define shared domain/session state shape at the catalog level. |
| [0002: Scene item instance identity](./0002-scene-item-instance-identity.md) | Accepted | Every scene item instance has a stable scene-local ID. |
| [0003: Catalog item composition via slots](./0003-catalog-item-composition-via-slots.md) | Accepted | Catalog items compose through slots and scene item instances; private UI primitive reuse stays inside implementations. |

## Status values

- **Proposed**: under discussion
- **Accepted**: current guidance
- **Superseded**: replaced by a later ADR
- **Rejected**: considered but not adopted

## Template

New ADRs should generally use this structure:

```md
# ADR 0000: Title

## Status

Proposed | Accepted | Superseded | Rejected

## Context

What problem or tension led to this decision?

## Decision

What are we deciding?

## Consequences

What improves, what gets harder, and what should future work remember?
```
