import { describe, expect, it } from "bun:test";
import { createInitialState, TArticle } from "./state";
import { toggleFavorite } from "./favorite";

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

describe("toggleFavorite", () => {
  it("marks an unfavorited article as a favorite, and counts it", () => {
    const state = { ...createInitialState(), articles: [article] };

    const next = toggleFavorite(state, article.title);

    expect(next.articles[0].isFavorite).toBe(true);
    expect(next.articles[0].favoritesCount).toBe(1);
  });

  it("unmarks a favorited article, and uncounts it", () => {
    const favorited: TArticle = { ...article, isFavorite: true, favoritesCount: 1 };
    const state = { ...createInitialState(), articles: [favorited] };

    const next = toggleFavorite(state, favorited.title);

    expect(next.articles[0].isFavorite).toBe(false);
    expect(next.articles[0].favoritesCount).toBe(0);
  });

  it("leaves every other article untouched", () => {
    const other: TArticle = { ...article, title: "Other" };
    const state = { ...createInitialState(), articles: [article, other] };

    const next = toggleFavorite(state, article.title);

    expect(next.articles[1]).toEqual(other);
  });
});
