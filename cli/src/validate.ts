import path from "node:path";
import { promises as fs } from "node:fs";
import fg from "fast-glob";
import type { ErrorObject } from "ajv";
import { exists, isDirectory, readJson, rel } from "./fs.js";
import { createSchemaValidators } from "./schemas.js";
import { validateThemeConformance } from "./theme.js";
import type { Finding, ThemeContract, ThemeInstance, ValidationResult } from "./types.js";

const PASCAL_CASE = /^[A-Z][A-Za-z0-9]*$/;

function error(path: string, message: string, suggestion?: string): Finding {
  return { severity: "error", path, message, suggestion };
}

function warning(path: string, message: string, suggestion?: string): Finding {
  return { severity: "warning", path, message, suggestion };
}

function schemaFindings(filePath: string, errors: ErrorObject[] | null | undefined): Finding[] {
  return (errors ?? []).map((err) => {
    const location = err.instancePath || "/";
    return error(filePath, `Schema violation at ${location}: ${err.message ?? "invalid value"}.`);
  });
}

function itemNamesFromCatalog(catalog: unknown): string[] {
  const items = (catalog as { items?: unknown }).items;
  if (Array.isArray(items)) return items.filter((item): item is string => typeof item === "string");
  if (items && typeof items === "object") return Object.keys(items);
  return [];
}

function themeNamesFromCatalog(catalog: unknown): string[] {
  const themes = (catalog as { themes?: { available?: unknown } }).themes;
  if (!themes || !Array.isArray(themes.available)) return [];
  return themes.available.filter((theme): theme is string => typeof theme === "string");
}

export async function validateCatalog(catalogRoot: string): Promise<ValidationResult> {
  const root = path.resolve(catalogRoot);
  const findings: Finding[] = [];
  const checked: string[] = [];
  const validators = await createSchemaValidators();

  if (!(await isDirectory(root))) {
    return {
      ok: false,
      checked,
      findings: [error(root, "Catalog path is not a directory.", "Pass a catalog path like ./examples/commerce or ./catalogs/commerce.")]
    };
  }

  const catalogJson = path.join(root, "catalog.json");
  const catalogRequirements = path.join(root, "requirements.md");
  const themeJson = path.join(root, "theme.json");
  const themesDir = path.join(root, "themes");
  const itemsDir = path.join(root, "items");

  for (const required of [catalogJson, catalogRequirements, themeJson]) {
    if (!(await exists(required))) {
      findings.push(error(rel(root, required), "Required file is missing."));
    } else {
      checked.push(rel(root, required));
    }
  }

  if (!(await isDirectory(themesDir))) {
    findings.push(error("themes", "Required themes directory is missing."));
  } else {
    checked.push("themes/");
  }

  if (!(await isDirectory(itemsDir))) {
    findings.push(error("items", "Required items directory is missing."));
  } else {
    checked.push("items/");
  }

  let catalog: unknown | undefined;
  const catalogRead = await readJson(catalogJson);
  if (!catalogRead.ok) {
    findings.push(error("catalog.json", `Invalid JSON: ${catalogRead.error}`));
  } else {
    catalog = catalogRead.value;
    if (!validators.catalog(catalog)) {
      findings.push(...schemaFindings("catalog.json", validators.catalog.errors));
    }
  }

  let themeContract: ThemeContract | undefined;
  const themeRead = await readJson<ThemeContract>(themeJson);
  if (!themeRead.ok) {
    findings.push(error("theme.json", `Invalid JSON: ${themeRead.error}`));
  } else {
    themeContract = themeRead.value;
    if (!validators.themeContract(themeContract)) {
      findings.push(...schemaFindings("theme.json", validators.themeContract.errors));
    }
  }

  if (await isDirectory(itemsDir)) {
    const itemDirs = await fg("*", { cwd: itemsDir, onlyDirectories: true });
    const declaredItems = catalog ? itemNamesFromCatalog(catalog) : [];
    const actualItems = new Set(itemDirs);

    for (const dir of itemDirs) {
      const itemBase = path.join("items", dir);
      if (!PASCAL_CASE.test(dir)) {
        findings.push(error(itemBase, "Item directory must be PascalCase.", `Rename '${dir}' to a PascalCase item name, such as ProductCard.`));
      }

      const itemJson = path.join(itemsDir, dir, "item.json");
      const requirements = path.join(itemsDir, dir, "requirements.md");

      if (!(await exists(itemJson))) {
        findings.push(error(path.join(itemBase, "item.json"), "Required item.json is missing."));
      } else {
        checked.push(path.join(itemBase, "item.json"));
        const itemRead = await readJson<Record<string, unknown>>(itemJson);
        if (!itemRead.ok) {
          findings.push(error(path.join(itemBase, "item.json"), `Invalid JSON: ${itemRead.error}`));
        } else {
          if ("id" in itemRead.value) {
            findings.push(error(path.join(itemBase, "item.json"), "Item documents must not repeat their own ID.", "Remove the top-level 'id' field; item identity comes from the directory name."));
          }
          if (!validators.item(itemRead.value)) {
            findings.push(...schemaFindings(path.join(itemBase, "item.json"), validators.item.errors));
          }
        }
      }

      if (!(await exists(requirements))) {
        findings.push(error(path.join(itemBase, "requirements.md"), "Required item requirements.md is missing."));
      } else {
        checked.push(path.join(itemBase, "requirements.md"));
      }
    }

    for (const declared of declaredItems) {
      if (!actualItems.has(declared)) {
        findings.push(error("catalog.json", `Listed item '${declared}' does not exist.`, `Create items/${declared}/item.json or remove '${declared}' from catalog.json.`));
      }
    }

    for (const actual of itemDirs) {
      if (declaredItems.length > 0 && !declaredItems.includes(actual)) {
        findings.push(warning(path.join("items", actual), `Item '${actual}' exists but is not listed in catalog.json items.`));
      }
    }
  }

  if (await isDirectory(themesDir)) {
    const themeFiles = await fg("*.json", { cwd: themesDir, onlyFiles: true });
    const declaredThemes = catalog ? themeNamesFromCatalog(catalog) : [];
    const actualThemeNames = new Set(themeFiles.map((file) => path.basename(file, ".json")));

    for (const themeName of declaredThemes) {
      if (!actualThemeNames.has(themeName)) {
        findings.push(error("catalog.json", `Listed theme '${themeName}' does not exist.`, `Create themes/${themeName}.json or remove '${themeName}' from catalog.json.`));
      }
    }

    const defaultTheme = (catalog as { themes?: { default?: unknown } } | undefined)?.themes?.default;
    if (typeof defaultTheme === "string" && declaredThemes.length > 0 && !declaredThemes.includes(defaultTheme)) {
      findings.push(error("catalog.json", `Default theme '${defaultTheme}' is not listed in themes.available.`));
    }

    for (const file of themeFiles) {
      const themePath = path.join(themesDir, file);
      const displayPath = path.join("themes", file);
      checked.push(displayPath);
      const themeRead = await readJson<ThemeInstance>(themePath);
      if (!themeRead.ok) {
        findings.push(error(displayPath, `Invalid JSON: ${themeRead.error}`));
        continue;
      }
      if (!validators.themeInstance(themeRead.value)) {
        findings.push(...schemaFindings(displayPath, validators.themeInstance.errors));
      }
      if (themeContract) {
        findings.push(...validateThemeConformance(displayPath, themeContract, themeRead.value));
      }
      const themeName = path.basename(file, ".json");
      if (declaredThemes.length > 0 && !declaredThemes.includes(themeName)) {
        findings.push(warning(displayPath, `Theme '${themeName}' exists but is not listed in catalog.json themes.available.`));
      }
    }
  }

  // Catch unexpected JSON files in conventional locations. This helps agents notice typos.
  const conventionalJson = new Set([
    "catalog.json",
    "theme.json",
    ...checked.filter((entry) => entry.endsWith(".json"))
  ]);
  const allJson = await fg(["*.json", "themes/*.json", "items/*/*.json"], { cwd: root, onlyFiles: true });
  for (const file of allJson) {
    if (!conventionalJson.has(file)) {
      findings.push(warning(file, "JSON file is outside the expected catalog contract files."));
    }
  }

  return {
    ok: findings.every((finding) => finding.severity !== "error"),
    findings,
    checked: Array.from(new Set(checked)).sort()
  };
}

export async function validateCatalogs(pathOrRoot: string): Promise<ValidationResult> {
  const root = path.resolve(pathOrRoot);
  if (await exists(path.join(root, "catalog.json"))) {
    return validateCatalog(root);
  }

  const matches = await fg("*/catalog.json", { cwd: root, onlyFiles: true });
  if (matches.length === 0) {
    return {
      ok: false,
      checked: [],
      findings: [error(root, "No catalog.json found.", "Pass a catalog directory or a directory containing catalog directories.")]
    };
  }

  const results = await Promise.all(matches.map((match) => validateCatalog(path.join(root, path.dirname(match)))));
  return {
    ok: results.every((result) => result.ok),
    checked: results.flatMap((result) => result.checked),
    findings: results.flatMap((result) => result.findings)
  };
}
