# BetaSignupForm requirements

The BetaSignupForm item is an experimental stateful form used to exercise model-backed input state inside a slotted modal.

## Behavior

- The form displays title, optional description, email input, and submit button.
- Email input changes update item model state through the `updateEmail` action.
- Submitting the form marks `submitted` as true and emits a semantic `submitted` event with the email value.
- Submitted state should render a success message.

## Non-goals

- Network submission, validation beyond basic browser email input semantics, and persistence are deferred.
- This item is not intended as normative CatalogSpec form behavior.
