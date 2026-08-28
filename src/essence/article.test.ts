import { describe, expect, it } from "bun:test";
import { createInitialState, TArticle } from "./state";
import { selectArticle, selectArticlesByAuthor } from "./article";

const article: TArticle = {
  title: "Real World",
  summary: "A demo app",
  body: "...",
  tags: [],
  authorName: "alice",
  createdAt: "2026-01-01",
  favoritedBy: [],
};

describe("selectArticle", () => {
  it("finds the article you're looking at, by its title", () => {
    const state = { ...createInitialState(), articles: [article] };

    expect(selectArticle(state, article.title)).toEqual(article);
  });
});

describe("selectArticlesByAuthor", () => {
  it("finds every article a given author wrote", () => {
    const bobsArticle: TArticle = { ...article, title: "Other", authorName: "bob" };
    const state = { ...createInitialState(), articles: [article, bobsArticle] };

    expect(selectArticlesByAuthor(state, "alice")).toEqual([article]);
  });

  it("finds nothing for an author who hasn't written anything", () => {
    const state = { ...createInitialState(), articles: [article] };

    expect(selectArticlesByAuthor(state, "nobody")).toEqual([]);
  });
});
