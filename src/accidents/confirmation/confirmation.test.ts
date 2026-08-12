import { describe, expect, it } from "bun:test";
import { withConfirmation } from "./confirmation";

describe("withConfirmation", () => {
  it("calls the action when confirmed", () => {
    let called = false;

    const guarded = withConfirmation("Are you sure?", () => true, () => {
      called = true;
    });
    guarded();

    expect(called).toBe(true);
  });

  it("does not call the action when not confirmed", () => {
    let called = false;

    const guarded = withConfirmation("Are you sure?", () => false, () => {
      called = true;
    });
    guarded();

    expect(called).toBe(false);
  });

  it("asks with the exact message given", () => {
    let askedWith = "";

    const guarded = withConfirmation(
      "Delete this article?",
      (message) => {
        askedWith = message;
        return true;
      },
      () => {},
    );
    guarded();

    expect(askedWith).toBe("Delete this article?");
  });
});
