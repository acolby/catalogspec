# Architecture decision records

Architecture decision records capture durable decisions behind CatalogSpec and related SceneSpec/runtime work.

ADRs are for decisions that affect the shape of the specification, not for every implementation detail or open question.

## Index

| ADR | Status | Decision |
|---|---|---|
| [0001: Catalog-level shared state](./0001-catalog-level-shared-state.md) | Accepted | Catalogs may define shared domain/session state shape at the catalog level. |

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
