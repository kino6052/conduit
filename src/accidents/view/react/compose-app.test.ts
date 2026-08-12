import { describe, expect, it } from "bun:test";
import { createInitialState, TArticle, TComment, TState } from "../../../essence/state";
import { createMemoryNavigation } from "../../navigation/navigation";
import { createSignIn } from "../../sign-in/sign-in";
import { createMemoryState } from "../../state-management/state-management";
import { compileSignInViewModel } from "./sign-in-view-model";
import { composeApp, TComposeAppDependencies, TView } from "./compose-app";
import {
  TArticlePageProps,
  TEditorPageProps,
  THomePageProps,
  TLoginPageProps,
  TProfilePageProps,
} from "./pages";

// The "bare bone view models" the user asked for: no React, no rendering
// -- each page function just hands back whatever it was given, so an
// integration test can assert on the fully-computed view-model tree
// directly, the same way every other test in this repo asserts on a
// compile*ViewModel's return value.
type TAnyPageProps =
  | TLoginPageProps
  | THomePageProps
  | TEditorPageProps
  | TArticlePageProps
  | TProfilePageProps;

const identityView: TView<TAnyPageProps> = {
  LoginPage: (props) => props,
  HomePage: (props) => props,
  EditorPage: (props) => props,
  ArticlePage: (props) => props,
  ProfilePage: (props) => props,
};

const article: TArticle = {
  title: "Real World",
  summary: "s",
  body: "b",
  tags: ["x"],
  authorName: "alice",
  createdAt: "2026-01-01",
  favoritesCount: 0,
  isFavorite: false,
};

function makeDeps(
  initial: TState,
  confirm: TComposeAppDependencies<TAnyPageProps>["confirm"] = () => true,
): TComposeAppDependencies<TAnyPageProps> & { getRealState: () => TState } {
  const navigation = createMemoryNavigation();
  const signIn = createSignIn();
  const stateManagement = createMemoryState(initial);
  return {
    navigation,
    signIn,
    confirm,
    getState: stateManagement.getState,
    setState: stateManagement.setState,
    view: identityView,
    getRealState: stateManagement.getState,
  };
}

const getCreatedAt = () => "2026-02-01";

// Signs in the same way the real SignIn form does -- through the compiled
// view-model's onSignInClick, not TSignIn.signIn directly, since only the
// view-model also changes the acting identity's name through essence
// (compileSignInViewModel, sign-in-view-model.ts). Calling the contract
// directly would leave state.name untouched, which is exactly the bug
// this test file caught once (see git history) before this helper existed.
function signInAs(deps: TComposeAppDependencies<TAnyPageProps>, name: string): void {
  compileSignInViewModel(deps.signIn, deps.getState, deps.setState).onSignInClick(
    name,
    "whatever",
  );
}

describe("composeApp", () => {
  it("shows the feed on the home page, to a guest or anyone else", () => {
    const deps = makeDeps({ ...createInitialState(), articles: [article] });

    const result = composeApp(
      deps,
      { state: deps.getState(), page: "home", openArticleTitle: null, editingArticleTitle: null, profileAuthorName: null },
      getCreatedAt,
    ) as THomePageProps;

    expect(result.feedViewModel.articlePreviewProps).toHaveLength(1);
    expect(result.feedViewModel.articlePreviewProps[0].title).toBe("Real World");
    expect(result.headerViewModel.isHome).toBe(true);
  });

  it("a guest clicking Favorite on the feed goes to the login page instead of favoriting", () => {
    const deps = makeDeps({ ...createInitialState(), articles: [article] });

    const result = composeApp(
      deps,
      { state: deps.getState(), page: "home", openArticleTitle: null, editingArticleTitle: null, profileAuthorName: null },
      getCreatedAt,
    ) as THomePageProps;
    result.feedViewModel.articlePreviewProps[0].onFavoriteClick();

    expect(deps.navigation.getPage()).toBe("login");
    expect(deps.getRealState().articles[0].isFavorite).toBe(false);
  });

  it("a guest clicking Follow on the feed goes to the login page instead of following", () => {
    const deps = makeDeps({ ...createInitialState(), articles: [article] });

    const result = composeApp(
      deps,
      { state: deps.getState(), page: "home", openArticleTitle: null, editingArticleTitle: null, profileAuthorName: null },
      getCreatedAt,
    ) as THomePageProps;
    result.feedViewModel.articlePreviewProps[0].onFollowClick();

    expect(deps.navigation.getPage()).toBe("login");
    expect(deps.getRealState().followedAuthors).toEqual([]);
  });

  it("signed in, favoriting and following from the feed still work normally", () => {
    const deps = makeDeps({ ...createInitialState(), articles: [article] });
    signInAs(deps, "bob");

    const result = composeApp(
      deps,
      { state: deps.getState(), page: "home", openArticleTitle: null, editingArticleTitle: null, profileAuthorName: null },
      getCreatedAt,
    ) as THomePageProps;
    result.feedViewModel.articlePreviewProps[0].onFavoriteClick();
    result.feedViewModel.articlePreviewProps[0].onFollowClick();

    expect(deps.getRealState().articles[0].isFavorite).toBe(true);
    expect(deps.getRealState().followedAuthors).toEqual(["alice"]);
    expect(deps.navigation.getPage()).toBe("home");
  });

  it("a guest can't read an article -- same message as one that doesn't exist", () => {
    const deps = makeDeps({ ...createInitialState(), articles: [article] });

    const result = composeApp(
      deps,
      {
        state: deps.getState(),
        page: "article",
        openArticleTitle: "Real World",
        editingArticleTitle: null,
        profileAuthorName: null,
      },
      getCreatedAt,
    ) as TArticlePageProps;

    expect(result.articleViewModel).toBeUndefined();
    expect(result.signedInName).toBeUndefined();
  });

  it("signing in, then reading the article, shows its full detail", () => {
    const deps = makeDeps({ ...createInitialState(), articles: [article] });
    signInAs(deps, "bob");

    const result = composeApp(
      deps,
      {
        state: deps.getState(),
        page: "article",
        openArticleTitle: "Real World",
        editingArticleTitle: null,
        profileAuthorName: null,
      },
      getCreatedAt,
    ) as TArticlePageProps;

    expect(result.articleViewModel?.title).toBe("Real World");
    expect(result.signedInName).toBe("bob");
  });

  it("a guest gets no editor at all -- a message instead", () => {
    const deps = makeDeps(createInitialState());

    const result = composeApp(
      deps,
      { state: deps.getState(), page: "editor", openArticleTitle: null, editingArticleTitle: null, profileAuthorName: null },
      getCreatedAt,
    ) as TEditorPageProps;

    expect(result.editorProps).toBeUndefined();
  });

  it("publishing from the editor page adds the article to state, then goes home", () => {
    const deps = makeDeps(createInitialState());
    signInAs(deps, "alice");

    const result = composeApp(
      deps,
      { state: deps.getState(), page: "editor", openArticleTitle: null, editingArticleTitle: null, profileAuthorName: null },
      getCreatedAt,
    ) as TEditorPageProps;
    result.editorProps?.onClick({ title: "New Post", summary: "s", body: "b", tags: ["x"] });

    expect(deps.getRealState().articles).toHaveLength(1);
    expect(deps.getRealState().articles[0].title).toBe("New Post");
    expect(deps.getRealState().articles[0].authorName).toBe("alice");
    expect(deps.navigation.getPage()).toBe("home");
  });

  it("editing an article updates it and navigates to its (possibly renamed) page", () => {
    const deps = makeDeps({ ...createInitialState(), articles: [{ ...article, authorName: "alice" }] });
    signInAs(deps, "alice");

    const result = composeApp(
      deps,
      {
        state: deps.getState(),
        page: "editor",
        openArticleTitle: null,
        editingArticleTitle: "Real World",
        profileAuthorName: null,
      },
      getCreatedAt,
    ) as TEditorPageProps;
    result.editorProps?.onClick({
      title: "Real World (revised)",
      summary: "s2",
      body: "b2",
      tags: ["y"],
    });

    expect(deps.getRealState().articles[0].title).toBe("Real World (revised)");
    expect(deps.navigation.getPage()).toBe("article");
    expect(deps.navigation.getOpenArticleTitle()).toBe("Real World (revised)");
  });

  it("deleting your own article, once confirmed, removes it and goes home", () => {
    const deps = makeDeps(
      { ...createInitialState(), articles: [{ ...article, authorName: "alice" }] },
      () => true,
    );
    signInAs(deps, "alice");

    const result = composeApp(
      deps,
      {
        state: deps.getState(),
        page: "article",
        openArticleTitle: "Real World",
        editingArticleTitle: null,
        profileAuthorName: null,
      },
      getCreatedAt,
    ) as TArticlePageProps;
    result.articleViewModel?.onDeleteClick?.();

    expect(deps.getRealState().articles).toEqual([]);
    expect(deps.navigation.getPage()).toBe("home");
  });

  it("shows the sign-in form on the login page", () => {
    const deps = makeDeps(createInitialState());

    const result = composeApp(
      deps,
      { state: deps.getState(), page: "login", openArticleTitle: null, editingArticleTitle: null, profileAuthorName: null },
      getCreatedAt,
    ) as TLoginPageProps;

    expect(result.headerViewModel.isLogin).toBe(true);
    expect(typeof result.signInViewModel.onSignInClick).toBe("function");
  });

  it("shows nothing to read when signed in but no article title is open", () => {
    const deps = makeDeps({ ...createInitialState(), articles: [article] });
    signInAs(deps, "alice");

    const result = composeApp(
      deps,
      { state: deps.getState(), page: "article", openArticleTitle: null, editingArticleTitle: null, profileAuthorName: null },
      getCreatedAt,
    ) as TArticlePageProps;

    expect(result.articleViewModel).toBeUndefined();
  });

  it("gives no delete control to someone reading an article they didn't write", () => {
    const deps = makeDeps({ ...createInitialState(), articles: [article] });
    signInAs(deps, "bob");

    const result = composeApp(
      deps,
      {
        state: deps.getState(),
        page: "article",
        openArticleTitle: "Real World",
        editingArticleTitle: null,
        profileAuthorName: null,
      },
      getCreatedAt,
    ) as TArticlePageProps;

    expect(result.articleViewModel?.onDeleteClick).toBeUndefined();
  });

  it("gives a comment's author a delete control, and no one else one, and deletes it once confirmed", () => {
    const yours: TComment = {
      articleTitle: "Real World",
      authorName: "alice",
      body: "My own comment",
      createdAt: "2026-01-02",
    };
    const someoneElses: TComment = {
      articleTitle: "Real World",
      authorName: "bob",
      body: "Someone else's comment",
      createdAt: "2026-01-03",
    };
    const deps = makeDeps({
      ...createInitialState(),
      articles: [{ ...article, authorName: "alice" }],
      comments: [yours, someoneElses],
    });
    signInAs(deps, "alice");

    const result = composeApp(
      deps,
      {
        state: deps.getState(),
        page: "article",
        openArticleTitle: "Real World",
        editingArticleTitle: null,
        profileAuthorName: null,
      },
      getCreatedAt,
    ) as TArticlePageProps;
    const [mine, notMine] = result.articleViewModel?.commentProps ?? [];

    expect(typeof mine?.onDeleteClick).toBe("function");
    expect(notMine?.onDeleteClick).toBeUndefined();

    mine?.onDeleteClick?.();

    expect(deps.getRealState().comments).toEqual([someoneElses]);
  });

  it("does not delete when confirmation is declined", () => {
    const deps = makeDeps(
      { ...createInitialState(), articles: [{ ...article, authorName: "alice" }] },
      () => false,
    );
    signInAs(deps, "alice");

    const result = composeApp(
      deps,
      {
        state: deps.getState(),
        page: "article",
        openArticleTitle: "Real World",
        editingArticleTitle: null,
        profileAuthorName: null,
      },
      getCreatedAt,
    ) as TArticlePageProps;
    result.articleViewModel?.onDeleteClick?.();

    expect(deps.getRealState().articles).toHaveLength(1);
  });

  it("a guest can't view a profile -- sign-in message instead", () => {
    const deps = makeDeps({ ...createInitialState(), articles: [article] });

    const result = composeApp(
      deps,
      {
        state: deps.getState(),
        page: "profile",
        openArticleTitle: null,
        editingArticleTitle: null,
        profileAuthorName: "alice",
      },
      getCreatedAt,
    ) as TProfilePageProps;

    expect(result.profileViewModel).toBeUndefined();
  });

  it("signed in, viewing a profile shows that author's name and articles", () => {
    const deps = makeDeps({
      ...createInitialState(),
      articles: [article, { ...article, title: "Other", authorName: "bob" }],
    });
    signInAs(deps, "bob");

    const result = composeApp(
      deps,
      {
        state: deps.getState(),
        page: "profile",
        openArticleTitle: null,
        editingArticleTitle: null,
        profileAuthorName: "alice",
      },
      getCreatedAt,
    ) as TProfilePageProps;

    expect(result.profileViewModel?.authorName).toBe("alice");
    expect(result.profileViewModel?.articlePreviewProps).toHaveLength(1);
    expect(result.profileViewModel?.articlePreviewProps[0].title).toBe("Real World");
  });

  it("following an author from their own profile page works through essence", () => {
    const deps = makeDeps({ ...createInitialState(), articles: [article] });
    signInAs(deps, "bob");

    const result = composeApp(
      deps,
      {
        state: deps.getState(),
        page: "profile",
        openArticleTitle: null,
        editingArticleTitle: null,
        profileAuthorName: "alice",
      },
      getCreatedAt,
    ) as TProfilePageProps;
    result.profileViewModel?.onFollowClick();

    expect(deps.getRealState().followedAuthors).toEqual(["alice"]);
  });

  it("clicking an author's name on the feed opens their profile page", () => {
    const deps = makeDeps({ ...createInitialState(), articles: [article] });

    const result = composeApp(
      deps,
      { state: deps.getState(), page: "home", openArticleTitle: null, editingArticleTitle: null, profileAuthorName: null },
      getCreatedAt,
    ) as THomePageProps;
    result.feedViewModel.articlePreviewProps[0].onAuthorClick();

    expect(deps.navigation.getPage()).toBe("profile");
    expect(deps.navigation.getProfileAuthorName()).toBe("alice");
  });
});
