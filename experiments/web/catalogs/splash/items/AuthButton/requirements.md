# AuthButton requirements

The AuthButton item exercises scene-level shared state and actions.

## Behavior

- Reads authentication state from `scene.state`.
- When logged out, renders a login action using `props.loginLabel`.
- Activating login calls the scene-level `login` action with `props.username`.
- When logged in, renders the active username and a logout action using `props.logoutLabel`.
- Activating logout calls the scene-level `logout` action.
- The item does not own authentication state locally.

## Non-goals

- Real authentication, token handling, network calls, and persistence are deferred.
