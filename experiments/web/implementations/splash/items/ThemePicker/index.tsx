import { controller } from "./controller";
import { catalog, Item_ThemePicker, type ThemeName } from "../../generated";

const item = Item_ThemePicker.$view({ controller })(({ selected, emit }) => {
  const theme = selected.context.theme.state.tokens;
  const themeState = selected.context.theme.state;
  const currentTheme = themeState.name ?? catalog.themes.default;
  
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: theme?.space?.sm ?? "0.5rem", color: theme?.color?.mutedText }}>
      <span>{selected.props.label ?? "Theme"}</span>
      <select
        value={currentTheme}
        aria-label={selected.props.label ?? "Theme"}
        style={{
          borderRadius: theme?.radius?.pill ?? "999px",
          border: "1px solid rgba(148,163,184,.35)",
          background: theme?.color?.surface ?? "transparent",
          color: theme?.color?.text ?? "inherit",
          padding: "0.45rem 0.7rem",
        }}
        onChange={(event) => {
          const nextTheme = event.currentTarget.value as ThemeName;
          emit("themeChangeRequested", { theme: nextTheme });
          selected.context.theme.actions.setTheme({ name: nextTheme });
        }}
      >
        {catalog.themes.available.map((themeName) => (
          <option key={themeName} value={themeName}>{labelForTheme(themeName)}</option>
        ))}
      </select>
    </label>
  );
});

function labelForTheme(themeName: string): string {
  return themeName.slice(0, 1).toUpperCase() + themeName.slice(1);
}

export default item;
