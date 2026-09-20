import type { View } from "./types";

type AuthSceneState = {
  loggedIn?: boolean;
  username?: string | null;
};

export const view: View = ({ props, emit, scene }) => {
  const theme = scene.theme;
  const auth = scene.state as AuthSceneState;
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
            scene.actions.logout();
          } else {
            const nextUsername = props.username ?? "Aaron";
            emit("loginRequested", { username: nextUsername });
            scene.actions.login({ username: nextUsername });
          }
        }}
      >
        {loggedIn ? props.logoutLabel ?? "Log out" : props.loginLabel ?? "Log in"}
      </button>
    </div>
  );
};
