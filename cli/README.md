# AI Catalogs CLI

Validation tooling for AI Catalog contracts.

The CLI is intentionally scoped to specification conformance. It validates catalog directory structure, required files, JSON schemas, item naming, item references, theme references, and theme token conformance. It does not render catalogs or implement framework bindings.

## Usage

```bash
npm install
npm run build
node dist/cli.js validate ../catalogs/commerce
```

After publishing:

```bash
ai-catalog validate ./catalogs/commerce
```

## Commands

### `validate [path]`

Validate a catalog directory or a directory containing catalog directories.

```bash
ai-catalog validate ./catalogs/commerce
ai-catalog validate ./catalogs
```

Machine-readable output for agents:

```bash
ai-catalog validate ./catalogs/commerce --json
```

Quiet mode:

```bash
ai-catalog validate ./catalogs/commerce --quiet
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
