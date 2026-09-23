import { clone } from "../utils";

export type ReadonlyDeep<T> = T extends (...args: any[]) => any
  ? T
  : T extends readonly (infer Item)[]
    ? readonly ReadonlyDeep<Item>[]
    : T extends object
      ? { readonly [Key in keyof T]: ReadonlyDeep<T[Key]> }
      : T;

export type ModelActionInput<State extends object, TInput extends object = object> = TInput & {
  state: State;
};

export type ItemModel<
  State extends object,
  Actions extends Record<string, (...args: any[]) => any>,
  TActionInput extends object = object,
> = {
  state(): ReadonlyDeep<State>;
  setActionInput(input: TActionInput): void;
  actions(): Actions;
  subscribe(listener: (state: ReadonlyDeep<State>, previous: ReadonlyDeep<State>) => void): () => void;
};

export type CreateItemActions<
  State extends object,
  Actions extends Record<string, (...args: any[]) => any>,
  TActionInput extends object = object,
> = (input: ModelActionInput<State, TActionInput>) => Actions;

export type ItemModelDefinition<
  State extends object,
  Actions extends Record<string, (...args: any[]) => any>,
  TActionInput extends object = object,
> = {
  state?: State;
  actions: CreateItemActions<State, Actions, TActionInput>;
};

export function createItemModel<
  State extends object,
  Actions extends Record<string, (...args: any[]) => any>,
  TActionInput extends object = object,
>(
  initialState: State,
  definition: ItemModelDefinition<State, Actions, TActionInput>,
): ItemModel<State, Actions, TActionInput> {
  let current = clone(initialState);
  let actionInput = {} as TActionInput;
  const listeners = new Set<(state: ReadonlyDeep<State>, previous: ReadonlyDeep<State>) => void>();

  function commit(previous: State, next: State): void {
    current = next;
    for (const listener of listeners) listener(current as ReadonlyDeep<State>, previous as ReadonlyDeep<State>);
  }

  function actions(): Actions {
    const draft = clone(current);
    const rawActions = definition.actions({ ...actionInput, state: draft });
    const wrapped: Record<string, (...args: unknown[]) => unknown> = {};

    for (const [name, action] of Object.entries(rawActions)) {
      wrapped[name] = (...args: unknown[]) => {
        const previous = current;
        const result = action(...args);
        commit(previous, draft);
        return result;
      };
    }

    return wrapped as Actions;
  }

  return {
    state() {
      return current as ReadonlyDeep<State>;
    },

    setActionInput(input) {
      actionInput = input;
    },

    actions,

    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

