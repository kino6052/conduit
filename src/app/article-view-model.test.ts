import { describe, expect, it } from "bun:test";
import { createInitialState, TArticle, TState } from "../essence/state";
import { compileArticleDetailViewModel } from "./article-view-model";

const article: TArticle = {
  title: "Real World",
  summary: "s",
  body: "The full body text.",
  tags: ["react"],
  authorName: "alice",
  createdAt: "2026-01-01",
  favoritesCount: 3,
  isFavorite: false,
};

function makeStore(initial: TState) {
  let current = initial;
  const getState = () => current;
  const setState = (next: TState) => {
    current = next;
  };
  return { getState, setState };
}

describe("compileArticleDetailViewModel", () => {
  it("compiles the full article: body, tags, author, favorite/follow labels", () => {
    const { getState, setState } = makeStore({ ...createInitialState(), articles: [article] });

    const viewModel = compileArticleDetailViewModel(getState(), "Real World", getState, setState);

    expect(viewModel?.body).toBe("The full body text.");
    expect(viewModel?.tags).toEqual(["react"]);
    expect(viewModel?.authorName).toBe("alice");
    expect(viewModel?.favoriteLabel).toBe("Favorite (3)");
    expect(viewModel?.followLabel).toBe("Follow");
  });

  it("returns undefined when no article matches the title", () => {
    const { getState, setState } = makeStore(createInitialState());

    const viewModel = compileArticleDetailViewModel(
      getState(),
      "Nonexistent",
      getState,
      setState,
    );

    expect(viewModel).toBeUndefined();
  });

  it("onFavoriteClick and onFollowClick act through essence, same as the feed's", () => {
    const { getState, setState } = makeStore({ ...createInitialState(), articles: [article] });

    const viewModel = compileArticleDetailViewModel(getState(), "Real World", getState, setState);
    viewModel?.onFavoriteClick();
    viewModel?.onFollowClick();

    expect(getState().articles[0].isFavorite).toBe(true);
    expect(getState().followedAuthors).toEqual(["alice"]);
  });
});
