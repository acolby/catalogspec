import { defineItem, type ItemSlot } from "../../../catalogComposer/contracts/preact";
import type { Context } from "../contexts";

export type { ItemSlot };

export const defineViewItem = defineItem<Context>();

type ViewItem<
  TProps extends Record<string, unknown>,
  TState extends object,
  TActions extends Record<string, (...args: any[]) => any>,
  TSlots,
> = Parameters<typeof defineViewItem<TProps, TState, TActions, TSlots>>[0];

export type ItemModel<
  TState extends object,
  TActions extends Record<string, (...args: any[]) => any>,
> = ViewItem<Record<string, unknown>, TState, TActions, Record<string, never>>["model"];

export type ItemLifecycle<
  TProps extends Record<string, unknown>,
  TState extends object,
  TActions extends Record<string, (...args: any[]) => any>,
> = ViewItem<TProps, TState, TActions, Record<string, never>>["lifecycle"];

export type ItemView<
  TProps extends Record<string, unknown>,
  TState extends object,
  TActions extends Record<string, (...args: any[]) => any>,
  TSlots,
> = ViewItem<TProps, TState, TActions, TSlots>["view"];
