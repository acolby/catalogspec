# SnakeGame Requirements

SnakeGame is a compact interactive game for exercising generated item contracts, action typing, mutable state, lifecycle ticks, and resumable scene snapshots.

## Behavior

- Render a square grid of cells.
- Show the snake, food, score, and current status.
- Support direction changes by keyboard and visible directional controls.
- Advance automatically while the game is active.
- Start playing when the user chooses a direction or presses restart.
- End the game when the snake hits a wall or itself.
- Restart should restore the default snake, food, direction, score, and status.

## State

- State must be fully serializable JSON.
- Scene-provided state should be able to restore a game snapshot.
- Props configure presentation/board size but do not derive default state.

## Non-goals

- This is not intended to be a complete game engine.
- Persistence, leaderboards, touch gestures, and advanced collision effects are out of scope.
