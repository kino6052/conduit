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
      // Composition roots (DOM wiring, event listeners) aren't unit-tested —
      // same precedent as docs/code-example.md's createCompositionRoot.
      exclude: ["src/**/*.test.ts", "src/essence-view/main.ts"],
      reporter: ["text", "json-summary"],
    },
  },
});
