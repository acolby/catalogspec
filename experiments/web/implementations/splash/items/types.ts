import type {
  ComposeItem,
  ComposeItemLifecycle,
  ComposeItemView,
  ModelDefinition,
} from "../../../catalogComposer";
import type { ImplementationView } from "../adapter";
import type { Context } from "../contexts";

export type ItemSlot = ImplementationView;

export type ItemModel<
  TState extends object,
  TActions extends Record<string, (...args: any[]) => any>,
> = ModelDefinition<TState, TActions>;

export type ItemLifecycle<
  TProps extends Record<string, unknown>,
  TState extends object,
  TActions extends Record<string, (...args: any[]) => any>,
> = ComposeItemLifecycle<TProps, TState, TActions, Context>;

export type ItemView<
  TProps extends Record<string, unknown>,
  TState extends object,
  TActions extends Record<string, (...args: any[]) => any>,
  TSlots,
> = ComposeItemView<ImplementationView, TProps, TState, TActions, TSlots, Context>;

export type ItemImplementation<
  TProps extends Record<string, unknown>,
  TState extends object,
  TActions extends Record<string, (...args: any[]) => any>,
  TSlots,
> = ComposeItem<ImplementationView, TProps, TState, TActions, TSlots, Context>;
