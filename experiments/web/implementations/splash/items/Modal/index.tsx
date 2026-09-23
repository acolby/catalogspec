import { controller } from "./controller";
import { defineItem } from "../types";
import type { Slots } from "./types";

export const implemented = defineItem({ controller })<Slots>(({ props, state, actions, emit, slots, context }) => {
  const theme = context.theme.state.tokens;

  return (
    <>
      <button
        type="button"
        class="cta"
        style={{
          borderRadius: theme?.radius?.pill ?? "999px",
          background: "rgba(255,255,255,.12)",
          color: theme?.color?.text ?? "inherit",
          border: "1px solid rgba(148,163,184,.35)",
        }}
        onClick={() => {
          actions.open();
          emit("opened");
        }}
      >
        {props.triggerLabel}
      </button>

      {state.open && (
        <div
          role="presentation"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            display: "grid",
            placeItems: "center",
            padding: theme?.space?.lg ?? "2rem",
            background: "rgba(15, 23, 42, .68)",
            backdropFilter: "blur(10px)",
          }}
          onClick={() => {
            actions.close();
            emit("closed");
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-label={props.title}
            style={{
              width: "min(520px, 100%)",
              borderRadius: theme?.radius?.lg ?? "1rem",
              background: theme?.color?.surface ?? "#fff",
              color: theme?.color?.text ?? "#111827",
              boxShadow: "0 30px 90px rgba(0,0,0,.35)",
              border: "1px solid rgba(148,163,184,.25)",
              padding: theme?.space?.lg ?? "2rem",
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: theme?.space?.md ?? "1rem", alignItems: "start" }}>
              <h2 style={{ margin: 0, fontFamily: theme?.font?.heading }}>{props.title}</h2>
              <button
                type="button"
                aria-label="Close modal"
                class="cta"
                style={{ padding: "0.4rem 0.7rem", borderRadius: theme?.radius?.pill ?? "999px" }}
                onClick={() => {
                  actions.close();
                  emit("closed");
                }}
              >
                ×
              </button>
            </div>
            <div style={{ marginTop: theme?.space?.md ?? "1rem" }}>{slots.content}</div>
          </section>
        </div>
      )}
    </>
  );
});
