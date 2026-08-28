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

  it("on your own profile, the one button opens Settings", () => {
    const { getState, setState } = makeState({ ...createInitialState(), articles: [alicesArticle] });
    let openedSettings = false;

    const viewModel = compileProfileViewModel(getState(), "you", getState, setState, noop, noop, () => {
      openedSettings = true;
    });

    expect(viewModel.buttonProps.label).toBe("Edit Profile Settings");
    viewModel.buttonProps.onClick();
    expect(openedSettings).toBe(true);
  });

  it("on someone else's profile, the one button follows/unfollows them instead", () => {
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

    expect(viewModel.buttonProps.label).toBe("Follow");
  });

  it("labels the button Unfollow once you follow this author", () => {
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

    expect(viewModel.buttonProps.label).toBe("Unfollow");
  });

  it("on someone else's profile, the button toggles following them through essence", () => {
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
    viewModel.buttonProps.onClick();

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
