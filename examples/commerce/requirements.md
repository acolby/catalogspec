# Commerce Catalog Requirements

## Purpose

The commerce catalog defines shared named contexts and item contracts for product discovery and cart-oriented UI.

## Catalog props requirements

- `locale` should be used for formatting copy, numbers, dates, and currency where applicable.
- `market` should represent the active commerce market or region.

## Context requirements

- `session.currentUser` represents the authenticated user when one exists.
- `session.isLoggedIn` must represent whether `currentUser` is available and authenticated.
- `session.isB2B` must represent whether the current shopping context is business-to-business.
- `session.featureFlags` contains host-provided feature availability for commerce items.
- `session.signIn` must represent the intent to start the sign-in flow.
- `cart.addToCart` must represent the intent to add an item to the active cart.
- `cart.addToCart` must include a `sku` and `quantity`.

## Theme requirements

- Themes must conform to `theme.json`.
- The default theme is `light`.
- Commerce items should use theme tokens instead of hard-coded visual values where possible.
- Theme implementations may be runtime-injected, build-time compiled, or mapped to a platform-specific style system.

## Item requirements

- Items in this catalog may use catalog props and contexts without requiring every value to be repeated in item props.
- Items should document any assumptions they make about catalog props or contexts in their own `requirements.md` files.

## Non-goals

- The catalog does not define a specific cart implementation.
- The catalog does not define a specific authentication implementation.
- The catalog does not require a specific rendering technology.
