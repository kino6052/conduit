import { defineConfig } from "vitest/config";

// Bun's own coverage only reports functions/lines, not branches — so branch
// coverage runs through vitest + istanbul instead. Source stays untouched:
// essence code imports from "bun:test", so we alias that specifier to
// vitest's (API-compatible) exports rather than forking the test files.
export default defineConfig({
  resolve: {
    alias: {
      "bun:test": "vitest",
    },
  },
  test: {
    include: ["src/**/*.test.ts"],
    coverage: {
      provider: "istanbul",
      include: ["src/**/*.ts"],
      // Composition roots (DOM/React wiring, event listeners) and pure
      // presentational components aren't unit-tested — same precedent as
      // docs/code-example.md's createCompositionRoot and Square/Board/Game.
      // Currently 0-branch anyway (coverage.all reports them as vacuous
      // 100%), but excluded explicitly so that stays true by policy, not
      // by accident, if they ever grow a conditional.
      exclude: [
        "src/**/*.test.ts",
        "src/essence-view/main.ts",
        "src/app/composition-root.ts",
        "src/app/components.ts",
      ],
      reporter: ["text", "json-summary"],
    },
  },
});
