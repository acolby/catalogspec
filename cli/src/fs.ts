import { promises as fs } from "node:fs";
import path from "node:path";
import type { JsonReadResult } from "./types.js";

export async function exists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function isDirectory(filePath: string): Promise<boolean> {
  try {
    const stat = await fs.stat(filePath);
    return stat.isDirectory();
  } catch {
    return false;
  }
}

export async function readJson<T = unknown>(filePath: string): Promise<JsonReadResult<T>> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return { ok: true, value: JSON.parse(raw) as T };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { ok: false, error: message };
  }
}

export function rel(root: string, filePath: string): string {
  const relative = path.relative(root, filePath);
  return relative === "" ? "." : relative;
}
