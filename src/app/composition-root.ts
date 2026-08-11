// THE COMPOSITION ROOT -- docs/code-example.md's shape: an RxJS
// BehaviorSubject as the store, getState/setState closing over it, a
// useSharedState hook wiring the store into React, and an App component
// assembled from compileFeedViewModel + Feed. This is where essence
// (src/essence), the view-model compiler, and the view components all
// finally meet -- nowhere else in this tree do they know about each other.

import React, { useEffect, useState } from "react";
import { BehaviorSubject, skip } from "rxjs";
import { createInitialState, TState } from "../essence/state";
import { TDraftArticle } from "../essence/write";
import { compileFeedViewModel, onWriteArticle } from "./view-model";
import { compileArticleDetailViewModel } from "./article-view-model";
import { Feed, ArticleDetail, Editor } from "./components";

export function createCompositionRoot() {
  const store = new BehaviorSubject<TState>(createInitialState());

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
    // Which article is open is navigation, not essence -- same call
    // essence-view/main.ts's activeArticleTitle already made. Local React
    // state, not routed through the essence store.
    const [openArticleTitle, setOpenArticleTitle] = useState<string | null>(null);

    const feedViewModel = compileFeedViewModel(state, getState, setState, setOpenArticleTitle);
    const articleViewModel = openArticleTitle
      ? compileArticleDetailViewModel(state, openArticleTitle, getState, setState)
      : undefined;

    // Current time is IO -- it belongs at the composition root, not inside
    // the pure Editor component or the pure onWriteArticle action runner.
    // "handlePublish" carries domain meaning deliberately -- this is the
    // one place allowed to know a click means "publish an article".
    const handlePublish = (draft: Omit<TDraftArticle, "createdAt">): void => {
      onWriteArticle(
        { ...draft, createdAt: new Date().toISOString().slice(0, 10) },
        getState,
        setState,
      );
    };

    return React.createElement(
      React.Fragment,
      null,
      React.createElement(Editor, { onClick: handlePublish }),
      React.createElement(Feed, feedViewModel),
      articleViewModel ? React.createElement(ArticleDetail, articleViewModel) : null,
    );
  };
}

export default createCompositionRoot();
