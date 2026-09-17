#!/usr/bin/env node
import { Command } from "commander";
import pc from "picocolors";
import { validateCatalogs } from "./validate.js";
import type { Finding } from "./types.js";

function formatFinding(finding: Finding): string {
  const icon = finding.severity === "error" ? pc.red("✗") : pc.yellow("!");
  const label = finding.severity === "error" ? pc.red("error") : pc.yellow("warning");
  const suggestion = finding.suggestion ? `\n    ${pc.dim("suggestion:")} ${finding.suggestion}` : "";
  return `${icon} ${label} ${pc.bold(finding.path)}\n    ${finding.message}${suggestion}`;
}

const program = new Command();

program
  .name("catalogspec")
  .description("Validate CatalogSpec contract structure and JSON files.")
  .version("0.1.0");

program
  .command("validate")
  .description("Validate a catalog directory, or a directory containing catalog directories.")
  .argument("[path]", "catalog path", ".")
  .option("--json", "print machine-readable JSON output")
  .option("--quiet", "only print errors and final status")
  .action(async (targetPath: string, options: { json?: boolean; quiet?: boolean }) => {
    try {
      const result = await validateCatalogs(targetPath);

      if (options.json) {
        console.log(JSON.stringify(result, null, 2));
        process.exit(result.ok ? 0 : 1);
      }

      const errors = result.findings.filter((finding) => finding.severity === "error");
      const warnings = result.findings.filter((finding) => finding.severity === "warning");

      if (!options.quiet && result.checked.length > 0) {
        for (const checked of result.checked) {
          console.log(`${pc.green("✓")} ${checked}`);
        }
        if (result.findings.length > 0) console.log("");
      }

      for (const finding of result.findings) {
        console.log(formatFinding(finding));
      }

      if (result.ok) {
        const warningText = warnings.length === 1 ? "1 warning" : `${warnings.length} warnings`;
        console.log(pc.green(`\nValid CatalogSpec contract (${warningText}).`));
      } else {
        const errorText = errors.length === 1 ? "1 error" : `${errors.length} errors`;
        const warningText = warnings.length === 1 ? "1 warning" : `${warnings.length} warnings`;
        console.log(pc.red(`\nInvalid CatalogSpec contract (${errorText}, ${warningText}).`));
      }

      process.exit(result.ok ? 0 : 1);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (options.json) {
        console.log(JSON.stringify({ ok: false, findings: [{ severity: "error", path: targetPath, message }] }, null, 2));
      } else {
        console.error(`${pc.red("✗")} ${message}`);
      }
      process.exit(1);
    }
  });

program.parse();
