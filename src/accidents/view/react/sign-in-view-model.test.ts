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
  it("starts as a guest", () => {
    const { getState, setState } = makeState(createInitialState());
    const signIn = createSignIn();

    const signInViewModel = compileSignInViewModel(signIn, getState, setState);

    expect(signInViewModel.signedInName).toBeUndefined();
  });

  it("onSignInClick signs in and changes the acting identity's name through essence", () => {
    const { getState, setState } = makeState(createInitialState());
    const signIn = createSignIn();

    const signInViewModel = compileSignInViewModel(signIn, getState, setState);
    signInViewModel.onSignInClick("alice", "whatever");

    expect(getState().name).toBe("alice");
    expect(compileSignInViewModel(signIn, getState, setState).signedInName).toBe("alice");
  });

  it("onSignOutClick clears the signed-in name -- back to a guest -- without changing the acting identity's name", () => {
    const { getState, setState } = makeState(createInitialState());
    const signIn = createSignIn();
    signIn.signIn("alice", "whatever");
    setState({ ...getState(), name: "alice" });

    const signInViewModel = compileSignInViewModel(signIn, getState, setState);
    signInViewModel.onSignOutClick();

    expect(compileSignInViewModel(signIn, getState, setState).signedInName).toBeUndefined();
    expect(getState().name).toBe("alice");
  });
});
