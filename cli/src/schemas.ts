import { fileURLToPath } from "node:url";
import path from "node:path";
import { promises as fs } from "node:fs";
import { Ajv2020 } from "ajv/dist/2020.js";
import type { AnySchema, ValidateFunction } from "ajv";

export interface SchemaValidators {
  catalog: ValidateFunction;
  item: ValidateFunction;
  themeContract: ValidateFunction;
  themeInstance: ValidateFunction;
}

async function loadSchema(name: string): Promise<AnySchema> {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const schemaPath = path.resolve(here, "../..", "schemas", name);
  const raw = await fs.readFile(schemaPath, "utf8");
  return JSON.parse(raw) as AnySchema;
}

export async function createSchemaValidators(): Promise<SchemaValidators> {
  const ajv = new Ajv2020({ allErrors: true, strict: false });

  const catalogSchema = await loadSchema("catalog.schema.json");
  const instanceSchema = await loadSchema("instance.schema.json");
  const themeSchema = await loadSchema("theme.schema.json");
  const themeInstanceSchema = await loadSchema("theme-instance.schema.json");

  ajv.addSchema(instanceSchema);
  ajv.addSchema(catalogSchema);
  ajv.addSchema(themeSchema);
  ajv.addSchema(themeInstanceSchema);

  const catalog = ajv.getSchema("https://catalogspec.local/schemas/catalog.schema.json");
  const item = ajv.getSchema("https://catalogspec.local/schemas/catalog.schema.json#/$defs/item");
  const themeContract = ajv.getSchema("https://catalogspec.local/schemas/theme.schema.json");
  const themeInstance = ajv.getSchema("https://catalogspec.local/schemas/theme-instance.schema.json");

  if (!catalog || !item || !themeContract || !themeInstance) {
    throw new Error("Failed to load one or more CatalogSpec schemas.");
  }

  return { catalog, item, themeContract, themeInstance };
}
