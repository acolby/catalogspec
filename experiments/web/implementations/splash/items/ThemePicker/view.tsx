import { catalog, type ThemeName } from "../../generated";
import type { View } from "./types";

export const view: View = ({ props, emit, context }) => {
  const theme = context.theme.state.tokens;
  const themeState = context.theme.state;
  const currentTheme = themeState.name ?? catalog.themes.default;

  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: theme?.space?.sm ?? "0.5rem", color: theme?.color?.mutedText }}>
      <span>{props.label ?? "Theme"}</span>
      <select
        value={currentTheme}
        aria-label={props.label ?? "Theme"}
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
          context.theme.actions.setTheme({ name: nextTheme });
        }}
      >
        {catalog.themes.available.map((themeName) => (
          <option key={themeName} value={themeName}>{labelForTheme(themeName)}</option>
        ))}
      </select>
    </label>
  );
};

function labelForTheme(themeName: string): string {
  return themeName.slice(0, 1).toUpperCase() + themeName.slice(1);
}
