import { describe, expect, it } from "bun:test";
import { createInitialState } from "./state";

describe("createInitialState", () => {
  it("starts with an empty article feed", () => {
    const state = createInitialState();

    expect(state.articles).toEqual([]);
  });
});
