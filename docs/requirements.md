# Requirements Documents

Requirements documents describe the functional expectations for catalogs and items. They are intended to be readable by both humans and LLMs. They are not required to be machine-validated.

Use `requirements.md` when the contract needs more detail than the short `description` field can provide.

## Purpose

A requirements document should answer:

- What must this catalog or item do?
- What behavior is required across all implementations?
- What props, state, slots, actions, and events imply behaviorally?
- What edge cases should implementations handle?
- What should tests or examples verify?

The JSON contract describes the interface. The requirements document describes the expected behavior behind that interface.

## Placement

Catalog-level requirements:

```txt
/catalogs/commerce/requirements.md
```

Item-level requirements:

```txt
/catalogs/commerce/items/ProductCard/requirements.md
```

## Style

Requirements should be:

- explicit
- implementation-neutral
- testable where possible
- readable without source code
- aligned with `item.json`

Prefer requirement language such as:

- “The item must…”
- “The item should…”
- “The item may…”
- “The item must not…”

## Suggested catalog requirements structure

```md
# Commerce Catalog Requirements

## Purpose

Short explanation of the domain this catalog represents.

## Catalog props requirements

- `locale` should be used for formatting copy, numbers, dates, and currency where applicable.

## Catalog state requirements

- `currentUser` represents the authenticated user when one exists.
- Catalog state should generally be treated as read-only by item implementations.

## Catalog action requirements

- `signIn` must represent the intent to start the sign-in flow.

## Theme requirements

- Themes must conform to `theme.json`.
- Items should use theme tokens instead of hard-coded visual values where possible.

## Item requirements

- Items may use catalog props and state without requiring every value to be repeated in item props.

## Non-goals

- The catalog does not require a specific rendering technology.
```

## Suggested item requirements structure

```md
# ProductCard Requirements

## Purpose

Short explanation of what this item is responsible for.

## Functional requirements

- The item must display ...
- The item must support ...

## Props requirements

- `sku` must be treated as the stable product identifier.
- `price` and `currency` must be displayed together.

## State requirements

- `quantity` must default to `1`.
- `detailsOpen` controls whether details are expanded.

## Slot requirements

- `badge` content, when provided, should be rendered near the product title.

## Action requirements

- `addToCart` must use the current or provided quantity.
- `toggleDetails` must invert `detailsOpen`.

## Event requirements

- `selected` must include the product `sku`.
- `quantityChanged` must include the new `quantity`.

## Accessibility requirements

- Interactive controls must have accessible names.

## Edge cases

- Missing optional fields should not prevent rendering.

## Non-goals

- The item does not own cart persistence.
```

## Relationship to `item.json`

`item.json` is the compact interface contract:

- `props`
- `state`
- `slots`
- `actions`
- `events`

`requirements.md` is the behavioral contract that explains what those fields mean in practice.
