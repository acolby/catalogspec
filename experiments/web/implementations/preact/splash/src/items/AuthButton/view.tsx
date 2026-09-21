import type { ComponentChildren } from "preact";
import type { View } from "./types";

export const view: View<ComponentChildren> = ({ props, emit, context }) => {
  const theme = context.theme.state.tokens;
  const auth = context.scene.state;
  const loggedIn = auth.loggedIn === true;
  const username = auth.username ?? props.username ?? "Aaron";

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: theme?.space?.sm ?? "0.5rem", flexWrap: "wrap" }}>
      {loggedIn && <span style={{ color: theme?.color?.mutedText }}>Signed in as {username}</span>}
      <button
        type="button"
        class="cta"
        style={{
          borderRadius: theme?.radius?.pill ?? "999px",
          background: loggedIn ? "transparent" : theme?.color?.accent ?? "#2563eb",
          color: loggedIn ? theme?.color?.text ?? "inherit" : theme?.color?.accentText ?? "#fff",
          border: loggedIn ? "1px solid rgba(148,163,184,.35)" : "1px solid transparent",
        }}
        onClick={() => {
          if (loggedIn) {
            emit("logoutRequested");
            context.scene.actions.logout();
          } else {
            const nextUsername = props.username ?? "Aaron";
            emit("loginRequested", { username: nextUsername });
            context.scene.actions.login({ username: nextUsername });
          }
        }}
      >
        {loggedIn ? props.logoutLabel ?? "Log out" : props.loginLabel ?? "Log in"}
      </button>
    </div>
  );
};
