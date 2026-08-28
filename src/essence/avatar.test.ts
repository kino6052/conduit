import { describe, expect, it } from "bun:test";
import { createInitialState } from "./state";
import { selectAvatarUrl, setAvatarUrl } from "./avatar";

describe("setAvatarUrl", () => {
  it("sets the acting identity's avatar image", () => {
    const state = createInitialState();

    const next = setAvatarUrl(state, "https://example.com/you.png");

    expect(selectAvatarUrl(next, state.name)).toBe("https://example.com/you.png");
  });

  it("replaces a previously set avatar rather than accumulating entries", () => {
    const state = setAvatarUrl(createInitialState(), "https://example.com/old.png");

    const next = setAvatarUrl(state, "https://example.com/new.png");

    expect(selectAvatarUrl(next, next.name)).toBe("https://example.com/new.png");
    expect(next.avatarUrls).toHaveLength(1);
  });

  it("does not mutate the state it was given", () => {
    const state = createInitialState();

    setAvatarUrl(state, "https://example.com/you.png");

    expect(selectAvatarUrl(state, state.name)).toBe("");
  });

  it("leaves other names' avatars untouched", () => {
    const state = { ...setAvatarUrl(createInitialState(), "https://example.com/you.png"), name: "alice" };

    const next = setAvatarUrl(state, "https://example.com/alice.png");

    expect(selectAvatarUrl(next, "you")).toBe("https://example.com/you.png");
    expect(selectAvatarUrl(next, "alice")).toBe("https://example.com/alice.png");
  });
});

describe("selectAvatarUrl", () => {
  it("is empty for a name that never set one", () => {
    const state = createInitialState();

    expect(selectAvatarUrl(state, "nobody")).toBe("");
  });
});
