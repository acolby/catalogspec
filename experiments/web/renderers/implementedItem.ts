import type { ItemModelDefinition, ReadonlyDeep } from "../models";
import type { ImplementedItemInput } from "./types";

export type ModelBackedImplementedItem<
  TView,
  TProps extends Record<string, unknown>,
  TState extends object,
  TActions extends Record<string, (...args: any[]) => any>,
  TTheme = unknown,
> = {
  model: ItemModelDefinition<TState, TActions>;
  view(input: ImplementedItemInput<TView, TProps, TTheme, ReadonlyDeep<TState>, TActions>): TView;
};

export function defineImplementedItem<
  TView,
  TProps extends Record<string, unknown>,
  TState extends object,
  TActions extends Record<string, (...args: any[]) => any>,
  TTheme = unknown,
>(item: ModelBackedImplementedItem<TView, TProps, TState, TActions, TTheme>): ModelBackedImplementedItem<TView, TProps, TState, TActions, TTheme> {
  return item;
}

export function isModelBackedImplementedItem(value: unknown): value is ModelBackedImplementedItem<any, any, any, any, any> {
  return !!value && typeof value === "object" && "model" in value && "view" in value;
}
