import { describe, expect, it } from "bun:test";
import { createSignIn } from "./sign-in";

describe("createSignIn", () => {
  it("starts signed out", () => {
    const signIn = createSignIn();

    expect(signIn.signedIn()).toBe(false);
  });

  it("signIn marks it as signed in", () => {
    const signIn = createSignIn();

    signIn.signIn("alice", "whatever");

    expect(signIn.signedIn()).toBe(true);
  });

  it("signOut marks it as signed out again", () => {
    const signIn = createSignIn();
    signIn.signIn("alice", "whatever");

    signIn.signOut();

    expect(signIn.signedIn()).toBe(false);
  });
});
