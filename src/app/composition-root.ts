// THE COMPOSITION ROOT -- docs/code-example.md's shape: an RxJS
// BehaviorSubject as the store, getState/setState closing over it, a
// useSharedState hook wiring the store into React, and an App component
// assembled from compileFeedViewModel + Feed. This is where essence
// (src/essence), the view-model compiler, and the view components all
// finally meet -- nowhere else in this tree do they know about each other.

import React, { useEffect, useState, useSyncExternalStore } from "react";
import { BehaviorSubject, skip } from "rxjs";
import { createInitialState, TState } from "../essence/state";
import { TDraftArticle } from "../essence/write";
import { createHashNavigation } from "../accidents/navigation-hash";
import { compileFeedViewModel, onWriteArticle } from "./view-model";
import { compileArticleDetailViewModel } from "./article-view-model";
import { Feed, ArticleDetail, Editor } from "./components";

export function createCompositionRoot() {
  const store = new BehaviorSubject<TState>(createInitialState());
  // Which article is open is navigation, not essence -- decided when
  // essence-view/main.ts's activeArticleTitle first drew that line. Backed
  // by the URL (src/accidents/navigation-hash.ts) rather than plain
  // component state, so back/forward and page refresh behave like a real
  // app. Created once here, same as the essence store above.
  const navigation = createHashNavigation();

  const getState = (): TState => store.getValue();
  const setState = (next: TState): void => store.next(next);

  function useSharedState(): TState {
    const [value, setReactState] = useState(store.getValue());
    useEffect(() => {
      const subscription = store.pipe(skip(1)).subscribe((next) => setReactState(next));
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

    const feedViewModel = compileFeedViewModel(state, getState, setState, navigation.openArticle);
    const articleViewModel = openArticleTitle
      ? compileArticleDetailViewModel(state, openArticleTitle, getState, setState, getCreatedAt)
      : undefined;

    // "handlePublish" carries domain meaning deliberately -- this is the
    // one place allowed to know a click means "publish an article".
    const handlePublish = (draft: Omit<TDraftArticle, "createdAt">): void => {
      onWriteArticle({ ...draft, createdAt: getCreatedAt() }, getState, setState);
    };

    // Composes two concerns the view-model can't see at once: essence
    // (delete the article) and navigation (stop viewing something that no
    // longer exists). Overrides the view-model's own onDeleteClick, which
    // only knows the essence half.
    const handleDelete = (): void => {
      articleViewModel?.onDeleteClick();
      navigation.closeArticle();
    };

    return React.createElement(
      React.Fragment,
      null,
      React.createElement(Editor, { onClick: handlePublish }),
      React.createElement(Feed, feedViewModel),
      articleViewModel
        ? React.createElement(ArticleDetail, { ...articleViewModel, onDeleteClick: handleDelete })
        : null,
    );
  };
}

export default createCompositionRoot();
