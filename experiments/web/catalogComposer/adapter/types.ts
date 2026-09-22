export type ViewAdapterBoundaryInput<TView> = {
  key: string;
  kind: "slot" | "item" | string;
  render(): TView | readonly TView[] | undefined;
};

export type ViewAdapter<TView> = {
  boundary(input: ViewAdapterBoundaryInput<TView>): TView | undefined;
  mount(root: Element, view: TView): void;
};
