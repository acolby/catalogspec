# Stack Requirements

## Purpose

Stack is a minimal layout primitive for composing splash catalog items.

## Functional requirements

- Arrange child items in the requested `direction` where possible.
- Apply `gap` using the active theme spacing tokens or an implementation-appropriate equivalent.
- Respect `align` as a cross-axis alignment preference.
- Preserve child order.

## Accessibility requirements

- Stack should not alter the semantic reading order of its children.
- Layout choices must not make interactive children inaccessible.

## Non-goals

Stack does not define grid layout, responsive breakpoints, scrolling behavior, or framework-specific layout mechanics.
