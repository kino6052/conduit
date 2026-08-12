import { describe, expect, it } from "bun:test";
import { createInitialState, TArticle, TState } from "../../../essence/state";
import { compileFeedViewModel, compilePopularTagsViewModel, onWriteArticle } from "./view-model";

const article: TArticle = {
  title: "A",
  summary: "s",
  body: "b",
  tags: ["x"],
  authorName: "alice",
  createdAt: "2026-01-01",
  favoritesCount: 0,
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

const noop = () => {};

describe("compileFeedViewModel", () => {
  it("produces one preview per visible article, with a favorite label", () => {
    const { getState, setState } = makeStore({ ...createInitialState(), articles: [article] });

    const viewModel = compileFeedViewModel(getState(), getState, setState, noop);

    expect(viewModel.articlePreviewProps).toHaveLength(1);
    expect(viewModel.articlePreviewProps[0].title).toBe("A");
    expect(viewModel.articlePreviewProps[0].favoriteLabel).toBe("Favorite (0)");
  });

  it("onFavoriteClick toggles the article's favorite state through essence", () => {
    const { getState, setState } = makeStore({ ...createInitialState(), articles: [article] });

    const viewModel = compileFeedViewModel(getState(), getState, setState, noop);
    viewModel.articlePreviewProps[0].onFavoriteClick();

    expect(getState().articles[0].isFavorite).toBe(true);
  });

  it("labels the favorite button Unfavorite once favorited", () => {
    const favorited: TArticle = { ...article, isFavorite: true, favoritesCount: 1 };
    const { getState, setState } = makeStore({ ...createInitialState(), articles: [favorited] });

    const viewModel = compileFeedViewModel(getState(), getState, setState, noop);

    expect(viewModel.articlePreviewProps[0].favoriteLabel).toBe("Unfavorite (1)");
  });

  it("labels the follow button by whether you follow the author", () => {
    const { getState, setState } = makeStore({ ...createInitialState(), articles: [article] });

    const viewModel = compileFeedViewModel(getState(), getState, setState, noop);

    expect(viewModel.articlePreviewProps[0].followLabel).toBe("Follow");
  });

  it("labels the follow button Unfollow once you follow the author", () => {
    const { getState, setState } = makeStore({
      ...createInitialState(),
      articles: [article],
      followedAuthors: ["alice"],
    });

    const viewModel = compileFeedViewModel(getState(), getState, setState, noop);

    expect(viewModel.articlePreviewProps[0].followLabel).toBe("Unfollow");
  });

  it("onFollowClick toggles following the author through essence", () => {
    const { getState, setState } = makeStore({ ...createInitialState(), articles: [article] });

    const viewModel = compileFeedViewModel(getState(), getState, setState, noop);
    viewModel.articlePreviewProps[0].onFollowClick();

    expect(getState().followedAuthors).toEqual(["alice"]);
  });

  it("onTagClick sets the active tag filter", () => {
    const { getState, setState } = makeStore({ ...createInitialState(), articles: [article] });

    const viewModel = compileFeedViewModel(getState(), getState, setState, noop);
    viewModel.articlePreviewProps[0].onTagClick("x");

    expect(getState().activeTag).toBe("x");
  });

  it("onTagClick clears the active tag filter when clicking the same tag again", () => {
    const { getState, setState } = makeStore({
      ...createInitialState(),
      articles: [article],
      activeTag: "x",
    });

    const viewModel = compileFeedViewModel(getState(), getState, setState, noop);
    viewModel.articlePreviewProps[0].onTagClick("x");

    expect(getState().activeTag).toBeNull();
  });

  it("onOpenClick calls onOpenArticle with the article's title", () => {
    const { getState, setState } = makeStore({ ...createInitialState(), articles: [article] });
    let opened: string | undefined;
    const onOpenArticle = (title: string) => {
      opened = title;
    };

    const viewModel = compileFeedViewModel(getState(), getState, setState, onOpenArticle);
    viewModel.articlePreviewProps[0].onOpenClick();

    expect(opened).toBe("A");
  });
});

describe("onWriteArticle", () => {
  it("adds a new article via essence, authored by you", () => {
    const { getState, setState } = makeStore(createInitialState());

    onWriteArticle(
      { title: "New Post", summary: "s", body: "b", tags: ["x"], createdAt: "2026-01-01" },
      getState,
      setState,
    );

    expect(getState().articles).toHaveLength(1);
    expect(getState().articles[0].title).toBe("New Post");
    expect(getState().articles[0].authorName).toBe(getState().name);
  });
});

describe("compilePopularTagsViewModel", () => {
  it("gives each popular tag a label and a click handler", () => {
    const { getState, setState } = makeStore({ ...createInitialState(), articles: [article] });

    const tagProps = compilePopularTagsViewModel(getState(), getState, setState);

    expect(tagProps).toEqual([{ label: "x", onClick: expect.any(Function) }]);
  });

  it("stays computed over every article, ignoring the current tag/lens filter", () => {
    const other: TArticle = { ...article, title: "B", tags: ["y"], authorName: "bob" };
    const { getState, setState } = makeStore({
      ...createInitialState(),
      articles: [article, other],
      activeTag: "x",
    });

    const tagProps = compilePopularTagsViewModel(getState(), getState, setState);

    expect(tagProps.map((props) => props.label)).toEqual(["x", "y"]);
  });

  it("clicking a tag sets it as the active filter, through the same onSetTag as the feed", () => {
    const { getState, setState } = makeStore({ ...createInitialState(), articles: [article] });

    const tagProps = compilePopularTagsViewModel(getState(), getState, setState);
    tagProps[0].onClick();

    expect(getState().activeTag).toBe("x");
  });
});
