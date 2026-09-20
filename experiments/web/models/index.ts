export type ReadonlyDeep<T> = T extends (...args: any[]) => any
  ? T
  : T extends readonly (infer Item)[]
    ? readonly ReadonlyDeep<Item>[]
    : T extends object
      ? { readonly [Key in keyof T]: ReadonlyDeep<T[Key]> }
      : T;

export type ItemModel<State extends object, Actions extends Record<string, (...args: any[]) => any>> = {
  state(): ReadonlyDeep<State>;
  actions(): Actions;
  subscribe(listener: (state: ReadonlyDeep<State>, previous: ReadonlyDeep<State>) => void): () => void;
};

export type CreateItemActions<State extends object, Actions extends Record<string, (...args: any[]) => any>> = (state: State) => Actions;

export type ItemModelDefinition<State extends object, Actions extends Record<string, (...args: any[]) => any>> = {
  actions: CreateItemActions<State, Actions>;
};

export function defineItemModel<State extends object, Actions extends Record<string, (...args: any[]) => any>>(
  definition: ItemModelDefinition<State, Actions>,
): ItemModelDefinition<State, Actions> {
  return definition;
}

export function createItemModel<State extends object, Actions extends Record<string, (...args: any[]) => any>>(
  initialState: State,
  definition: ItemModelDefinition<State, Actions>,
): ItemModel<State, Actions> {
  let current = clone(initialState);
  const listeners = new Set<(state: ReadonlyDeep<State>, previous: ReadonlyDeep<State>) => void>();

  function commit(previous: State, next: State): void {
    current = next;
    for (const listener of listeners) listener(current as ReadonlyDeep<State>, previous as ReadonlyDeep<State>);
  }

  function actions(): Actions {
    const draft = clone(current);
    const rawActions = definition.actions(draft);
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

    actions,

    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

function clone<T>(value: T): T {
  if (typeof structuredClone === "function") return structuredClone(value);
  return JSON.parse(JSON.stringify(value)) as T;
}
