import { describe, expect, it } from "bun:test";
import { createSignIn } from "./sign-in";

describe("createSignIn", () => {
  it("starts as a guest -- no signed-in name", () => {
    const signIn = createSignIn();

    expect(signIn.signedInName()).toBeUndefined();
  });

  it("signIn makes the given name the signed-in name", () => {
    const signIn = createSignIn();

    signIn.signIn("alice", "whatever");

    expect(signIn.signedInName()).toBe("alice");
  });

  it("signOut clears the signed-in name -- back to a guest", () => {
    const signIn = createSignIn();
    signIn.signIn("alice", "whatever");

    signIn.signOut();

    expect(signIn.signedInName()).toBeUndefined();
  });
});
