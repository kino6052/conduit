import { describe, expect, it } from "bun:test";
import { compileHeaderViewModel } from "./header-view-model";

const noop = () => {};

describe("compileHeaderViewModel", () => {
  it("is the Home tab on the home page", () => {
    const headerViewModel = compileHeaderViewModel("home", noop, undefined, noop, noop);

    expect(headerViewModel.isHome).toBe(true);
    expect(headerViewModel.isLogin).toBe(false);
  });

  it("is not the Home tab on the article page", () => {
    const headerViewModel = compileHeaderViewModel("article", noop, undefined, noop, noop);

    expect(headerViewModel.isHome).toBe(false);
  });

  it("is the Login tab on the login page", () => {
    const headerViewModel = compileHeaderViewModel("login", noop, undefined, noop, noop);

    expect(headerViewModel.isLogin).toBe(true);
  });

  it("onHomeClick calls the given onGoHome", () => {
    let called = false;
    const headerViewModel = compileHeaderViewModel("home", () => {
      called = true;
    }, undefined, noop, noop);

    headerViewModel.onHomeClick();

    expect(called).toBe(true);
  });

  it("onLoginClick calls the given onLogin", () => {
    let called = false;
    const headerViewModel = compileHeaderViewModel("home", noop, undefined, () => {
      called = true;
    }, noop);

    headerViewModel.onLoginClick();

    expect(called).toBe(true);
  });

  it("onSignOutClick calls the given onSignOut", () => {
    let called = false;
    const headerViewModel = compileHeaderViewModel("home", noop, "alice", noop, () => {
      called = true;
    });

    headerViewModel.onSignOutClick();

    expect(called).toBe(true);
  });

  it("carries the signed-in name through, undefined for a guest", () => {
    expect(compileHeaderViewModel("home", noop, "alice", noop, noop).signedInName).toBe("alice");
    expect(compileHeaderViewModel("home", noop, undefined, noop, noop).signedInName).toBeUndefined();
  });
});
