import { describe, expect, it } from "bun:test";
import { createInitialState, TArticle } from "./state";
import { selectArticle } from "./article";

const article: TArticle = {
  title: "Real World",
  summary: "A demo app",
  body: "...",
  tags: [],
  authorName: "alice",
  createdAt: "2026-01-01",
  favoritesCount: 0,
  isFavorite: false,
};

describe("selectArticle", () => {
  it("finds the article you're looking at, by its title", () => {
    const state = { ...createInitialState(), articles: [article] };

    expect(selectArticle(state, article.title)).toEqual(article);
  });
});
