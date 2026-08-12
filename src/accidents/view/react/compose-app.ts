// The composition logic src/index.ts's App component used to hold
// directly, pulled out so it can be tested without React at all: no
// hooks, no rendering, just plain data in and (via the injected view) a
// caller-chosen shape out. src/index.ts becomes a thin adapter reading
// React hooks into a snapshot and handing everything else to composeApp.
//
// The view itself is a dependency (TView<R>), same as navigation/sign-in/
// confirm below it -- production wires in the real page components
// (src/accidents/view/react/pages.ts), a test can wire in "bare bone
// view models" instead: functions that just return the props they were
// given, so an integration test asserts on the computed view-model tree
// directly, no rendering involved. R is generic rather than
// React.ReactElement so this file doesn't need to import React at all.

import { TState } from "../../../essence/state";
import { TDraftArticle } from "../../../essence/write";
import { editArticle } from "../../../essence/edit";
import { selectArticle } from "../../../essence/article";
import { TNavigation, TPage } from "../../navigation/navigation";
import { TSignIn } from "../../sign-in/sign-in";
import { TConfirm, withConfirmation } from "../../confirmation/confirmation";
import {
  TGetState,
  TSetState,
  compileFeedViewModel,
  compilePopularTagsViewModel,
  onWriteArticle,
} from "./view-model";
import { compileArticleDetailViewModel } from "./article-view-model";
import { compileHeaderViewModel } from "./header-view-model";
import { compileSignInViewModel } from "./sign-in-view-model";
import { compileProfileViewModel } from "./profile-view-model";
import {
  TArticlePageProps,
  TEditorPageProps,
  THomePageProps,
  TLoginPageProps,
  TProfilePageProps,
} from "./pages";

export type TView<R> = {
  LoginPage: (props: TLoginPageProps) => R;
  HomePage: (props: THomePageProps) => R;
  EditorPage: (props: TEditorPageProps) => R;
  ArticlePage: (props: TArticlePageProps) => R;
  ProfilePage: (props: TProfilePageProps) => R;
};

export type TComposeAppDependencies<R> = {
  navigation: TNavigation;
  signIn: TSignIn;
  confirm: TConfirm;
  getState: TGetState;
  setState: TSetState;
  view: TView<R>;
};

// Everything a React hook would otherwise read directly (useSharedState,
// useSyncExternalStore) -- passed in as plain data instead, so this
// function needs no hooks of its own.
export type TAppSnapshot = {
  state: TState;
  page: TPage;
  openArticleTitle: string | null;
  editingArticleTitle: string | null;
  // Meaningful only when page === "profile".
  profileAuthorName: string | null;
};

export function composeApp<R>(
  deps: TComposeAppDependencies<R>,
  snapshot: TAppSnapshot,
  getCreatedAt: () => string,
): R {
  const { navigation, signIn, confirm, getState, setState, view } = deps;
  const { state, page, openArticleTitle, editingArticleTitle, profileAuthorName } = snapshot;

  const signInViewModel = compileSignInViewModel(signIn, getState, setState);
  const signedInName = signInViewModel.signedInName;

  // Signing out also leaves wherever you were -- Article/New Article
  // stop being reachable for a guest, same as the page-level gating
  // below.
  const onSignOutClick = (): void => {
    signInViewModel.onSignOutClick();
    navigation.goHome();
  };
  const headerViewModel = compileHeaderViewModel(
    page,
    navigation.goHome,
    signedInName,
    navigation.openLogin,
    onSignOutClick,
    () => navigation.openEditor(),
  );

  if (page === "login") {
    return view.LoginPage({ headerViewModel, signInViewModel });
  }

  if (page === "editor") {
    // Publishing and saving edits are the same click, told apart by
    // whether the editor is currently pre-filled -- same "one form, two
    // actions" shape as essence-view's publish-article/save-article.
    const editingArticle = editingArticleTitle
      ? selectArticle(state, editingArticleTitle)
      : undefined;
    const onEditorSubmit = (draft: Omit<TDraftArticle, "createdAt">): void => {
      if (editingArticleTitle) {
        setState(editArticle(getState(), editingArticleTitle, draft));
        // Off to see the result, not back to a blank form -- the title
        // might have changed, so navigate to whatever it's called now.
        navigation.openArticle(draft.title);
      } else {
        onWriteArticle({ ...draft, createdAt: getCreatedAt() }, getState, setState);
        navigation.goHome();
      }
    };

    return view.EditorPage({
      headerViewModel,
      // undefined for a guest -- no Editor at all, same rule as the
      // article page below (write access requires a signed-in name).
      editorProps: signedInName
        ? {
            title: editingArticle?.title,
            summary: editingArticle?.summary,
            body: editingArticle?.body,
            tags: editingArticle?.tags,
            onClick: onEditorSubmit,
          }
        : undefined,
      editorKey: editingArticleTitle ?? "new",
    });
  }

  if (page === "article") {
    // Reading an article's full detail requires a signed-in name --
    // docs/realworld-essence-checklist.md: "article is only available
    // when name is present." A guest gets the same "nothing to read
    // here" as a nonexistent article; the page doesn't tell those two
    // apart.
    const articleViewModel =
      signedInName && openArticleTitle
        ? compileArticleDetailViewModel(
            state,
            openArticleTitle,
            getState,
            setState,
            getCreatedAt,
            navigation.openEditor,
            navigation.openProfile,
          )
        : undefined;

    const viewModelOnDeleteClick = articleViewModel?.onDeleteClick;
    const handleDelete = viewModelOnDeleteClick
      ? withConfirmation("Delete this article?", confirm, () => {
          viewModelOnDeleteClick();
          navigation.goHome();
        })
      : undefined;

    // Not "commentProps ?? []" -- commentProps is only ever missing when
    // articleViewModel is too, and that already short-circuits the whole
    // articleViewModel: articleViewModel && {...} below before this would
    // run. Written as its own branch instead, so both paths are real and
    // reachable, not one of them dead code standing in for a type the
    // optional chain above couldn't rule out on its own.
    const commentProps = articleViewModel
      ? articleViewModel.commentProps.map((comment) => ({
          ...comment,
          onDeleteClick: comment.onDeleteClick
            ? withConfirmation("Delete this comment?", confirm, comment.onDeleteClick)
            : undefined,
        }))
      : [];

    return view.ArticlePage({
      headerViewModel,
      signedInName,
      articleViewModel: articleViewModel && {
        ...articleViewModel,
        onDeleteClick: handleDelete,
        commentProps,
      },
    });
  }

  if (page === "profile") {
    // Same rule as reading an article: viewing a profile requires a
    // signed-in name (docs/realworld-essence-checklist.md, "What a guest
    // can and can't do"). Unlike the article page, there's no second
    // "doesn't exist" case to tell apart -- an author isn't an entity
    // that can fail to exist the way an article can, so undefined here
    // means exactly one thing.
    const profileViewModel =
      signedInName && profileAuthorName
        ? compileProfileViewModel(
            state,
            profileAuthorName,
            getState,
            setState,
            navigation.openArticle,
            navigation.openProfile,
          )
        : undefined;

    return view.ProfilePage({ headerViewModel, profileViewModel });
  }

  // Home.
  const feedViewModel = compileFeedViewModel(
    state,
    getState,
    setState,
    navigation.openArticle,
    navigation.openProfile,
  );
  const popularTagsViewModel = compilePopularTagsViewModel(state, getState, setState);

  // Favoriting/following require a signed-in name, same as writing and
  // reading a full article -- a guest clicking either goes to the login
  // page instead of the click silently mutating essence under whatever
  // name state.name happens to still hold from a previous session
  // (essence has no concept of "no one," Part 1 item 6). Opening an
  // article and filtering by tag stay unrestricted -- browsing itself was
  // never gated, only acting.
  const articlePreviewProps = signedInName
    ? feedViewModel.articlePreviewProps
    : feedViewModel.articlePreviewProps.map((preview) => ({
        ...preview,
        onFavoriteClick: navigation.openLogin,
        onFollowClick: navigation.openLogin,
      }));

  return view.HomePage({
    headerViewModel,
    popularTagsProps: popularTagsViewModel,
    feedViewModel: { ...feedViewModel, articlePreviewProps },
  });
}
