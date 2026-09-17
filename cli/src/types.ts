export type Severity = "error" | "warning";

export interface Finding {
  severity: Severity;
  path: string;
  message: string;
  suggestion?: string;
}

export interface ValidationResult {
  ok: boolean;
  findings: Finding[];
  checked: string[];
}

export type JsonReadResult<T = unknown> =
  | {
      ok: true;
      value: T;
    }
  | {
      ok: false;
      error: string;
    };

export interface FieldDef {
  type: "string" | "number" | "integer" | "boolean" | "object" | "array" | "any";
  description?: string;
  required?: boolean;
  default?: unknown;
  example?: unknown;
  enum?: unknown[];
  items?: FieldDef;
  props?: Record<string, FieldDef>;
}

export interface ThemeContract {
  version: 1;
  description?: string;
  tokens: Record<string, unknown>;
}

export interface ThemeInstance {
  version: 1;
  name: string;
  description?: string;
  tokens: Record<string, unknown>;
}
