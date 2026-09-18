# Schemas

These JSON Schemas support the active CatalogSpec layer.

## Current status

- `catalog.schema.json` validates catalog/domain/item contract documents.
- `theme.schema.json` validates catalog theme token contracts.
- `theme-instance.schema.json` validates concrete theme instances against theme contracts.
- `instance.schema.json` is a legacy/example item-instance schema used for catalog examples. It is **not** the canonical SceneSpec schema.

There is currently no canonical SceneSpec JSON Schema or SceneSpec validator in this repository.

## SceneSpec note

The draft SceneSpec snapshot model uses scene-level `id`, a single catalog reference with version, a single root item instance, scene item instance `id`s, and item-instance-only slot content.

That model intentionally does not match `instance.schema.json`, which predates the current SceneSpec snapshot draft and allows fields such as `key`, per-instance `catalog`, primitive slot content, and action bindings.
