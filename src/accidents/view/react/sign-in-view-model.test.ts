import { describe, expect, it } from "bun:test";
import { createInitialState, TState } from "../../../essence/state";
import { createSignIn } from "../../sign-in/sign-in";
import { compileSignInViewModel } from "./sign-in-view-model";

function makeState(initial: TState) {
  let current = initial;
  const getState = () => current;
  const setState = (next: TState) => {
    current = next;
  };
  return { getState, setState };
}

describe("compileSignInViewModel", () => {
  it("starts signed out", () => {
    const { getState, setState } = makeState(createInitialState());
    const signIn = createSignIn();

    const signInViewModel = compileSignInViewModel(signIn, getState(), getState, setState);

    expect(signInViewModel.signedIn).toBe(false);
  });

  it("onSignInClick signs in and changes the acting identity's name through essence", () => {
    const { getState, setState } = makeState(createInitialState());
    const signIn = createSignIn();

    const signInViewModel = compileSignInViewModel(signIn, getState(), getState, setState);
    signInViewModel.onSignInClick("alice", "whatever");

    expect(getState().name).toBe("alice");
    expect(compileSignInViewModel(signIn, getState(), getState, setState).signedIn).toBe(true);
  });

  it("onSignOutClick signs back out, without changing the acting identity's name", () => {
    const { getState, setState } = makeState(createInitialState());
    const signIn = createSignIn();
    signIn.signIn("alice", "whatever");
    setState({ ...getState(), name: "alice" });

    const signInViewModel = compileSignInViewModel(signIn, getState(), getState, setState);
    signInViewModel.onSignOutClick();

    expect(compileSignInViewModel(signIn, getState(), getState, setState).signedIn).toBe(false);
    expect(getState().name).toBe("alice");
  });

  it("shows the acting identity's current name", () => {
    const { getState, setState } = makeState({ ...createInitialState(), name: "alice" });
    const signIn = createSignIn();

    const signInViewModel = compileSignInViewModel(signIn, getState(), getState, setState);

    expect(signInViewModel.name).toBe("alice");
  });
});
