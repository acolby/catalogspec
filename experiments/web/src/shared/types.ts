export type SceneSnapshot = {
  version: number;
  id: string;
  catalog: {
    id: string;
    version: number;
  };
  context?: Record<string, SceneContextSnapshot>;
  root: SceneItemInstance;
};

export type SceneContextSnapshot = {
  state?: Record<string, unknown>;
};

export type SceneItemInstance = {
  id: string;
  item: string;
  props?: Record<string, unknown>;
  state?: Record<string, unknown>;
  slots?: Record<string, SceneItemInstance[]>;
};

export type ThemeTokens = {
  color?: Record<string, string>;
  space?: Record<string, string>;
  radius?: Record<string, string>;
  font?: Record<string, string>;
};

export type CatalogImplementation<TItem = unknown> = {
  catalog: {
    id: string;
    version: number;
  };
  items: Record<string, TItem>;
  themes?: Record<string, ThemeTokens>;
};
