// Own file, same reasoning as header-view-model.ts: this is a different
// derived composite (docs/solid-in-this-repo.md) than the feed's -- being
// signed in is navigation-adjacent state, not essence, even though signing
// in also changes essence's own TState.name through changeName.

import { TState } from "../../../essence/state";
import { changeName } from "../../../essence/name";
import { TSignIn } from "../../sign-in/sign-in";
import { TGetState, TSetState } from "./view-model";

export type TSignInViewModel = {
  signedIn: boolean;
  name: string;
  onSignInClick: (name: string, password: string) => void;
  onSignOutClick: () => void;
};

export function compileSignInViewModel(
  signIn: TSignIn,
  state: TState,
  getState: TGetState,
  setState: TSetState,
): TSignInViewModel {
  return {
    signedIn: signIn.signedIn(),
    name: state.name,
    onSignInClick: (name: string, password: string) => {
      signIn.signIn(name, password);
      setState(changeName(getState(), name));
    },
    onSignOutClick: () => {
      signIn.signOut();
    },
  };
}
