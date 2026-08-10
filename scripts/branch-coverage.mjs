#!/usr/bin/env node
// Reports branch coverage for everything under src/, and fails the process if any
// branch is uncovered. Bun's own `--coverage` only tracks functions/lines,
// so this drives vitest + istanbul (see vitest.config.mts) to get real
// per-branch numbers, then reads the json-summary it writes.

import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const summaryPath = path.join(root, "coverage", "coverage-summary.json");
const vitestEntry = path.join(root, "node_modules", "vitest", "vitest.mjs");

// Invoke vitest's JS entry directly with node — avoids depending on
// node_modules/.bin being on PATH or on how bun/npm shim it per OS.
const run = spawnSync(
  process.execPath,
  [vitestEntry, "run", "--coverage", "--coverage.reporter=json-summary"],
  { cwd: root, stdio: "inherit" },
);

if (run.status !== 0) {
  console.error("\nTests failed — branch coverage not evaluated.");
  process.exit(run.status ?? 1);
}

const summary = JSON.parse(readFileSync(summaryPath, "utf8"));
const { total, ...files } = summary;

const rows = Object.entries(files).map(([file, data]) => ({
  file: path.relative(root, file).replace(/\\/g, "/"),
  covered: data.branches.covered,
  total: data.branches.total,
  pct: data.branches.pct,
}));

console.log("\nBranch coverage — src");
console.log("------------------------------------------------");
for (const row of rows) {
  const label = `${row.covered}/${row.total}`.padEnd(7);
  console.log(`${String(row.pct).padStart(5)}%  ${label}  ${row.file}`);
}
console.log("------------------------------------------------");
console.log(
  `${String(total.branches.pct).padStart(5)}%  ${`${total.branches.covered}/${total.branches.total}`.padEnd(7)}  TOTAL`,
);

if (total.branches.pct !== 100) {
  console.error("\nNot every branch is covered.");
  process.exit(1);
}

console.log("\nEvery branch is covered.");
