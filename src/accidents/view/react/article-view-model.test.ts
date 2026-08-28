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
  favoritedBy: ["bob", "carol", "dave"],
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

    const viewModel = compileArticleDetailViewModel(getState(), "Real World", getState, setState, getCreatedAt, () => {}, () => {});

    expect(viewModel?.bodyHtml).toContain("The full body text.");
    expect(viewModel?.tags).toEqual(["react"]);
    expect(viewModel?.authorName).toBe("alice");
    expect(viewModel?.toggleButtonProps.label).toBe("Favorite (3)");
    expect(viewModel?.buttonProps.label).toBe("Follow");
  });

  it("carries the author's avatar through, empty if they never set one", () => {
    const { getState, setState } = makeState({
      ...createInitialState(),
      articles: [article],
      avatarUrls: [{ name: "alice", url: "https://example.com/alice.png" }],
    });

    const viewModel = compileArticleDetailViewModel(getState(), "Real World", getState, setState, getCreatedAt, () => {}, () => {});

    expect(viewModel?.avatarUrl).toBe("https://example.com/alice.png");
  });

  it("renders the body as markdown, not plain text", () => {
    const formatted: TArticle = { ...article, body: "This is **important**." };
    const { getState, setState } = makeState({ ...createInitialState(), articles: [formatted] });

    const viewModel = compileArticleDetailViewModel(getState(), "Real World", getState, setState, getCreatedAt, () => {}, () => {});

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
      () => {},
      () => {},
    );

    expect(viewModel).toBeUndefined();
  });

  it("the toggle and follow buttons act through essence, same as the feed's", () => {
    const { getState, setState } = makeState({ ...createInitialState(), articles: [article] });

    const viewModel = compileArticleDetailViewModel(getState(), "Real World", getState, setState, getCreatedAt, () => {}, () => {});
    viewModel?.toggleButtonProps.onClick();
    viewModel?.buttonProps.onClick();

    expect(getState().articles[0].favoritedBy).toContain(getState().name);
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
      () => {},
      () => {},
    );

    expect(viewModel?.commentProps).toHaveLength(1);
    expect(viewModel?.commentProps[0].body).toBe("Nice!");
    expect(viewModel?.commentProps[0].authorName).toBe("bob");
  });

  it("carries a commenter's avatar through, empty if they never set one", () => {
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
      avatarUrls: [{ name: "bob", url: "https://example.com/bob.png" }],
    });

    const viewModel = compileArticleDetailViewModel(
      getState(),
      "Real World",
      getState,
      setState,
      getCreatedAt,
      () => {},
      () => {},
    );

    expect(viewModel?.commentProps[0].avatarUrl).toBe("https://example.com/bob.png");
  });

  it("gives you a delete control on a comment you wrote", () => {
    const yours: TComment = {
      articleTitle: "Real World",
      authorName: "you",
      body: "My own comment",
      createdAt: "2026-01-02",
    };
    const { getState, setState } = makeState({
      ...createInitialState(),
      articles: [article],
      comments: [yours],
    });

    const viewModel = compileArticleDetailViewModel(
      getState(),
      "Real World",
      getState,
      setState,
      getCreatedAt,
      () => {},
      () => {},
    );

    expect(typeof viewModel?.commentProps[0].onDeleteClick).toBe("function");
  });

  it("gives no delete control on someone else's comment", () => {
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
      () => {},
      () => {},
    );

    expect(viewModel?.commentProps[0].onDeleteClick).toBeUndefined();
  });

  it("a comment's onDeleteClick, when present, removes it through essence", () => {
    const yours: TComment = {
      articleTitle: "Real World",
      authorName: "you",
      body: "My own comment",
      createdAt: "2026-01-02",
    };
    const { getState, setState } = makeState({
      ...createInitialState(),
      articles: [article],
      comments: [yours],
    });

    const viewModel = compileArticleDetailViewModel(
      getState(),
      "Real World",
      getState,
      setState,
      getCreatedAt,
      () => {},
      () => {},
    );
    viewModel?.commentProps[0].onDeleteClick?.();

    expect(getState().comments).toEqual([]);
  });

  it("onCommentClick posts a comment through essence, dated by getCreatedAt", () => {
    const { getState, setState } = makeState({ ...createInitialState(), articles: [article] });

    const viewModel = compileArticleDetailViewModel(
      getState(),
      "Real World",
      getState,
      setState,
      getCreatedAt,
      () => {},
      () => {},
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
      () => {},
      () => {},
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
      () => {},
      () => {},
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
      () => {},
      () => {},
    );
    viewModel?.onDeleteClick?.();

    expect(getState().articles).toEqual([]);
  });

  it("gives you an edit control when you wrote the article", () => {
    const mine: TArticle = { ...article, authorName: "you" };
    const { getState, setState } = makeState({ ...createInitialState(), articles: [mine] });

    const viewModel = compileArticleDetailViewModel(
      getState(),
      "Real World",
      getState,
      setState,
      getCreatedAt,
      () => {},
      () => {},
    );

    expect(typeof viewModel?.onEditClick).toBe("function");
  });

  it("gives no edit control when someone else wrote the article", () => {
    const { getState, setState } = makeState({ ...createInitialState(), articles: [article] });

    const viewModel = compileArticleDetailViewModel(
      getState(),
      "Real World",
      getState,
      setState,
      getCreatedAt,
      () => {},
      () => {},
    );

    expect(viewModel?.onEditClick).toBeUndefined();
  });

  it("onEditClick, when present, calls the given onEditArticle with the article's title", () => {
    const mine: TArticle = { ...article, authorName: "you" };
    const { getState, setState } = makeState({ ...createInitialState(), articles: [mine] });
    let editedTitle: string | undefined;

    const viewModel = compileArticleDetailViewModel(
      getState(),
      "Real World",
      getState,
      setState,
      getCreatedAt,
      (title) => {
        editedTitle = title;
      },
      () => {},
    );
    viewModel?.onEditClick?.();

    expect(editedTitle).toBe("Real World");
  });

  it("onAuthorClick calls the given onOpenProfile with the article's author name", () => {
    const { getState, setState } = makeState({ ...createInitialState(), articles: [article] });
    let opened: string | undefined;

    const viewModel = compileArticleDetailViewModel(
      getState(),
      "Real World",
      getState,
      setState,
      getCreatedAt,
      () => {},
      (authorName) => {
        opened = authorName;
      },
    );
    viewModel?.onAuthorClick();

    expect(opened).toBe("alice");
  });

  it("a comment's onAuthorClick calls the given onOpenProfile with the comment's author name", () => {
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
    let opened: string | undefined;

    const viewModel = compileArticleDetailViewModel(
      getState(),
      "Real World",
      getState,
      setState,
      getCreatedAt,
      () => {},
      (authorName) => {
        opened = authorName;
      },
    );
    viewModel?.commentProps[0].onAuthorClick();

    expect(opened).toBe("bob");
  });
});
