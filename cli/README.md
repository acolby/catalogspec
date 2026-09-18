# CatalogSpec CLI

Validation tooling for CatalogSpec contracts.

The CLI is intentionally scoped to CatalogSpec conformance. It validates catalog directory structure, required files, CatalogSpec JSON schemas, item naming, item references, theme references, and theme token conformance. It does not validate SceneSpec scene snapshots, render catalogs, or implement framework bindings.

## Usage

```bash
npm install
npm run build
node dist/cli.js validate ../examples/commerce
```

After publishing:

```bash
catalogspec validate ./examples/commerce
```

## Commands

### `validate [path]`

Validate a catalog directory or a directory containing catalog directories.

```bash
catalogspec validate ./examples/commerce
catalogspec validate ./examples
```

Machine-readable output for agents:

```bash
catalogspec validate ./examples/commerce --json
```

Quiet mode:

```bash
catalogspec validate ./examples/commerce --quiet
```

## Validation scope

The validator checks:

- required catalog files
- required item files
- required theme files
- JSON syntax
- JSON schema conformance
- PascalCase item directory names
- `catalog.json.items` references
- `catalog.json.themes.available` references
- `themes.default` membership
- absence of item-level `id`
- theme instances conform to `theme.json`

## Agent feedback loop

The CLI prints clear file paths, direct error messages, and suggestions where possible. Use `--json` when an agent needs structured feedback for iterative fixes.
