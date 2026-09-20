# Modal requirements

The Modal item is an experimental stateful item used to exercise slotted children, overlay UI, and model-backed open/close actions.

## Behavior

- The modal renders a trigger control using `props.triggerLabel`.
- Activating the trigger opens the modal.
- Activating the close control or backdrop closes the modal.
- The modal renders its `content` slot inside the dialog surface.
- The modal should preserve child slot composition while open.
- Open/close state is managed by the item model, not by Preact state.

## Non-goals

- Full focus trapping, escape-key handling, aria hiding, and portal behavior are deferred.
- This item is not intended as normative CatalogSpec modal behavior.
