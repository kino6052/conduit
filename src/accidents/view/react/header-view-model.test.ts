import { describe, expect, it } from "bun:test";
import { compileHeaderViewModel } from "./header-view-model";

const noop = () => {};

describe("compileHeaderViewModel", () => {
  it("is the Home tab on the home page", () => {
    const headerViewModel = compileHeaderViewModel("home", noop, undefined, noop, noop, noop);

    expect(headerViewModel.isHome).toBe(true);
    expect(headerViewModel.isLogin).toBe(false);
    expect(headerViewModel.isEditor).toBe(false);
  });

  it("is not the Home tab on the article page", () => {
    const headerViewModel = compileHeaderViewModel("article", noop, undefined, noop, noop, noop);

    expect(headerViewModel.isHome).toBe(false);
  });

  it("is the Login tab on the login page", () => {
    const headerViewModel = compileHeaderViewModel("login", noop, undefined, noop, noop, noop);

    expect(headerViewModel.isLogin).toBe(true);
  });

  it("is the New Article tab on the editor page", () => {
    const headerViewModel = compileHeaderViewModel("editor", noop, "alice", noop, noop, noop);

    expect(headerViewModel.isEditor).toBe(true);
  });

  it("onHomeClick calls the given onGoHome", () => {
    let called = false;
    const headerViewModel = compileHeaderViewModel(
      "home",
      () => {
        called = true;
      },
      undefined,
      noop,
      noop,
      noop,
    );

    headerViewModel.onHomeClick();

    expect(called).toBe(true);
  });

  it("onLoginClick calls the given onLogin", () => {
    let called = false;
    const headerViewModel = compileHeaderViewModel(
      "home",
      noop,
      undefined,
      () => {
        called = true;
      },
      noop,
      noop,
    );

    headerViewModel.onLoginClick();

    expect(called).toBe(true);
  });

  it("onSignOutClick calls the given onSignOut", () => {
    let called = false;
    const headerViewModel = compileHeaderViewModel(
      "home",
      noop,
      "alice",
      noop,
      () => {
        called = true;
      },
      noop,
    );

    headerViewModel.onSignOutClick();

    expect(called).toBe(true);
  });

  it("onNewArticleClick calls the given onNewArticle", () => {
    let called = false;
    const headerViewModel = compileHeaderViewModel("home", noop, "alice", noop, noop, () => {
      called = true;
    });

    headerViewModel.onNewArticleClick();

    expect(called).toBe(true);
  });

  it("carries the signed-in name through, undefined for a guest", () => {
    expect(compileHeaderViewModel("home", noop, "alice", noop, noop, noop).signedInName).toBe(
      "alice",
    );
    expect(
      compileHeaderViewModel("home", noop, undefined, noop, noop, noop).signedInName,
    ).toBeUndefined();
  });
});
