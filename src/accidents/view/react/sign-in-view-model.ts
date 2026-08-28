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
