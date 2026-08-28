import { describe, expect, it } from "bun:test";
import { createInitialLoadingState } from "./loading-state";

describe("createInitialLoadingState", () => {
  it("starts with the loader shown and essence's own initial state underneath", () => {
    const state = createInitialLoadingState();

    expect(state.isLoaderShown).toBe(true);
    expect(state.articles).toEqual([]);
    expect(state.name).toBe("you");
  });
});
