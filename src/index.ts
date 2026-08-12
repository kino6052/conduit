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
import { createHashNavigation } from "./accidents/navigation/navigation-hash";
import { withConfirmation } from "./accidents/confirmation/confirmation";
import { createSignIn } from "./accidents/sign-in/sign-in";
import {
  compileFeedViewModel,
  compileNameFormViewModel,
  compilePopularTagsViewModel,
  onWriteArticle,
} from "./accidents/view/react/view-model";
import { compileArticleDetailViewModel } from "./accidents/view/react/article-view-model";
import { compileHeaderViewModel } from "./accidents/view/react/header-view-model";
import { compileSignInViewModel } from "./accidents/view/react/sign-in-view-model";
import {
  Feed,
  ArticleDetail,
  Editor,
  Header,
  NameForm,
  PopularTags,
  SignIn,
} from "./accidents/view/react/components";

export function createCompositionRoot() {
  const state$ = new BehaviorSubject<TState>(createInitialState());
  // Which article is open is navigation, not essence -- decided when
  // src/index.essence.ts's activeArticleTitle first drew that line. Backed
  // by the URL (src/accidents/navigation/navigation-hash.ts) rather than plain
  // component state, so back/forward and page refresh behave like a real
  // app. Created once here, same as state$ above.
  const navigation = createHashNavigation();
  const signIn = createSignIn();

  const getState = (): TState => state$.getValue();
  const setState = (next: TState): void => state$.next(next);

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
    const openArticleTitle = useSyncExternalStore(
      navigation.subscribe,
      navigation.getOpenArticleTitle,
    );

    // Current time is IO -- it belongs at the composition root, not inside
    // any pure view-model function or presentational component.
    const getCreatedAt = () => new Date().toISOString().slice(0, 10);

    const headerViewModel = compileHeaderViewModel(openArticleTitle, navigation.closeArticle);
    const signInViewModel = compileSignInViewModel(signIn, state, getState, setState);
    const nameFormViewModel = compileNameFormViewModel(state, getState, setState);
    const feedViewModel = compileFeedViewModel(
      state,
      getState,
      setState,
      navigation.openArticle,
    );
    const popularTagsViewModel = compilePopularTagsViewModel(state, getState, setState);
    const articleViewModel = openArticleTitle
      ? compileArticleDetailViewModel(
          state,
          openArticleTitle,
          getState,
          setState,
          getCreatedAt,
        )
      : undefined;

    // "onPublishArticleButtonClick" we need to make sure we don't reify anything -
    // clicks, buttons, texts are the only perceivable things so we
    const onPublishArticleButtonClick = (
      draft: Omit<TDraftArticle, "createdAt">,
    ): void => {
      onWriteArticle(
        { ...draft, createdAt: getCreatedAt() },
        getState,
        setState,
      );
    };

    // Composes two concerns the view-model can't see at once: essence
    // (delete the article) and navigation (stop viewing something that no
    // longer exists) -- plus a confirmation prompt in front of both. Only
    // wraps the view-model's own onDeleteClick when it exists -- undefined
    // means "not yours," and that has to survive the wrap, or the Delete
    // button would render for everyone.
    const viewModelOnDeleteClick = articleViewModel?.onDeleteClick;
    const handleDelete = viewModelOnDeleteClick
      ? withConfirmation("Delete this article?", window.confirm.bind(window), () => {
          viewModelOnDeleteClick();
          navigation.closeArticle();
        })
      : undefined;

    return React.createElement(
      React.Fragment,
      null,
      React.createElement(Header, headerViewModel),
      React.createElement(
        "div",
        { className: "page" },
        React.createElement(SignIn, signInViewModel),
        React.createElement(NameForm, nameFormViewModel),
        React.createElement(Editor, { onClick: onPublishArticleButtonClick }),
        PopularTags(popularTagsViewModel),
        React.createElement(Feed, feedViewModel),
        articleViewModel
          ? React.createElement(ArticleDetail, {
              ...articleViewModel,
              onDeleteClick: handleDelete,
            })
          : null,
      ),
    );
  };
}

export default createCompositionRoot();
