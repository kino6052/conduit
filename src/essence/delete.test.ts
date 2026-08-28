import { describe, expect, it } from "bun:test";
import { createInitialState, TArticle } from "./state";
import { deleteArticle } from "./delete";

const article: TArticle = {
  title: "Original Title",
  summary: "Original summary",
  body: "Original body",
  tags: ["original"],
  authorName: "you",
  createdAt: "2026-01-01",
  favoritesCount: 4,
  isFavorite: true,
};

describe("deleteArticle", () => {
  it("removes the article", () => {
    const state = { ...createInitialState(), articles: [article] };

    const next = deleteArticle(state, article.title);

    expect(next.articles).toEqual([]);
  });

  it("leaves every other article untouched", () => {
    const other: TArticle = { ...article, title: "Other" };
    const state = { ...createInitialState(), articles: [article, other] };

    const next = deleteArticle(state, article.title);

    expect(next.articles).toEqual([other]);
  });
});
