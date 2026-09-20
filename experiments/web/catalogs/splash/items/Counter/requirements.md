# Counter requirements

The Counter item is an experimental stateful item used to explore framework-independent item models.

## Behavior

- The item displays a label and the current count.
- The initial count is derived from `props.initialCount` when the item model is first created.
- `increment` increases the count by one.
- `decrement` decreases the count by one.
- `reset` restores the count to the initial count.
- State transitions should be observable by runtime/debug tooling.

## Non-goals

- This item is not intended as a normative CatalogSpec state model.
- Persistence, hydration, and cross-session state reconciliation are deferred.
