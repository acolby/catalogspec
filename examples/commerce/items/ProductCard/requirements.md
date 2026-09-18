# ProductCard Requirements

## Purpose

`ProductCard` presents a purchasable product summary. It should help a user understand the product, adjust purchase-related state, and invoke purchase-oriented actions.

## Functional requirements

- The item must display the product name.
- The item must display price and currency together when both are provided.
- The item should display the product description when provided.
- The item should display the product image when `imageUrl` is provided.
- The item must remain renderable when optional props or slots are omitted.

## Props requirements

- `sku` must be treated as the stable product identifier.
- `name` must be treated as the primary display label.
- `price` must be interpreted in combination with `currency`.
- `description` is optional and must not be required for rendering.
- `imageUrl` is optional and must not be required for rendering.

## State requirements

- `quantity` must represent the currently selected quantity for purchase actions.
- `quantity` must default to `1`.
- `quantity` should not be less than `1`.
- `detailsOpen` must represent whether additional product details are visible.
- `detailsOpen` must default to `false`.

## Slot requirements

- `badge`, when provided, should be rendered near the product title or primary product identity.
- `badge` accepts a single item of content.
- `footer`, when provided, should be rendered after the main product content and actions.
- `footer` may contain multiple pieces of content.

## Action requirements

- `addToCart` must represent the intent to add the product to a cart.
- `addToCart` may be implemented by delegating to the commerce catalog-level `addToCart` action.
- `addToCart` must include a `sku`.
- `addToCart` must include a `quantity`.
- When an action binding does not provide `quantity`, implementations should use the current `quantity` state.
- `toggleDetails` must invert the `detailsOpen` state.

## Event requirements

- `selected` must be emitted when the product card itself is selected or activated.
- `selected` must include the product `sku`.
- `quantityChanged` must be emitted when the selected quantity changes.
- `quantityChanged` must include the product `sku` and new `quantity`.

## Theme requirements

- The card container should use catalog theme surface, border, spacing, and radius tokens where available.
- Primary purchase affordances should use the catalog accent color where appropriate.
- Text should use catalog text and muted text tokens where appropriate.

## Accessibility requirements

- Any interactive control must have an accessible name.
- The product name should be exposed as the primary accessible label for the card.
- Quantity controls, if rendered, must communicate the current quantity.

## Edge cases

- If `imageUrl` fails to load, the item should still show the product name and price.
- If `description` is missing, the item should not reserve empty description space unless useful for layout stability.
- If no slots are provided, the item should render without placeholder slot content.

## Non-goals

- `ProductCard` does not own cart persistence.
- `ProductCard` does not define how `addToCart` is implemented by the host.
- `ProductCard` does not require a specific visual layout.
