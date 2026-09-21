# ADR 0004: Named catalog contexts

## Status

Accepted

## Context

Catalogs need shared ambient data and actions that multiple items can consume. Earlier guidance used top-level catalog `state` and `actions` for one shared domain/session model. Runtime experiments showed that shared capabilities are not always one model and are not always best described as generic scene state.

Examples include:

- authentication/session context
- theme context
- feature flags
- internationalization
- permissions
- routing or navigation intents
- domain-specific shared context such as cart, organization, market, or workspace

A single top-level `state`/`actions` pair makes these capabilities less explicit and encourages unrelated concerns to accumulate in one object.

## Decision

Catalogs define shared ambient capabilities with top-level named `contexts`.

Each context may define:

- `title`
- `description`
- `state`
- `actions`

Example:

```json
{
  "contexts": {
    "auth": {
      "state": {
        "loggedIn": { "type": "boolean", "default": false }
      },
      "actions": {
        "login": { "props": { "username": { "type": "string", "required": true } } }
      }
    },
    "theme": {
      "state": {
        "name": { "type": "string", "enum": ["light", "dark"], "default": "light" }
      },
      "actions": {
        "setTheme": { "props": { "name": { "type": "string", "required": true } } }
      }
    }
  }
}
```

Scene snapshots provide concrete context state values under `context`:

```json
{
  "context": {
    "auth": { "state": { "loggedIn": true } },
    "theme": { "state": { "name": "dark" } }
  }
}
```

Item-local mutable state remains in item `state`. Named contexts are for shared ambient capabilities available to items in the catalog.

Top-level catalog `state` and `actions` are superseded by named contexts.

## Consequences

Named contexts make shared capabilities explicit, typed, and easier to generate into implementation contracts.

Implementations can expose a uniform runtime shape:

```ts
context.[name].state
context.[name].actions
```

This supports context-specific model, lifecycle, and default handling without coupling every shared capability to a single scene/domain model.

Catalog authors should avoid over-abstracting. Context names should remain meaningful to agents and humans, such as `auth`, `theme`, `cart`, `intl`, `flags`, or `workspace`.
