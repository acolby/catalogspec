import type { ItemModelDefinition, ReadonlyDeep } from "../models";
import type { ImplementedItemInput } from "./types";

export type ImplementedItemView<
  TView,
  TProps extends Record<string, unknown>,
  TState extends object,
  TActions extends Record<string, (...args: any[]) => any>,
  TTheme = unknown,
> = (input: ImplementedItemInput<TView, TProps, TTheme, ReadonlyDeep<TState>, TActions>) => TView;

export type ModelBackedImplementedItem<
  TView,
  TProps extends Record<string, unknown>,
  TState extends object,
  TActions extends Record<string, (...args: any[]) => any>,
  TTheme = unknown,
> = {
  model: ItemModelDefinition<TState, TActions>;
  view: ImplementedItemView<TView, TProps, TState, TActions, TTheme>;
};

export function isModelBackedImplementedItem(value: unknown): value is ModelBackedImplementedItem<any, any, any, any, any> {
  return !!value && typeof value === "object" && "model" in value && "view" in value;
}
