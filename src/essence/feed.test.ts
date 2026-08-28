import { describe, expect, it } from "bun:test";
import { createInitialState, TArticle } from "./state";
import { selectVisibleArticles } from "./feed";

const article: TArticle = {
  title: "Real World",
  summary: "A demo app",
  body: "...",
  tags: [],
  authorName: "alice",
  createdAt: "2026-01-01",
  favoritedBy: [],
};

describe("selectVisibleArticles", () => {
  it("shows every article on the global feed", () => {
    const state = { ...createInitialState(), articles: [article] };

    expect(selectVisibleArticles(state)).toEqual([article]);
  });

  it("only shows articles carrying the active tag", () => {
    const tagged: TArticle = { ...article, title: "Tagged", tags: ["react"] };
    const untagged: TArticle = { ...article, title: "Untagged", tags: [] };
    const state = {
      ...createInitialState(),
      articles: [tagged, untagged],
      activeTag: "react",
    };

    expect(selectVisibleArticles(state)).toEqual([tagged]);
  });

  it("only shows articles by authors you follow, on your personal feed", () => {
    const followed: TArticle = { ...article, title: "Followed", authorName: "bob" };
    const stranger: TArticle = { ...article, title: "Stranger", authorName: "carol" };
    const state = {
      ...createInitialState(),
      articles: [followed, stranger],
      followedAuthors: ["bob"],
      filterName: "personal" as const,
    };

    expect(selectVisibleArticles(state)).toEqual([followed]);
  });
});
