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
import { TState } from "./essence/state";
import { createHashNavigation } from "./accidents/navigation/navigation-hash";
import { createPersistentSignIn } from "./accidents/sign-in/sign-in";
import { createLocalStoragePersistence } from "./accidents/persistence/persistence-local-storage";
import { loadSeedArticles } from "./accidents/articles-io/articles-io";
import { createRxState } from "./accidents/state-management/state-management";
import { composeApp, TComposeAppDependencies } from "./accidents/view/react/compose-app";
import { createInitialLoadingState, TLoadingState } from "./accidents/backend-sync/loading-state";
import { computeSyncActions } from "./accidents/backend-sync/backend-sync";
import {
  executeSyncActions,
  hydrateStateFromBackend,
} from "./accidents/backend-sync/backend-sync-client";
import {
  LoginPage,
  HomePage,
  EditorPage,
  ArticlePage,
  ProfilePage,
  SettingsPage,
} from "./accidents/view/react/pages";

// Hosting/deployment is still undecided (docs/realworld-essence-checklist.md's
// "Underlying technology"); this is local dev only for now, same as every
// scripts/serve-*.ts port being hardcoded rather than configurable.
const BACKEND_URL = "http://localhost:4325";

export type TDependencies = TComposeAppDependencies<React.ReactElement> & {
  // Not part of composeApp's own dependencies (it only ever needs
  // getState/setState, same ISP discipline as every compile*ViewModel).
  // Vestigial for the real app now that hydrateStateFromBackend populates
  // initial state instead (see createDefaultDependencies below) -- kept
  // in this shared shape only because index.essential-dependencies.ts's
  // own composition root still genuinely needs it (there's no backend in
  // that one, deliberately -- see that file's own header comment).
  loadArticles: typeof loadSeedArticles;
  subscribe: (listener: (state: TState) => void) => () => void;
};

export function createDefaultDependencies(): TDependencies {
  const stateManagement = createRxState<TLoadingState>(createInitialLoadingState());
  const signIn = createPersistentSignIn(
    createLocalStoragePersistence<string>("conduit-signed-in-name"),
  );

  // Exposed as TSetState -- (next: TState) => void, composeApp's own
  // contract -- not (next: TLoadingState) => void, even though that's
  // what this actually needs: TState is the wider type (isLoaderShown
  // stripped), so a function narrower than that couldn't satisfy
  // TComposeAppDependencies' contravariant parameter position. The cast
  // below is safe in practice, not just in principle: every real call
  // site in this app builds `next` by spreading the TLoadingState-shaped
  // value getState() already handed back (every compile*ViewModel/
  // essence mutator does exactly that), so isLoaderShown always survives
  // the round trip even though composeApp and every view-model only ever
  // see it through the narrower TState type.
  //
  // Every setState call, once real (post-hydration) state exists on both
  // sides of it, also persists whatever changed to the backend --
  // computeSyncActions (pure, tested, backend-sync.ts) figures out what;
  // executeSyncActions (real IO, backend-sync-client.ts) actually calls
  // it. Skipped while either side is still the loading state: there's
  // nothing meaningful to diff before hydration, and diffing the
  // hydration-completion call itself would see every fetched article as
  // brand new and try to re-create them all on the very backend they just
  // came from.
  const setState = (next: TState): void => {
    const nextLoadingState = next as TLoadingState;
    const previous = stateManagement.getState();
    stateManagement.setState(nextLoadingState);
    if (!previous.isLoaderShown && !nextLoadingState.isLoaderShown) {
      executeSyncActions(BACKEND_URL, computeSyncActions(previous, nextLoadingState));
    }
  };

  // The signed-in name (if any survived a reload) is already known
  // synchronously, from localStorage -- used here to fetch *that* name's
  // own following list as part of the same hydration call, rather than a
  // separate restoreSignedInIdentity step afterward (essence's acting
  // identity is set directly from whatever hydrateStateFromBackend
  // resolves with, correct from the very first real render).
  hydrateStateFromBackend(BACKEND_URL, signIn.signedInName() ?? undefined).then((hydrated) => {
    stateManagement.setState({ ...hydrated, isLoaderShown: false });
  });

  return {
    navigation: createHashNavigation(),
    signIn,
    confirm: window.confirm.bind(window),
    getState: stateManagement.getState,
    setState,
    subscribe: stateManagement.subscribe,
    loadArticles: loadSeedArticles,
    view: { LoginPage, HomePage, EditorPage, ArticlePage, ProfilePage, SettingsPage },
  };
}

export function createCompositionRoot(deps: TDependencies = createDefaultDependencies()) {
  const { navigation, getState, subscribe } = deps;

  function useSharedState(): TLoadingState {
    const [value, setReactState] = useState(getState() as TLoadingState);
    useEffect(() => subscribe(setReactState as (state: TState) => void), []);
    return value;
  }

  return function App() {
    // Every hook this component ever calls runs unconditionally, every
    // render, in this same order -- React's own rule, not this codebase's.
    // The loading check (below) only decides what gets *returned*, never
    // whether a hook runs, so isLoaderShown flipping from true to false
    // between renders can't change the hook count.
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

    // Nothing real to show yet -- the initial fetch from the backend is
    // still in flight (createInitialLoadingState's own isLoaderShown, set
    // back to false once hydrateStateFromBackend resolves, above). Not a
    // page composeApp knows about: this is an accident-level concern, one
    // level above TState, same reasoning as loading-state.ts's own header
    // comment.
    if (state.isLoaderShown) {
      return React.createElement("p", { className: "page" }, "Loading…");
    }

    return composeApp(
      deps,
      { state, page, openArticleTitle, editingArticleTitle, profileAuthorName },
      getCreatedAt,
    );
  };
}

export default createCompositionRoot();
