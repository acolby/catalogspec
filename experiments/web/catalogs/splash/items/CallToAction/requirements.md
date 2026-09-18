# CallToAction Requirements

## Purpose

CallToAction represents a prominent user action in a splash or hero surface.

## Functional requirements

- Render `label` as the visible control text.
- Respect `variant` as a visual emphasis preference.
- If `url` is provided, activation should request navigation rather than directly owning routing semantics.
- Activation should emit `activated` with the label and URL when available.

## Accessibility requirements

- The control must be keyboard accessible in interactive implementations.
- The visible label should be the accessible name unless the implementation has a stronger accessible naming strategy.

## Non-goals

CallToAction does not define routing, browser APIs, tracking, or host application command handling.
