import { describe, expect, it } from "bun:test";
import { selectPopularTags } from "./popular-tags";

describe("selectPopularTags", () => {
  it("returns tags sorted by how many articles carry them, most common first", () => {
    const articles = [{ tags: ["react", "tdd"] }, { tags: ["react"] }, { tags: ["philosophy"] }];

    expect(selectPopularTags(articles)).toEqual(["react", "tdd", "philosophy"]);
  });

  it("returns each tag once, even when many articles share it", () => {
    const articles = [{ tags: ["react"] }, { tags: ["react"] }, { tags: ["react"] }];

    expect(selectPopularTags(articles)).toEqual(["react"]);
  });

  it("returns no more than the given limit", () => {
    const articles = [{ tags: ["a"] }, { tags: ["b"] }, { tags: ["c"] }];

    expect(selectPopularTags(articles, 2)).toHaveLength(2);
  });

  it("returns an empty list when there are no articles", () => {
    expect(selectPopularTags([])).toEqual([]);
  });
});
