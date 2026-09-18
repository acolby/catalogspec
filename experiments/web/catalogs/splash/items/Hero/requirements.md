# Hero Requirements

## Purpose

Hero is the primary splash section for a scene. It presents the main message and composes optional background, actions, and supporting content.

## Functional requirements

- Render the `headline` as the primary visual and semantic heading for the section.
- Render `eyebrow` and `subheadline` when provided.
- Respect `align` as a presentation preference where possible.
- Respect `size` as a vertical scale preference where possible.
- Render at most one background item.
- Render action items in a visually grouped area near the primary copy.

## Accessibility requirements

- The headline should be exposed as prominent heading text.
- Background content should not obscure readable foreground text.
- Alignment and size preferences must not break reading order.

## Non-goals

Hero does not define routing, analytics, animation timelines, or framework-specific layout mechanics.
