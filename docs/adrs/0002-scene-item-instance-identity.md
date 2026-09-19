# ADR 0002: Scene item instance identity

## Status

Accepted

## Context

SceneSpec distinguishes catalog item definitions from scene item instances.

Catalog item definitions describe reusable item types. Scene item instances are concrete uses of those item types inside a persisted scene snapshot.

Runtime work needs a stable way to identify each concrete instance for updates, event routing, action requests, persistence, inspection, and reconciliation.

## Decision

Every scene item instance, including the root and all nested slot children, must have a stable `id`.

Instance IDs are:

- local to a scene
- unique within that scene
- identifiers for scene item instances, not catalog item definitions
- expected to remain stable across updates while the same conceptual instance persists

## Consequences

Runtimes and future update protocols can target instances by ID instead of relying on tree paths, slot indexes, or catalog item names.

Agents creating scenes need to provide stable IDs for every item instance they create.

This ADR only applies to scene item instances. Primitive scene content is deferred.
