// THE COMPOSITION ROOT -- and src's own entry point (src/index.ts), not
// tucked inside accidents/view, because this is where essence and the
// view actually meet and get wired together; it isn't itself "the view",
// it's the one thing allowed to know about both sides. docs/code-example.md's
// shape: an RxJS BehaviorSubject (state$ -- not "store": nothing here is a
// storage mechanism, it's the essence's own state, held), getState/setState
// closing over it, a useSharedState hook wiring state$ into React, and an
// App component assembled from compileFeedViewModel + Feed.

import React, { useEffect, useState, useSyncExternalStore } from "react";
import { BehaviorSubject, skip } from "rxjs";
import { createInitialState, TState } from "./essence/state";
import { TDraftArticle } from "./essence/write";
import { editArticle } from "./essence/edit";
import { selectArticle } from "./essence/article";
import { createHashNavigation } from "./accidents/navigation/navigation-hash";
import { withConfirmation } from "./accidents/confirmation/confirmation";
import { createSignIn } from "./accidents/sign-in/sign-in";
import { loadSeedArticles } from "./accidents/articles-io/articles-io";
import {
  compileFeedViewModel,
  compilePopularTagsViewModel,
  onWriteArticle,
} from "./accidents/view/react/view-model";
import { compileArticleDetailViewModel } from "./accidents/view/react/article-view-model";
import { compileHeaderViewModel } from "./accidents/view/react/header-view-model";
import { compileSignInViewModel } from "./accidents/view/react/sign-in-view-model";
import { LoginPage, HomePage, EditorPage, ArticlePage } from "./accidents/view/react/pages";

export function createCompositionRoot() {
  const state$ = new BehaviorSubject<TState>(createInitialState());
  // Which page is showing, and which article, if any -- decided when
  // src/index.essence.ts's activeArticleTitle first drew that line, since
  // extended to real pages (src/accidents/navigation/navigation.ts).
  // Backed by the URL (src/accidents/navigation/navigation-hash.ts) rather
  // than plain component state, so back/forward and page refresh behave
  // like a real app. Created once here, same as state$ above.
  const navigation = createHashNavigation();
  const signIn = createSignIn();

  const getState = (): TState => state$.getValue();
  const setState = (next: TState): void => state$.next(next);

  // Prepopulated articles, from IO -- not baked into createInitialState
  // (essence stays IO-free), fetched once here, the same "connect to IO
  // at the composition root" shape as everything else in this file.
  // Merged in, not replacing whatever's already there, in case a real
  // backend someday makes this genuinely asynchronous and something else
  // happens first.
  loadSeedArticles().then((articles) => {
    setState({ ...getState(), articles: [...articles, ...getState().articles] });
  });

  function useSharedState(): TState {
    const [value, setReactState] = useState(state$.getValue());
    useEffect(() => {
      const subscription = state$
        .pipe(skip(1))
        .subscribe((next) => setReactState(next));
      return () => subscription.unsubscribe();
    }, []);
    return value;
  }

  return function App() {
    const state = useSharedState();
    const page = useSyncExternalStore(navigation.subscribe, navigation.getPage);
    const openArticleTitle = useSyncExternalStore(
      navigation.subscribe,
      navigation.getOpenArticleTitle,
    );
    // Which article the editor form is pre-filled with, if any -- now
    // URL-backed too (src/accidents/navigation/navigation.ts), same as
    // openArticleTitle above, so refresh/back-forward work on the editor
    // page the same way they do everywhere else.
    const editingArticleTitle = useSyncExternalStore(
      navigation.subscribe,
      navigation.getEditingArticleTitle,
    );

    // Current time is IO -- it belongs at the composition root, not inside
    // any pure view-model function or presentational component.
    const getCreatedAt = () => new Date().toISOString().slice(0, 10);

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
      return LoginPage({ headerViewModel, signInViewModel });
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

      return EditorPage({
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
            )
          : undefined;

      const viewModelOnDeleteClick = articleViewModel?.onDeleteClick;
      const handleDelete = viewModelOnDeleteClick
        ? withConfirmation("Delete this article?", window.confirm.bind(window), () => {
            viewModelOnDeleteClick();
            navigation.goHome();
          })
        : undefined;

      const commentProps = articleViewModel?.commentProps.map((comment) => ({
        ...comment,
        onDeleteClick: comment.onDeleteClick
          ? withConfirmation("Delete this comment?", window.confirm.bind(window), comment.onDeleteClick)
          : undefined,
      }));

      return ArticlePage({
        headerViewModel,
        signedInName,
        articleViewModel: articleViewModel && {
          ...articleViewModel,
          onDeleteClick: handleDelete,
          commentProps: commentProps ?? [],
        },
      });
    }

    // Home.
    const feedViewModel = compileFeedViewModel(state, getState, setState, navigation.openArticle);
    const popularTagsViewModel = compilePopularTagsViewModel(state, getState, setState);

    return HomePage({
      headerViewModel,
      popularTagsProps: popularTagsViewModel,
      feedViewModel,
    });
  };
}

export default createCompositionRoot();
