# Theme Picker Requirements

## Purpose

Theme Picker lets a viewer request a theme change from the active splash scene.

## Functional requirements

- Present available theme choices in a compact control.
- Reflect the currently selected theme when the runtime exposes it.
- Request theme changes through scene/context-level actions rather than owning theme state locally.
- Emit a semantic event before requesting a theme change.

## Accessibility requirements

- The selector must have an accessible label.
- Theme names should be human-readable.

## Non-goals

Theme Picker does not define global persistence, operating-system preference detection, or transition animation policy.
