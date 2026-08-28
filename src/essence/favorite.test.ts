import { describe, expect, it } from "bun:test";
import { createInitialState, TArticle } from "./state";
import { toggleFavorite, isFavoritedBy, selectArticlesFavoritedBy } from "./favorite";

const article: TArticle = {
  title: "Real World",
  summary: "A demo app",
  body: "...",
  tags: [],
  authorName: "alice",
  createdAt: "2026-01-01",
  favoritedBy: [],
};

describe("toggleFavorite", () => {
  it("adds the acting identity's name to an unfavorited article's favoritedBy", () => {
    const state = { ...createInitialState(), articles: [article] };

    const next = toggleFavorite(state, article.title);

    expect(next.articles[0].favoritedBy).toEqual([state.name]);
  });

  it("removes the acting identity's name from a favorited article's favoritedBy", () => {
    const favorited: TArticle = { ...article, favoritedBy: ["you"] };
    const state = { ...createInitialState(), articles: [favorited] };

    const next = toggleFavorite(state, favorited.title);

    expect(next.articles[0].favoritedBy).toEqual([]);
  });

  it("leaves every other name in favoritedBy untouched", () => {
    const favorited: TArticle = { ...article, favoritedBy: ["bob"] };
    const state = { ...createInitialState(), articles: [favorited] };

    const next = toggleFavorite(state, favorited.title);

    expect(next.articles[0].favoritedBy).toEqual(["bob", "you"]);
  });

  it("leaves every other article untouched", () => {
    const other: TArticle = { ...article, title: "Other" };
    const state = { ...createInitialState(), articles: [article, other] };

    const next = toggleFavorite(state, article.title);

    expect(next.articles[1]).toEqual(other);
  });
});

describe("isFavoritedBy", () => {
  it("is true when the given name is in favoritedBy", () => {
    const favorited: TArticle = { ...article, favoritedBy: ["alice"] };

    expect(isFavoritedBy(favorited, "alice")).toBe(true);
  });

  it("is false when the given name isn't in favoritedBy", () => {
    expect(isFavoritedBy(article, "alice")).toBe(false);
  });
});

describe("selectArticlesFavoritedBy", () => {
  it("finds every article a given name favorited, regardless of who wrote it", () => {
    const bobsArticle: TArticle = {
      ...article,
      title: "Other",
      authorName: "bob",
      favoritedBy: ["alice"],
    };
    const state = { ...createInitialState(), articles: [article, bobsArticle] };

    expect(selectArticlesFavoritedBy(state, "alice")).toEqual([bobsArticle]);
  });

  it("finds nothing for a name that hasn't favorited anything", () => {
    const state = { ...createInitialState(), articles: [article] };

    expect(selectArticlesFavoritedBy(state, "nobody")).toEqual([]);
  });
});
