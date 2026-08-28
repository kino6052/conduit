// THE ESSENTIAL-DEPENDENCIES COMPOSITION ROOT -- a sibling to src/index.ts
// (the real app) and src/index.essence.ts (the bare essence view), living
// at the top of src/ for the same reason both of those do: a composition
// root is where essence and a view meet, so it isn't itself "the view."
//
// src/index.ts proved every dependency composeApp needs is injectable
// (compose-app.test.ts exercises it with in-memory ones); this is that
// same proof, but actually running in a browser instead of only under
// test. Every piece of *logic* here is the full, real thing -- the same
// composeApp (src/accidents/view/react/compose-app.ts), the same essence,
// the same page components (src/accidents/view/react/pages.ts). Only the
// dependencies are swapped for their simplest, essential implementations:
// the ones with nothing behind them but a plain closure --
// createMemoryNavigation instead of createHashNavigation (no URL),
// createMemoryState instead of createRxState (no RxJS), and an
// always-confirm function instead of window.confirm (no browser dialog).
// createSignIn and loadSeedArticles already were the essential
// implementation -- there was never a second, "more real" one to choose
// between for either.
//
// The result: click through this app and every button still does exactly
// what it does in the real one -- because none of that behavior lives in
// the dependencies. It lives in composeApp and essence, unchanged. What's
// missing is what the swapped-out dependencies were actually for: the URL
// bar won't update, and a refresh loses everything. That's the essential
// contract, delivered by nothing but essential machinery.

import React, { useEffect, useState, useSyncExternalStore } from "react";
import { createInitialState, TState } from "./essence/state";
import { createMemoryNavigation } from "./accidents/navigation/navigation";
import { createSignIn } from "./accidents/sign-in/sign-in";
import { loadSeedArticles } from "./accidents/articles-io/articles-io";
import { createMemoryState } from "./accidents/state-management/state-management";
import { composeApp } from "./accidents/view/react/compose-app";
// import type -- guaranteed erased at compile time, not a runtime import.
// A plain import here would risk pulling in src/index.ts's own module
// body (a real createHashNavigation touching window.location, a real
// RxJS subject) just to borrow a type, which would defeat the point of
// this file existing at all.
import type { TDependencies } from "./index";
import {
  LoginPage,
  HomePage,
  EditorPage,
  ArticlePage,
  ProfilePage,
} from "./accidents/view/react/pages";

export function createEssentialDependenciesDependencies(): TDependencies {
  const stateManagement = createMemoryState<TState>(createInitialState());

  return {
    navigation: createMemoryNavigation(),
    signIn: createSignIn(),
    // Not window.confirm -- a real dialog is a browser accident, same
    // category as the URL bar and RxJS this composition root already
    // does without. Always confirming is the essential stand-in: nothing
    // behind it but a function that returns true.
    confirm: () => true,
    getState: stateManagement.getState,
    setState: stateManagement.setState,
    subscribe: stateManagement.subscribe,
    loadArticles: loadSeedArticles,
    view: { LoginPage, HomePage, EditorPage, ArticlePage, ProfilePage },
  };
}

export function createEssentialDependenciesApp(
  deps: TDependencies = createEssentialDependenciesDependencies(),
) {
  const { navigation, getState, setState, subscribe, loadArticles } = deps;

  loadArticles().then((articles) => {
    setState({ ...getState(), articles: [...articles, ...getState().articles] });
  });

  function useSharedState(): TState {
    const [value, setReactState] = useState(getState());
    useEffect(() => subscribe(setReactState), []);
    return value;
  }

  return function EssentialDependenciesApp() {
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
    const getCreatedAt = () => new Date().toISOString().slice(0, 10);

    return composeApp(
      deps,
      { state, page, openArticleTitle, editingArticleTitle, profileAuthorName },
      getCreatedAt,
    );
  };
}

export default createEssentialDependenciesApp();
