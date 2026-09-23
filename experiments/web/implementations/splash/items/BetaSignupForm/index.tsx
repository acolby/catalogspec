import { controller } from "./controller";
import { Item_BetaSignupForm } from "../../generated";

const item = Item_BetaSignupForm.$view({ controller })(({ selected, actions, emit }) => {
  const theme = selected.context.theme.state.tokens;

  return (
    <form
      style={{ display: "grid", gap: theme?.space?.md ?? "1rem" }}
      onSubmit={(event) => {
        event.preventDefault();
        actions.submit();
        emit("submitted", { email: selected.state.email });
      }}
    >
      <div style={{ display: "grid", gap: theme?.space?.sm ?? "0.5rem" }}>
        <h3 style={{ margin: 0, fontFamily: theme?.font?.heading }}>{selected.props.title}</h3>
        {selected.props.description && <p style={{ margin: 0, color: theme?.color?.mutedText }}>{selected.props.description}</p>}
      </div>

      {selected.state.submitted ? (
        <div
          role="status"
          style={{
            padding: theme?.space?.md ?? "1rem",
            borderRadius: theme?.radius?.md ?? "0.5rem",
            background: "rgba(34,197,94,.14)",
            color: theme?.color?.text ?? "inherit",
          }}
        >
          {selected.props.successMessage ?? "You're on the list."}
        </div>
      ) : (
        <div style={{ display: "flex", gap: theme?.space?.sm ?? "0.5rem", flexWrap: "wrap" }}>
          <input
            type="email"
            required
            value={selected.state.email}
            placeholder={selected.props.emailPlaceholder ?? "you@example.com"}
            style={{
              flex: "1 1 220px",
              padding: "0.85rem 1rem",
              borderRadius: theme?.radius?.pill ?? "999px",
              border: "1px solid rgba(148,163,184,.5)",
              background: theme?.color?.background ?? "#fff",
              color: theme?.color?.text ?? "#111827",
              font: "inherit",
            }}
            onInput={(event) => actions.updateEmail({ email: event.currentTarget.value })}
          />
          <button type="submit" class="cta" style={{ borderRadius: theme?.radius?.pill ?? "999px" }}>
            {selected.props.submitLabel ?? "Request access"}
          </button>
        </div>
      )}
    </form>
  );
});

export default item;
