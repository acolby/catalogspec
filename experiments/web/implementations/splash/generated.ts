// Intended generated output from experiments/web/catalogs/splash.
// Hand-authored for now while the generator shape is still being explored.

import { defineContext as defineBaseContext, defineItemController as defineBaseItemController, type ComposeContextValue, type ReadonlyDeep } from "../../catalogComposer";
import { defineItem as definePreactItem, type ItemSlot } from "../../catalogComposer/contracts/preact";

export const catalog = {
  id: "splash",
  version: 1,
  items: ["Hero", "CallToAction", "Background", "Stack", "Counter", "Modal", "BetaSignupForm", "AuthButton", "ThemePicker", "SnakeGame"],
  contexts: ["scene", "theme"],
  themes: {
    default: "light",
    available: ["light", "dark"],
  },
} as const;

export type ThemeName = (typeof catalog.themes.available)[number];

export type ThemeTokens = {
  color: {
    background: string;
    surface: string;
    text: string;
    mutedText: string;
    accent: string;
    accentText: string;
  };
  space: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
    pill: string;
  };
  font: {
    body: string;
    heading: string;
  };
};

export const themes: Record<ThemeName, ThemeTokens> = {
  light: {
    color: {
      background: "#ffffff",
      surface: "#f7f7f8",
      text: "#111827",
      mutedText: "#4b5563",
      accent: "#2563eb",
      accentText: "#ffffff",
    },
    space: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "2rem",
      xl: "4rem",
    },
    radius: {
      sm: "0.25rem",
      md: "0.5rem",
      lg: "1rem",
      pill: "999px",
    },
    font: {
      body: "system-ui, sans-serif",
      heading: "system-ui, sans-serif",
    },
  },
  dark: {
    color: {
      background: "#0f172a",
      surface: "#111827",
      text: "#f9fafb",
      mutedText: "#cbd5e1",
      accent: "#60a5fa",
      accentText: "#0f172a",
    },
    space: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "2rem",
      xl: "4rem",
    },
    radius: {
      sm: "0.25rem",
      md: "0.5rem",
      lg: "1rem",
      pill: "999px",
    },
    font: {
      body: "system-ui, sans-serif",
      heading: "system-ui, sans-serif",
    },
  },
};

export namespace Context_Scene {
  export type State = {
    loggedIn: boolean;
    username: string | null;
  };

  export type Actions = {
    login(input: { username: string }): void;
    logout(): void;
    openUrl?(input: { url: string; target: "self" | "blank" }): void;
  };

  export type Value = ComposeContextValue<ReadonlyDeep<State>, Actions>;

  export const $defaultState = {
    loggedIn: false,
    username: null,
  } satisfies State;

  export function $createDefaultState(): State {
    return cloneGenerated($defaultState);
  }

  type ContextInput = Parameters<typeof defineBaseContext<State, Actions>>[0];

  export function $context(input: Omit<ContextInput, "state"> & { state?: State }) {
    return defineBaseContext<State, Actions>({
      state: $createDefaultState(),
      ...input,
    });
  }
}

export namespace Context_Theme {
  export type State = {
    name: ThemeName;
    tokens?: ThemeTokens;
    available: ThemeName[];
  };

  export type Actions = {
    setTheme(input: { name: ThemeName }): void;
  };

  export type Value = ComposeContextValue<ReadonlyDeep<State>, Actions>;

  export const $defaultState = {
    name: catalog.themes.default,
    tokens: themes[catalog.themes.default],
    available: [...catalog.themes.available],
  } satisfies State;

  export function $createDefaultState(): State {
    return cloneGenerated($defaultState);
  }

  type ContextInput = Parameters<typeof defineBaseContext<State, Actions>>[0];

  export function $context(input: Omit<ContextInput, "state"> & { state?: State }) {
    return defineBaseContext<State, Actions>({
      state: $createDefaultState(),
      ...input,
    });
  }
}

export type Context = {
  scene: Context_Scene.Value;
  theme: Context_Theme.Value;
};

const defineItemController = defineBaseItemController<Context>();
const defineItem = definePreactItem<Context>();

function cloneGenerated<T>(value: T): T {
  if (typeof structuredClone === "function") return structuredClone(value);
  return JSON.parse(JSON.stringify(value)) as T;
}

export namespace Item_Hero {
  export type Props = {
    eyebrow?: string;
    headline: string;
    subheadline?: string;
    align?: "start" | "center" | "end";
    size?: "compact" | "regular" | "full";
  };
  export type State = Record<string, never>;
  export type Actions = Record<string, never>;
  export type Slots = {
    background?: ItemSlot;
    actions?: ItemSlot;
    content?: ItemSlot;
  };
  export const $defaultState = {} satisfies State;


  export function $createDefaultState(): State {
    return cloneGenerated($defaultState);
  }

  type DefaultSelected = { props: Props; state: ReadonlyDeep<State>; context: Context };
  export type Selected = DefaultSelected;
  type ControllerInput = Parameters<typeof defineItemController<Props, State, Actions, Selected>>[0];

  export function $controller(input: Omit<ControllerInput, "state"> & { state?: State }) {
    return defineItemController<Props, State, Actions, Selected>({
      state: $createDefaultState(),
      ...input,
    });
  }

  export function $view(options: { controller: ReturnType<typeof $controller> }) {
    return defineItem(options)<Slots>;
  }
}

export namespace Item_CallToAction {
  export type Props = {
    label: string;
    url?: string;
    target?: "self" | "blank";
    variant?: "primary" | "secondary" | "ghost";
  };
  export type State = Record<string, never>;
  export type Actions = Record<string, never>;
  export type Slots = Record<string, never>;
  export const $defaultState = {} satisfies State;


  export function $createDefaultState(): State {
    return cloneGenerated($defaultState);
  }

  type DefaultSelected = { props: Props; state: ReadonlyDeep<State>; context: Context };
  export type Selected = DefaultSelected;
  type ControllerInput = Parameters<typeof defineItemController<Props, State, Actions, Selected>>[0];

  export function $controller(input: Omit<ControllerInput, "state"> & { state?: State }) {
    return defineItemController<Props, State, Actions, Selected>({
      state: $createDefaultState(),
      ...input,
    });
  }

  export function $view(options: { controller: ReturnType<typeof $controller> }) {
    return defineItem(options)<Slots>;
  }
}

export namespace Item_Background {
  export type Props = {
    kind?: "solid" | "gradient" | "image";
    color?: string;
    accentColor?: string;
    imageUrl?: string;
    overlay?: "none" | "light" | "dark";
  };
  export type State = {
    elapsedMs: number;
    phase: number;
  };
  export type Actions = {
    advance(input: { deltaMs: number }): void;
  };
  export type Slots = Record<string, never>;
  export const $defaultState = {
    elapsedMs: 0,
    phase: 0,
  } satisfies State;


  export function $createDefaultState(): State {
    return cloneGenerated($defaultState);
  }

  type DefaultSelected = { props: Props; state: ReadonlyDeep<State>; context: Context };
  export type Selected = DefaultSelected;
  type ControllerInput = Parameters<typeof defineItemController<Props, State, Actions, Selected>>[0];

  export function $controller(input: Omit<ControllerInput, "state"> & { state?: State }) {
    return defineItemController<Props, State, Actions, Selected>({
      state: $createDefaultState(),
      ...input,
    });
  }

  export function $view(options: { controller: ReturnType<typeof $controller> }) {
    return defineItem(options)<Slots>;
  }
}

export namespace Item_Stack {
  export type Props = {
    direction?: "vertical" | "horizontal";
    gap?: "xs" | "sm" | "md" | "lg" | "xl";
    align?: "start" | "center" | "end" | "stretch";
  };
  export type State = Record<string, never>;
  export type Actions = Record<string, never>;
  export type Slots = {
    children?: ItemSlot;
  };
  export const $defaultState = {} satisfies State;


  export function $createDefaultState(): State {
    return cloneGenerated($defaultState);
  }

  type DefaultSelected = { props: Props; state: ReadonlyDeep<State>; context: Context };
  export type Selected = DefaultSelected;
  type ControllerInput = Parameters<typeof defineItemController<Props, State, Actions, Selected>>[0];

  export function $controller(input: Omit<ControllerInput, "state"> & { state?: State }) {
    return defineItemController<Props, State, Actions, Selected>({
      state: $createDefaultState(),
      ...input,
    });
  }

  export function $view(options: { controller: ReturnType<typeof $controller> }) {
    return defineItem(options)<Slots>;
  }
}

export namespace Item_Counter {
  export type Props = {
    label?: string;
  };
  export type State = {
    count: number;
    initialCount: number;
  };
  export type Actions = {
    increment(): void;
    decrement(): void;
    reset(): void;
  };
  export type Slots = Record<string, never>;
  export const $defaultState = {
    count: 0,
    initialCount: 0,
  } satisfies State;


  export function $createDefaultState(): State {
    return cloneGenerated($defaultState);
  }

  type DefaultSelected = { props: Props; state: ReadonlyDeep<State>; context: Context };
  export type Selected = DefaultSelected;
  type ControllerInput = Parameters<typeof defineItemController<Props, State, Actions, Selected>>[0];

  export function $controller(input: Omit<ControllerInput, "state"> & { state?: State }) {
    return defineItemController<Props, State, Actions, Selected>({
      state: $createDefaultState(),
      ...input,
    });
  }

  export function $view(options: { controller: ReturnType<typeof $controller> }) {
    return defineItem(options)<Slots>;
  }
}

export namespace Item_Modal {
  export type Props = {
    triggerLabel: string;
    title: string;
  };
  export type State = {
    open: boolean;
  };
  export type Actions = {
    open(): void;
    close(): void;
  };
  export type Slots = {
    content?: ItemSlot;
  };
  export const $defaultState = {
    open: false,
  } satisfies State;


  export function $createDefaultState(): State {
    return cloneGenerated($defaultState);
  }

  type DefaultSelected = { props: Props; state: ReadonlyDeep<State>; context: Context };
  export type Selected = DefaultSelected;
  type ControllerInput = Parameters<typeof defineItemController<Props, State, Actions, Selected>>[0];

  export function $controller(input: Omit<ControllerInput, "state"> & { state?: State }) {
    return defineItemController<Props, State, Actions, Selected>({
      state: $createDefaultState(),
      ...input,
    });
  }

  export function $view(options: { controller: ReturnType<typeof $controller> }) {
    return defineItem(options)<Slots>;
  }
}

export namespace Item_BetaSignupForm {
  export type Props = {
    title: string;
    description?: string;
    emailPlaceholder?: string;
    submitLabel?: string;
    successMessage?: string;
  };
  export type State = {
    email: string;
    submitted: boolean;
  };
  export type Actions = {
    updateEmail(input: { email: string }): void;
    submit(): void;
  };
  export type Slots = Record<string, never>;
  export const $defaultState = {
    email: "",
    submitted: false,
  } satisfies State;


  export function $createDefaultState(): State {
    return cloneGenerated($defaultState);
  }

  type DefaultSelected = { props: Props; state: ReadonlyDeep<State>; context: Context };
  export type Selected = DefaultSelected;
  type ControllerInput = Parameters<typeof defineItemController<Props, State, Actions, Selected>>[0];

  export function $controller(input: Omit<ControllerInput, "state"> & { state?: State }) {
    return defineItemController<Props, State, Actions, Selected>({
      state: $createDefaultState(),
      ...input,
    });
  }

  export function $view(options: { controller: ReturnType<typeof $controller> }) {
    return defineItem(options)<Slots>;
  }
}

export namespace Item_AuthButton {
  export type Props = {
    loginLabel?: string;
    logoutLabel?: string;
    username?: string;
  };
  export type State = Record<string, never>;
  export type Actions = Record<string, never>;
  export type Slots = Record<string, never>;
  export const $defaultState = {} satisfies State;


  export function $createDefaultState(): State {
    return cloneGenerated($defaultState);
  }

  type DefaultSelected = { props: Props; state: ReadonlyDeep<State>; context: Context };
  export type Selected = DefaultSelected;
  type ControllerInput = Parameters<typeof defineItemController<Props, State, Actions, Selected>>[0];

  export function $controller(input: Omit<ControllerInput, "state"> & { state?: State }) {
    return defineItemController<Props, State, Actions, Selected>({
      state: $createDefaultState(),
      ...input,
    });
  }

  export function $view(options: { controller: ReturnType<typeof $controller> }) {
    return defineItem(options)<Slots>;
  }
}

export namespace Item_ThemePicker {
  export type Props = {
    label?: string;
  };
  export type State = Record<string, never>;
  export type Actions = Record<string, never>;
  export type Slots = Record<string, never>;
  export const $defaultState = {} satisfies State;


  export function $createDefaultState(): State {
    return cloneGenerated($defaultState);
  }

  type DefaultSelected = { props: Props; state: ReadonlyDeep<State>; context: Context };
  export type Selected = DefaultSelected;
  type ControllerInput = Parameters<typeof defineItemController<Props, State, Actions, Selected>>[0];

  export function $controller(input: Omit<ControllerInput, "state"> & { state?: State }) {
    return defineItemController<Props, State, Actions, Selected>({
      state: $createDefaultState(),
      ...input,
    });
  }

  export function $view(options: { controller: ReturnType<typeof $controller> }) {
    return defineItem(options)<Slots>;
  }
}

export namespace Item_SnakeGame {
  export type Direction = "up" | "down" | "left" | "right";
  export type Status = "ready" | "playing" | "lost";
  export type Cell = {
    x: number;
    y: number;
  };
  export type Props = {
    title?: string;
    size?: number;
  };
  export type State = {
    snake: Cell[];
    food: Cell;
    direction: Direction;
    pendingDirection: Direction;
    score: number;
    status: Status;
    elapsedMs: number;
  };
  export type Actions = {
    setDirection(input: { direction: Direction }): void;
    step(input: { deltaMs: number; size: number }): void;
    restart(): void;
  };
  export type Slots = Record<string, never>;
  export const $defaultState = {
    snake: [
      { x: 5, y: 5 },
      { x: 4, y: 5 },
      { x: 3, y: 5 },
    ],
    food: { x: 8, y: 5 },
    direction: "right",
    pendingDirection: "right",
    score: 0,
    status: "ready",
    elapsedMs: 0,
  } satisfies State;


  export function $createDefaultState(): State {
    return cloneGenerated($defaultState);
  }

  export type Selected = {
    title?: string;
    size?: number;
    theme?: ThemeTokens;
    snake: ReadonlyDeep<Cell[]>;
    food: ReadonlyDeep<Cell>;
    score: number;
    status: Status;
  };
  type ControllerInput = Parameters<typeof defineItemController<Props, State, Actions, Selected>>[0];

  export function $controller(input: Omit<ControllerInput, "state"> & { state?: State }) {
    return defineItemController<Props, State, Actions, Selected>({
      state: $createDefaultState(),
      ...input,
    });
  }

  export function $view(options: { controller: ReturnType<typeof $controller> }) {
    return defineItem(options)<Slots>;
  }
}
