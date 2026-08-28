// THE COMPOSITION ROOT -- and src's own entry point (src/index.ts), not
// tucked inside accidents/view, because this is where essence and the
// view actually meet and get wired together; it isn't itself "the view",
// it's the one thing allowed to know about both sides.
//
// This file itself stays thin and untested (vitest.config.mts's coverage
// exclude, same as always) -- it does two things: build the real app's
// dependencies (browser-backed navigation, RxJS-backed state, the real
// page components) and adapt React's hooks into the plain snapshot
// composeApp needs. All the actual composition logic --
// which page, what props, how signing in/deleting/publishing compose
// essence with navigation -- lives in composeApp
// (src/accidents/view/react/compose-app.ts), fully tested without React
// at all. createCompositionRoot takes an optional TDependencies so a test
// can build the whole App with in-memory navigation, in-memory state, and
// bare bone view models instead -- see compose-app.test.ts for exactly
// that.

import React, { useEffect, useState, useSyncExternalStore } from "react";
import { createInitialState, TState } from "./essence/state";
import { createHashNavigation } from "./accidents/navigation/navigation-hash";
import { createPersistentSignIn } from "./accidents/sign-in/sign-in";
import { createLocalStoragePersistence } from "./accidents/persistence/persistence-local-storage";
import { loadSeedArticles } from "./accidents/articles-io/articles-io";
import { createRxState } from "./accidents/state-management/state-management";
import { composeApp, TComposeAppDependencies } from "./accidents/view/react/compose-app";
import { restoreSignedInIdentity } from "./accidents/view/react/sign-in-view-model";
import {
  LoginPage,
  HomePage,
  EditorPage,
  ArticlePage,
  ProfilePage,
} from "./accidents/view/react/pages";

export type TDependencies = TComposeAppDependencies<React.ReactElement> & {
  // Not part of composeApp's own dependencies (it only ever needs
  // getState/setState, same ISP discipline as every compile*ViewModel) --
  // this is what fetches the initial articles once, before composeApp is
  // ever called.
  loadArticles: typeof loadSeedArticles;
  subscribe: (listener: (state: TState) => void) => () => void;
};

export function createDefaultDependencies(): TDependencies {
  const stateManagement = createRxState<TState>(createInitialState());
  const signIn = createPersistentSignIn(
    createLocalStoragePersistence<string>("conduit-signed-in-name"),
  );

  // If the signed-in name survived a reload, essence's own acting
  // identity has to match it immediately -- otherwise ownership (isMine)
  // would keep comparing against createInitialState's default "you"
  // instead of whoever's actually signed in.
  restoreSignedInIdentity(signIn, stateManagement.getState, stateManagement.setState);

  return {
    navigation: createHashNavigation(),
    signIn,
    confirm: window.confirm.bind(window),
    getState: stateManagement.getState,
    setState: stateManagement.setState,
    subscribe: stateManagement.subscribe,
    loadArticles: loadSeedArticles,
    view: { LoginPage, HomePage, EditorPage, ArticlePage, ProfilePage },
  };
}

export function createCompositionRoot(deps: TDependencies = createDefaultDependencies()) {
  const { navigation, getState, setState, subscribe, loadArticles } = deps;

  // Prepopulated articles, from IO -- not baked into createInitialState
  // (essence stays IO-free), fetched once here, the same "connect to IO
  // at the composition root" shape as everything else in this file.
  // Merged in, not replacing whatever's already there, in case a real
  // backend someday makes this genuinely asynchronous and something else
  // happens first.
  loadArticles().then((articles) => {
    setState({ ...getState(), articles: [...articles, ...getState().articles] });
  });

  function useSharedState(): TState {
    const [value, setReactState] = useState(getState());
    useEffect(() => subscribe(setReactState), []);
    return value;
  }

  return function App() {
    const state = useSharedState();
    const page = useSyncExternalStore(navigation.subscribe, navigation.getPage);
    const openArticleTitle = useSyncExternalStore(
      navigation.subscribe,
      navigation.getOpenArticleTitle,
    );
    const editingArticleTitle = useSyncExternalStore(
      navigation.subscribe,
      navigation.getEditingArticleTitle,
    );
    const profileAuthorName = useSyncExternalStore(
      navigation.subscribe,
      navigation.getProfileAuthorName,
    );
    // Current time is IO -- it belongs at the composition root, not inside
    // composeApp or any presentational component.
    const getCreatedAt = () => new Date().toISOString().slice(0, 10);

    return composeApp(
      deps,
      { state, page, openArticleTitle, editingArticleTitle, profileAuthorName },
      getCreatedAt,
    );
  };
}

export default createCompositionRoot();
