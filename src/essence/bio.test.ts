import { describe, expect, it } from "bun:test";
import { createInitialState } from "./state";
import { selectBio, setBio } from "./bio";

describe("setBio", () => {
  it("sets the acting identity's bio", () => {
    const state = createInitialState();

    const next = setBio(state, "I write about things.");

    expect(selectBio(next, state.name)).toBe("I write about things.");
  });

  it("replaces a previously set bio rather than accumulating entries", () => {
    const state = setBio(createInitialState(), "first draft");

    const next = setBio(state, "second draft");

    expect(selectBio(next, next.name)).toBe("second draft");
    expect(next.bios).toHaveLength(1);
  });

  it("does not mutate the state it was given", () => {
    const state = createInitialState();

    setBio(state, "I write about things.");

    expect(selectBio(state, state.name)).toBe("");
  });

  it("leaves other names' bios untouched", () => {
    const state = { ...setBio(createInitialState(), "you-bio"), name: "alice" };

    const next = setBio(state, "alice-bio");

    expect(selectBio(next, "you")).toBe("you-bio");
    expect(selectBio(next, "alice")).toBe("alice-bio");
  });
});

describe("selectBio", () => {
  it("is empty for a name that never set one", () => {
    const state = createInitialState();

    expect(selectBio(state, "nobody")).toBe("");
  });
});
