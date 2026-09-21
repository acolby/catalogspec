# AuthButton requirements

The AuthButton item exercises shared context state and actions.

## Behavior

- Reads authentication state from the scene/auth context.
- When logged out, renders a login action using `props.loginLabel`.
- Activating login calls the shared `login` action with `props.username`.
- When logged in, renders the active username and a logout action using `props.logoutLabel`.
- Activating logout calls the shared `logout` action.
- The item does not own authentication state locally.

## Non-goals

- Real authentication, token handling, network calls, and persistence are deferred.
