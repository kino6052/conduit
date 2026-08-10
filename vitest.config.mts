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
    include: ["src/essence/**/*.test.ts"],
    coverage: {
      provider: "istanbul",
      include: ["src/essence/**/*.ts"],
      exclude: ["src/essence/**/*.test.ts"],
      reporter: ["text", "json-summary"],
    },
  },
});
