import { controller } from "./controller";
import { Item_SnakeGame } from "../../generated";

const item = Item_SnakeGame.$view({ controller })(({ selected, actions }) => {
  return (
    <section
      tabIndex={0}
      aria-label={`${selected.title ?? "Snake"} game`}
      onKeyDown={(event) => {
        const direction = directionForKey(event.key);
        if (!direction) return;
        event.preventDefault();
        actions.setDirection({ direction });
      }}
      style={{
        display: "grid",
        gap: selected.theme?.space?.md ?? "1rem",
        outline: "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: selected.theme?.space?.md ?? "1rem", alignItems: "center" }}>
        <div>
          <h3 style={{ margin: 0, fontFamily: selected.theme?.font?.heading }}>{selected.title ?? "Snake"}</h3>
          <p style={{ margin: "0.25rem 0 0", color: selected.theme?.color?.mutedText }}>Score {selected.score} · {statusLabel(selected.status)}</p>
        </div>
        <button type="button" class="cta" onClick={() => actions.restart()}>
          {selected.status === "lost" ? "Play again" : "Restart"}
        </button>
      </div>

      <div
        role="grid"
        aria-label="Snake board"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${selected.size ?? 12}, minmax(0, 1fr))`,
          gap: 3,
          padding: selected.theme?.space?.sm ?? "0.5rem",
          borderRadius: selected.theme?.radius?.lg ?? "1rem",
          background: "rgba(15,23,42,.18)",
          border: "1px solid rgba(148,163,184,.25)",
        }}
      >
        {cellsForSize(selected.size ?? 12).map((cell) => {
          const snakeIndex = selected.snake.findIndex((part) => part.x === cell.x && part.y === cell.y);
          const isFood = selected.food.x === cell.x && selected.food.y === cell.y;
          return (
            <span
              key={`${cell.x}:${cell.y}`}
              role="gridcell"
              style={{
                aspectRatio: "1",
                minWidth: 16,
                borderRadius: snakeIndex === 0 ? "45%" : selected.theme?.radius?.sm ?? "0.25rem",
                background: snakeIndex >= 0
                  ? selected.theme?.color?.accent ?? "#2563eb"
                  : isFood
                    ? "#f97316"
                    : "rgba(148,163,184,.18)",
                boxShadow: snakeIndex === 0 ? "0 0 0 2px rgba(255,255,255,.35) inset" : undefined,
              }}
            />
          );
        })}
      </div>

      <div style={{ display: "grid", justifyContent: "center", gap: selected.theme?.space?.xs ?? "0.25rem" }}>
        <DirectionButton label="↑" direction="up" actions={actions} />
        <div style={{ display: "flex", gap: selected.theme?.space?.xs ?? "0.25rem" }}>
          <DirectionButton label="←" direction="left" actions={actions} />
          <DirectionButton label="↓" direction="down" actions={actions} />
          <DirectionButton label="→" direction="right" actions={actions} />
        </div>
      </div>
    </section>
  );
});

function DirectionButton({
  label,
  direction,
  actions,
}: {
  label: string;
  direction: Item_SnakeGame.Direction;
  actions: Item_SnakeGame.Actions;
}) {
  return (
    <button
      type="button"
      class="cta"
      style={{ minWidth: 44, padding: "0.45rem 0.7rem" }}
      onClick={() => actions.setDirection({ direction })}
    >
      {label}
    </button>
  );
}

function cellsForSize(size: number): Item_SnakeGame.Cell[] {
  return Array.from({ length: size * size }, (_, index) => ({
    x: index % size,
    y: Math.floor(index / size),
  }));
}

function directionForKey(key: string): Item_SnakeGame.Direction | undefined {
  if (key === "ArrowUp" || key.toLowerCase() === "w") return "up";
  if (key === "ArrowDown" || key.toLowerCase() === "s") return "down";
  if (key === "ArrowLeft" || key.toLowerCase() === "a") return "left";
  if (key === "ArrowRight" || key.toLowerCase() === "d") return "right";
  return undefined;
}

function statusLabel(status: Item_SnakeGame.Status): string {
  if (status === "ready") return "press an arrow to start";
  if (status === "lost") return "game over";
  return "playing";
}

export default item;
