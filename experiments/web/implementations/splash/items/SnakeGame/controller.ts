import { Item_SnakeGame } from "../../generated";

const stepMs = 180;

export const controller = Item_SnakeGame.$controller({
  select({ props, state, context }) {
    return {
      title: props.title,
      size: props.size,
      theme: context.theme.state.tokens,
      snake: state.snake,
      food: state.food,
      score: state.score,
      status: state.status,
    };
  },
  actions({ state }) {
    return {
      setDirection({ direction }) {
        if (isOpposite(state.direction, direction)) return;
        state.pendingDirection = direction;
        if (state.status === "ready") state.status = "playing";
      },

      step({ deltaMs, size }) {
        if (state.status !== "playing") return;

        state.elapsedMs += deltaMs;
        if (state.elapsedMs < stepMs) return;
        state.elapsedMs = 0;
        state.direction = state.pendingDirection;

        const head = state.snake[0] ?? Item_SnakeGame.$defaultState.snake[0];
        const next = nextCell(head, state.direction);
        const ateFood = next.x === state.food.x && next.y === state.food.y;
        const body = ateFood ? state.snake : state.snake.slice(0, -1);

        if (next.x < 0 || next.y < 0 || next.x >= size || next.y >= size || body.some((cell) => cell.x === next.x && cell.y === next.y)) {
          state.status = "lost";
          return;
        }

        state.snake = [next, ...body];
        if (ateFood) {
          state.score += 1;
          state.food = nextFood(state.snake, size);
        }
      },

      restart() {
        state.snake = Item_SnakeGame.$defaultState.snake.map((cell) => ({ ...cell }));
        state.food = { ...Item_SnakeGame.$defaultState.food };
        state.direction = Item_SnakeGame.$defaultState.direction;
        state.pendingDirection = Item_SnakeGame.$defaultState.pendingDirection;
        state.score = Item_SnakeGame.$defaultState.score;
        state.status = "playing";
        state.elapsedMs = 0;
      },
    };
  },
  lifecycle: {
    tick({ props, actions }, frame) {
      actions.step({ deltaMs: frame.deltaMs, size: props.size ?? 12 });
    },
  },
});

function nextCell(cell: Item_SnakeGame.Cell, direction: Item_SnakeGame.Direction): Item_SnakeGame.Cell {
  if (direction === "up") return { x: cell.x, y: cell.y - 1 };
  if (direction === "down") return { x: cell.x, y: cell.y + 1 };
  if (direction === "left") return { x: cell.x - 1, y: cell.y };
  return { x: cell.x + 1, y: cell.y };
}

function isOpposite(current: Item_SnakeGame.Direction, next: Item_SnakeGame.Direction): boolean {
  return (
    (current === "up" && next === "down") ||
    (current === "down" && next === "up") ||
    (current === "left" && next === "right") ||
    (current === "right" && next === "left")
  );
}

function nextFood(snake: Item_SnakeGame.Cell[], size: number): Item_SnakeGame.Cell {
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const index = (x * 7 + y * 11 + snake.length * 5) % (size * size);
      const cell = { x: index % size, y: Math.floor(index / size) };
      if (!snake.some((part) => part.x === cell.x && part.y === cell.y)) return cell;
    }
  }
  return { x: 0, y: 0 };
}
