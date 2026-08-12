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
    // Which article the editor form is pre-filled with, if any -- title,
    // not an id, same rule as everywhere else articles are identified.
    // Purely a view concern (not navigation: it isn't backed by the URL,
    // same as essence-view's editingArticleTitle in src/index.essence.ts),
    // so plain component state rather than the navigation contract.
    const [editingArticleTitle, setEditingArticleTitle] = useState<string | null>(null);

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
          setEditingArticleTitle,
        )
      : undefined;
    const editingArticle = editingArticleTitle
      ? selectArticle(state, editingArticleTitle)
      : undefined;

    // Publishing and saving edits are the same click, told apart by
    // whether the editor is currently pre-filled -- same "one form, two
    // actions" shape as essence-view's publish-article/save-article.
    const onEditorSubmit = (draft: Omit<TDraftArticle, "createdAt">): void => {
      if (editingArticleTitle) {
        setState(editArticle(getState(), editingArticleTitle, draft));
        setEditingArticleTitle(null);
      } else {
        onWriteArticle({ ...draft, createdAt: getCreatedAt() }, getState, setState);
      }
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

    // Same confirmation wrap as the article's own delete above, one comment
    // at a time -- only wraps a comment's onDeleteClick when it exists, same
    // "undefined has to survive the wrap" reasoning.
    const commentProps = articleViewModel?.commentProps.map((comment) => ({
      ...comment,
      onDeleteClick: comment.onDeleteClick
        ? withConfirmation("Delete this comment?", window.confirm.bind(window), comment.onDeleteClick)
        : undefined,
    }));

    return React.createElement(
      React.Fragment,
      null,
      React.createElement(Header, headerViewModel),
      React.createElement(
        "div",
        { className: "page" },
        React.createElement(SignIn, signInViewModel),
        React.createElement(NameForm, nameFormViewModel),
        React.createElement(Editor, {
          key: editingArticleTitle ?? "new",
          title: editingArticle?.title,
          summary: editingArticle?.summary,
          body: editingArticle?.body,
          tags: editingArticle?.tags,
          onClick: onEditorSubmit,
        }),
        PopularTags(popularTagsViewModel),
        React.createElement(Feed, feedViewModel),
        articleViewModel
          ? React.createElement(ArticleDetail, {
              ...articleViewModel,
              onDeleteClick: handleDelete,
              commentProps: commentProps ?? [],
            })
          : null,
      ),
    );
  };
}

export default createCompositionRoot();
