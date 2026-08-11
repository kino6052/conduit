import { describe, expect, it } from "bun:test";
import { createInitialState, TArticle } from "../essence/state";
import { createInitialPaginationState, selectVisiblePage } from "./pagination-state";

const article = (title: string): TArticle => ({
  title,
  summary: "s",
  body: "b",
  tags: [],
  authorName: "alice",
  createdAt: "2026-01-01",
  favoritesCount: 0,
  isFavorite: false,
});

describe("createInitialPaginationState", () => {
  it("wraps the essence state without altering it, starting on page 1", () => {
    const essence = { ...createInitialState(), articles: [article("A")] };

    const state = createInitialPaginationState(essence);

    expect(state.articles).toBe(essence.articles);
    expect(state.page).toBe(1);
    expect(state.pageSize).toBe(10);
  });
});

describe("selectVisiblePage", () => {
  it("returns just the current page of the essence's visible articles", () => {
    const essence = {
      ...createInitialState(),
      articles: [article("A"), article("B"), article("C")],
    };
    const state = { ...createInitialPaginationState(essence), pageSize: 2 };

    expect(selectVisiblePage(state)).toEqual([article("A"), article("B")]);
  });

  it("still applies the essence's own filtering underneath (tag, personal feed, ...)", () => {
    const essence = {
      ...createInitialState(),
      articles: [{ ...article("A"), tags: ["react"] }, article("B")],
      activeTag: "react",
    };
    const state = createInitialPaginationState(essence);

    expect(selectVisiblePage(state)).toEqual([{ ...article("A"), tags: ["react"] }]);
  });
});
