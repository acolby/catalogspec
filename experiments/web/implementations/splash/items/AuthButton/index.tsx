import { controller } from "./controller";
import { Item_AuthButton } from "../../generated";

const item = Item_AuthButton.$view({ controller })(({ selected, emit }) => {
  const theme = selected.context.theme.state.tokens;
  const auth = selected.context.scene.state;
  const loggedIn = auth.loggedIn === true;
  const username = auth.username ?? selected.props.username ?? "Aaron";

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
            selected.context.scene.actions.logout();
          } else {
            const nextUsername = selected.props.username ?? "Aaron";
            emit("loginRequested", { username: nextUsername });
            selected.context.scene.actions.login({ username: nextUsername });
          }
        }}
      >
        {loggedIn ? selected.props.logoutLabel ?? "Log out" : selected.props.loginLabel ?? "Log in"}
      </button>
    </div>
  );
});

export default item;
