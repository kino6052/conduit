import { describe, expect, it } from "bun:test";
import { createInitialState, TArticle } from "./state";
import { isMine } from "./ownership";

const article: TArticle = {
  title: "Original Title",
  summary: "s",
  body: "b",
  tags: [],
  authorName: "you",
  createdAt: "2026-01-01",
  favoritesCount: 0,
  isFavorite: false,
};

describe("isMine", () => {
  it("is true for an article you wrote", () => {
    const state = createInitialState();

    expect(isMine(article, state)).toBe(true);
  });

  it("is false for an article someone else wrote", () => {
    const state = createInitialState();
    const someoneElses: TArticle = { ...article, authorName: "bob" };

    expect(isMine(someoneElses, state)).toBe(false);
  });
});
