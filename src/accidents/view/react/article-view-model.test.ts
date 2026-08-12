import { describe, expect, it } from "bun:test";
import { createInitialState, TArticle, TComment, TState } from "../../../essence/state";
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

function makeState(initial: TState) {
  let current = initial;
  const getState = () => current;
  const setState = (next: TState) => {
    current = next;
  };
  return { getState, setState };
}

const getCreatedAt = () => "2026-01-05";

describe("compileArticleDetailViewModel", () => {
  it("compiles the full article: body, tags, author, favorite/follow labels", () => {
    const { getState, setState } = makeState({ ...createInitialState(), articles: [article] });

    const viewModel = compileArticleDetailViewModel(getState(), "Real World", getState, setState, getCreatedAt);

    expect(viewModel?.bodyHtml).toContain("The full body text.");
    expect(viewModel?.tags).toEqual(["react"]);
    expect(viewModel?.authorName).toBe("alice");
    expect(viewModel?.favoriteLabel).toBe("Favorite (3)");
    expect(viewModel?.followLabel).toBe("Follow");
  });

  it("renders the body as markdown, not plain text", () => {
    const formatted: TArticle = { ...article, body: "This is **important**." };
    const { getState, setState } = makeState({ ...createInitialState(), articles: [formatted] });

    const viewModel = compileArticleDetailViewModel(getState(), "Real World", getState, setState, getCreatedAt);

    expect(viewModel?.bodyHtml).toContain("<strong>important</strong>");
  });

  it("returns undefined when no article matches the title", () => {
    const { getState, setState } = makeState(createInitialState());

    const viewModel = compileArticleDetailViewModel(
      getState(),
      "Nonexistent",
      getState,
      setState,
      getCreatedAt,
    );

    expect(viewModel).toBeUndefined();
  });

  it("onFavoriteClick and onFollowClick act through essence, same as the feed's", () => {
    const { getState, setState } = makeState({ ...createInitialState(), articles: [article] });

    const viewModel = compileArticleDetailViewModel(getState(), "Real World", getState, setState, getCreatedAt);
    viewModel?.onFavoriteClick();
    viewModel?.onFollowClick();

    expect(getState().articles[0].isFavorite).toBe(true);
    expect(getState().followedAuthors).toEqual(["alice"]);
  });

  it("includes comments, each attributed to who wrote them", () => {
    const comment: TComment = {
      articleTitle: "Real World",
      authorName: "bob",
      body: "Nice!",
      createdAt: "2026-01-02",
    };
    const { getState, setState } = makeState({
      ...createInitialState(),
      articles: [article],
      comments: [comment],
    });

    const viewModel = compileArticleDetailViewModel(
      getState(),
      "Real World",
      getState,
      setState,
      getCreatedAt,
    );

    expect(viewModel?.commentProps).toEqual([{ body: "Nice!", authorName: "bob" }]);
  });

  it("onCommentClick posts a comment through essence, dated by getCreatedAt", () => {
    const { getState, setState } = makeState({ ...createInitialState(), articles: [article] });

    const viewModel = compileArticleDetailViewModel(
      getState(),
      "Real World",
      getState,
      setState,
      getCreatedAt,
    );
    viewModel?.onCommentClick("Great post!");

    expect(getState().comments).toEqual([
      {
        articleTitle: "Real World",
        authorName: getState().name,
        body: "Great post!",
        createdAt: "2026-01-05",
      },
    ]);
  });

  it("gives you a delete control when you wrote the article", () => {
    const mine: TArticle = { ...article, authorName: "you" };
    const { getState, setState } = makeState({ ...createInitialState(), articles: [mine] });

    const viewModel = compileArticleDetailViewModel(
      getState(),
      "Real World",
      getState,
      setState,
      getCreatedAt,
    );

    expect(typeof viewModel?.onDeleteClick).toBe("function");
  });

  it("gives no delete control when someone else wrote the article", () => {
    const { getState, setState } = makeState({ ...createInitialState(), articles: [article] });

    const viewModel = compileArticleDetailViewModel(
      getState(),
      "Real World",
      getState,
      setState,
      getCreatedAt,
    );

    expect(viewModel?.onDeleteClick).toBeUndefined();
  });

  it("onDeleteClick, when present, removes the article through essence", () => {
    const mine: TArticle = { ...article, authorName: "you" };
    const { getState, setState } = makeState({ ...createInitialState(), articles: [mine] });

    const viewModel = compileArticleDetailViewModel(
      getState(),
      "Real World",
      getState,
      setState,
      getCreatedAt,
    );
    viewModel?.onDeleteClick?.();

    expect(getState().articles).toEqual([]);
  });
});
