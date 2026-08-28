// Own file, same reasoning as header-view-model.ts: this is a different
// derived composite (docs/solid-in-this-repo.md) than the feed's -- being
// signed in is navigation-adjacent state, not essence, even though signing
// in also changes essence's own TState.name through changeName.

import { changeName } from "../../../essence/name";
import { TSignIn } from "../../sign-in/sign-in";
import { TGetState, TSetState } from "./view-model";

export type TSignInViewModel = {
  // undefined -- a guest -- not a separate isGuest/signedIn flag. Whatever
  // reads this (a page deciding what it can show, the header deciding
  // what to render) checks presence, same as onDeleteClick elsewhere.
  signedInName: string | undefined;
  onSignInClick: (name: string, password: string) => void;
  onSignOutClick: () => void;
};

export function compileSignInViewModel(
  signIn: TSignIn,
  getState: TGetState,
  setState: TSetState,
): TSignInViewModel {
  return {
    signedInName: signIn.signedInName(),
    onSignInClick: (name: string, password: string) => {
      signIn.signIn(name, password);
      setState(changeName(getState(), name));
    },
    onSignOutClick: () => {
      signIn.signOut();
    },
  };
}

// A signed-in name can now survive a reload (createPersistentSignIn,
// src/accidents/sign-in/sign-in.ts) -- but essence's own acting identity
// doesn't know that on its own. Call this once at startup to pair them
// the same way onSignInClick above always does, or ownership (isMine)
// would keep comparing against createInitialState's default "you"
// instead of whoever's actually signed in. A no-op for a guest.
export function restoreSignedInIdentity(
  signIn: TSignIn,
  getState: TGetState,
  setState: TSetState,
): void {
  const restoredName = signIn.signedInName();
  if (restoredName) {
    setState(changeName(getState(), restoredName));
  }
}
