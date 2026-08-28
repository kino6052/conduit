import { describe, expect, it } from "bun:test";
import { createMemoryPersistence } from "../persistence/persistence";
import { createMemorySignIn, createPersistentSignIn } from "./sign-in";

describe("createMemorySignIn", () => {
  it("starts as a guest -- no signed-in name", () => {
    const signIn = createMemorySignIn();

    expect(signIn.signedInName()).toBeUndefined();
  });

  it("signIn makes the given name the signed-in name", () => {
    const signIn = createMemorySignIn();

    signIn.signIn("alice", "whatever");

    expect(signIn.signedInName()).toBe("alice");
  });

  it("signOut clears the signed-in name -- back to a guest", () => {
    const signIn = createMemorySignIn();
    signIn.signIn("alice", "whatever");

    signIn.signOut();

    expect(signIn.signedInName()).toBeUndefined();
  });
});

describe("createPersistentSignIn", () => {
  it("starts as a guest when the given persistence has nothing saved", () => {
    const signIn = createPersistentSignIn(createMemoryPersistence());

    expect(signIn.signedInName()).toBeUndefined();
  });

  it("starts already signed in when the given persistence has a name saved", () => {
    const persistence = createMemoryPersistence<string>();
    persistence.save("alice");

    const signIn = createPersistentSignIn(persistence);

    expect(signIn.signedInName()).toBe("alice");
  });

  it("signIn saves the name to the given persistence", () => {
    const persistence = createMemoryPersistence<string>();
    const signIn = createPersistentSignIn(persistence);

    signIn.signIn("alice", "whatever");

    expect(persistence.load()).toBe("alice");
  });

  it("signOut clears the given persistence", () => {
    const persistence = createMemoryPersistence<string>();
    const signIn = createPersistentSignIn(persistence);
    signIn.signIn("alice", "whatever");

    signIn.signOut();

    expect(persistence.load()).toBeUndefined();
    expect(signIn.signedInName()).toBeUndefined();
  });
});
