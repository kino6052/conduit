import { describe, expect, it } from "bun:test";
import { createInitialState } from "./state";
import { toggleFollow, isFollowing } from "./follow";

describe("toggleFollow", () => {
  it("follows an author you don't yet follow", () => {
    const state = createInitialState();

    const next = toggleFollow(state, "bob");

    expect(next.followedAuthors).toEqual(["bob"]);
  });

  it("unfollows an author you already follow", () => {
    const state = { ...createInitialState(), followedAuthors: ["bob"] };

    const next = toggleFollow(state, "bob");

    expect(next.followedAuthors).toEqual([]);
  });
});

describe("isFollowing", () => {
  it("is true for an author you follow", () => {
    const state = { ...createInitialState(), followedAuthors: ["bob"] };

    expect(isFollowing(state, "bob")).toBe(true);
  });

  it("is false for an author you don't follow", () => {
    const state = createInitialState();

    expect(isFollowing(state, "bob")).toBe(false);
  });
});
