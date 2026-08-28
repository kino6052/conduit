import { describe, expect, it } from "bun:test";
import { createInitialState, TState } from "../../../essence/state";
import { createMemorySignIn } from "../../sign-in/sign-in";
import { compileSignInViewModel, restoreSignedInIdentity } from "./sign-in-view-model";

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
    const signIn = createMemorySignIn();

    const signInViewModel = compileSignInViewModel(signIn, getState, setState);

    expect(signInViewModel.signedInName).toBeUndefined();
  });

  it("onSignInClick signs in and changes the acting identity's name through essence", () => {
    const { getState, setState } = makeState(createInitialState());
    const signIn = createMemorySignIn();

    const signInViewModel = compileSignInViewModel(signIn, getState, setState);
    signInViewModel.onSignInClick("alice", "whatever");

    expect(getState().name).toBe("alice");
    expect(compileSignInViewModel(signIn, getState, setState).signedInName).toBe("alice");
  });

  it("onSignOutClick clears the signed-in name -- back to a guest -- without changing the acting identity's name", () => {
    const { getState, setState } = makeState(createInitialState());
    const signIn = createMemorySignIn();
    signIn.signIn("alice", "whatever");
    setState({ ...getState(), name: "alice" });

    const signInViewModel = compileSignInViewModel(signIn, getState, setState);
    signInViewModel.onSignOutClick();

    expect(compileSignInViewModel(signIn, getState, setState).signedInName).toBeUndefined();
    expect(getState().name).toBe("alice");
  });
});

describe("restoreSignedInIdentity", () => {
  it("does nothing for a guest -- no signed-in name to restore", () => {
    const { getState, setState } = makeState(createInitialState());
    const signIn = createMemorySignIn();

    restoreSignedInIdentity(signIn, getState, setState);

    expect(getState().name).toBe(createInitialState().name);
  });

  it("changes the acting identity's name to match an already-signed-in name", () => {
    const { getState, setState } = makeState(createInitialState());
    const signIn = createMemorySignIn();
    signIn.signIn("alice", "whatever");

    restoreSignedInIdentity(signIn, getState, setState);

    expect(getState().name).toBe("alice");
  });
});
