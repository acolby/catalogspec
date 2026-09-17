import type { Finding, ThemeContract, ThemeInstance } from "./types.js";

function isTokenDef(value: unknown): value is { type: string } {
  return typeof value === "object" && value !== null && "type" in value && typeof (value as { type: unknown }).type === "string";
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function typeMatches(expected: string, value: unknown): boolean {
  switch (expected) {
    case "string": return typeof value === "string";
    case "number": return typeof value === "number" && Number.isFinite(value);
    case "integer": return Number.isInteger(value);
    case "boolean": return typeof value === "boolean";
    case "object": return isObject(value);
    case "array": return Array.isArray(value);
    case "any": return true;
    default: return false;
  }
}

export function validateThemeConformance(themePath: string, contract: ThemeContract, theme: ThemeInstance): Finding[] {
  const findings: Finding[] = [];

  function walk(contractNode: unknown, valueNode: unknown, tokenPath: string): void {
    if (isTokenDef(contractNode)) {
      if (!typeMatches(contractNode.type, valueNode)) {
        findings.push({
          severity: "error",
          path: themePath,
          message: `Theme token '${tokenPath}' must be ${contractNode.type}.`,
          suggestion: `Update the theme value to match theme.json.`
        });
      }
      return;
    }

    if (!isObject(contractNode)) return;

    if (!isObject(valueNode)) {
      findings.push({
        severity: "error",
        path: themePath,
        message: `Theme token group '${tokenPath}' is missing or not an object.`,
        suggestion: `Add '${tokenPath}' with the tokens defined in theme.json.`
      });
      return;
    }

    for (const [key, childContract] of Object.entries(contractNode)) {
      const childPath = tokenPath ? `${tokenPath}.${key}` : key;
      if (!(key in valueNode)) {
        findings.push({
          severity: "error",
          path: themePath,
          message: `Theme is missing token '${childPath}'.`,
          suggestion: `Add '${childPath}' to conform to theme.json.`
        });
        continue;
      }
      walk(childContract, valueNode[key], childPath);
    }
  }

  walk(contract.tokens, theme.tokens, "");
  return findings;
}
