import { describe, expect, it } from "bun:test";
import { createInitialState, TArticle, TState } from "../../../essence/state";
import { compileProfileViewModel } from "./profile-view-model";

const alicesArticle: TArticle = {
  title: "Real World",
  summary: "s",
  body: "b",
  tags: ["x"],
  authorName: "alice",
  createdAt: "2026-01-01",
  favoritedBy: [],
};

function makeState(initial: TState) {
  let current = initial;
  const getState = () => current;
  const setState = (next: TState) => {
    current = next;
  };
  return { getState, setState };
}

const noop = () => {};

describe("compileProfileViewModel", () => {
  it("shows the author's name and only their own articles", () => {
    const bobsArticle: TArticle = { ...alicesArticle, title: "Other", authorName: "bob" };
    const { getState, setState } = makeState({
      ...createInitialState(),
      articles: [alicesArticle, bobsArticle],
    });

    const viewModel = compileProfileViewModel(
      getState(),
      "alice",
      getState,
      setState,
      noop,
      noop,
      noop,
    );

    expect(viewModel.authorName).toBe("alice");
    expect(viewModel.articlePreviewProps).toHaveLength(1);
    expect(viewModel.articlePreviewProps[0].title).toBe("Real World");
  });

  it("shows the author's bio and avatar, empty if never set", () => {
    const { getState, setState } = makeState({
      ...createInitialState(),
      articles: [alicesArticle],
      bios: [{ name: "alice", text: "I write about things." }],
      avatarUrls: [{ name: "alice", url: "https://example.com/alice.png" }],
    });

    const viewModel = compileProfileViewModel(
      getState(),
      "alice",
      getState,
      setState,
      noop,
      noop,
      noop,
    );

    expect(viewModel.bio).toBe("I write about things.");
    expect(viewModel.avatarUrl).toBe("https://example.com/alice.png");
  });

  it("isOwnProfile is true only when viewing the acting identity's own profile", () => {
    const { getState, setState } = makeState({ ...createInitialState(), articles: [alicesArticle] });

    const own = compileProfileViewModel(getState(), "you", getState, setState, noop, noop, noop);
    const someoneElses = compileProfileViewModel(
      getState(),
      "alice",
      getState,
      setState,
      noop,
      noop,
      noop,
    );

    expect(own.isOwnProfile).toBe(true);
    expect(someoneElses.isOwnProfile).toBe(false);
  });

  it("onEditSettingsClick calls the given onOpenSettings", () => {
    const { getState, setState } = makeState({ ...createInitialState(), articles: [alicesArticle] });
    let called = false;

    const viewModel = compileProfileViewModel(getState(), "you", getState, setState, noop, noop, () => {
      called = true;
    });
    viewModel.onEditSettingsClick();

    expect(called).toBe(true);
  });

  it("labels the follow button by whether you follow this author", () => {
    const { getState, setState } = makeState({ ...createInitialState(), articles: [alicesArticle] });

    const viewModel = compileProfileViewModel(
      getState(),
      "alice",
      getState,
      setState,
      noop,
      noop,
      noop,
    );

    expect(viewModel.followLabel).toBe("Follow");
  });

  it("labels the follow button Unfollow once you follow this author", () => {
    const { getState, setState } = makeState({
      ...createInitialState(),
      articles: [alicesArticle],
      followedAuthors: ["alice"],
    });

    const viewModel = compileProfileViewModel(
      getState(),
      "alice",
      getState,
      setState,
      noop,
      noop,
      noop,
    );

    expect(viewModel.followLabel).toBe("Unfollow");
  });

  it("onFollowClick toggles following this author through essence", () => {
    const { getState, setState } = makeState({ ...createInitialState(), articles: [alicesArticle] });

    const viewModel = compileProfileViewModel(
      getState(),
      "alice",
      getState,
      setState,
      noop,
      noop,
      noop,
    );
    viewModel.onFollowClick();

    expect(getState().followedAuthors).toEqual(["alice"]);
  });

  it("an article preview's onOpenClick calls the given onOpenArticle", () => {
    const { getState, setState } = makeState({ ...createInitialState(), articles: [alicesArticle] });
    let opened: string | undefined;
    const onOpenArticle = (title: string) => {
      opened = title;
    };

    const viewModel = compileProfileViewModel(
      getState(),
      "alice",
      getState,
      setState,
      onOpenArticle,
      noop,
      noop,
    );
    viewModel.articlePreviewProps[0].onOpenClick();

    expect(opened).toBe("Real World");
  });

  it("shows only the articles this author favorited, regardless of who wrote them", () => {
    const bobsArticle: TArticle = {
      ...alicesArticle,
      title: "Other",
      authorName: "bob",
      favoritedBy: ["alice"],
    };
    const { getState, setState } = makeState({
      ...createInitialState(),
      articles: [alicesArticle, bobsArticle],
    });

    const viewModel = compileProfileViewModel(
      getState(),
      "alice",
      getState,
      setState,
      noop,
      noop,
      noop,
    );

    expect(viewModel.favoritedArticlePreviewProps).toHaveLength(1);
    expect(viewModel.favoritedArticlePreviewProps[0].title).toBe("Other");
  });
});
