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
        "src/index.ts",
        "src/index.essence.ts",
        "src/index.essential-dependencies.ts",
        "src/accidents/view/react/components.ts",
        "src/accidents/view/react/pages.ts",
        "src/accidents/view/react/main.ts",
        "src/accidents/view/react/main-essential-dependencies.ts",
        "src/accidents/view/essence/main.ts",
        "src/accidents/view/essential-ui/main.ts",
        "src/accidents/navigation/navigation-hash.ts",
        "src/accidents/persistence/persistence-local-storage.ts",
      ],
      reporter: ["text", "json-summary"],
    },
  },
});
