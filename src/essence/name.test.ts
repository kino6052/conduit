import { describe, expect, it } from "bun:test";
import { createInitialState } from "./state";
import { changeName } from "./name";

describe("changeName", () => {
  it("changes the acting identity's name", () => {
    const state = createInitialState();

    const next = changeName(state, "alice");

    expect(next.name).toBe("alice");
  });

  it("does not mutate the state it was given", () => {
    const state = createInitialState();

    changeName(state, "alice");

    expect(state.name).toBe("you");
  });
});
