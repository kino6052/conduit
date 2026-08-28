import { describe, expect, it } from "bun:test";
import { compileHeaderViewModel } from "./header-view-model";

const noop = () => {};

describe("compileHeaderViewModel", () => {
  it("is the Home tab on the home page", () => {
    const headerViewModel = compileHeaderViewModel(
      "home",
      noop,
      undefined,
      "",
      noop,
      noop,
      noop,
      noop,
    );

    expect(headerViewModel.isHome).toBe(true);
    expect(headerViewModel.isLogin).toBe(false);
    expect(headerViewModel.isEditor).toBe(false);
  });

  it("is not the Home tab on the article page", () => {
    const headerViewModel = compileHeaderViewModel(
      "article",
      noop,
      undefined,
      "",
      noop,
      noop,
      noop,
      noop,
    );

    expect(headerViewModel.isHome).toBe(false);
  });

  it("is the Login tab on the login page", () => {
    const headerViewModel = compileHeaderViewModel(
      "login",
      noop,
      undefined,
      "",
      noop,
      noop,
      noop,
      noop,
    );

    expect(headerViewModel.isLogin).toBe(true);
  });

  it("is the New Article tab on the editor page", () => {
    const headerViewModel = compileHeaderViewModel(
      "editor",
      noop,
      "alice",
      "",
      noop,
      noop,
      noop,
      noop,
    );

    expect(headerViewModel.isEditor).toBe(true);
  });

  it("is the Settings tab on the settings page", () => {
    const headerViewModel = compileHeaderViewModel(
      "settings",
      noop,
      "alice",
      "",
      noop,
      noop,
      noop,
      noop,
    );

    expect(headerViewModel.isSettings).toBe(true);
  });

  it("onHomeClick calls the given onGoHome", () => {
    let called = false;
    const headerViewModel = compileHeaderViewModel(
      "home",
      () => {
        called = true;
      },
      undefined,
      "",
      noop,
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
      "",
      () => {
        called = true;
      },
      noop,
      noop,
      noop,
    );

    headerViewModel.onLoginClick();

    expect(called).toBe(true);
  });

  it("onProfileClick calls the given onProfile", () => {
    let called = false;
    const headerViewModel = compileHeaderViewModel(
      "home",
      noop,
      "alice",
      "",
      noop,
      noop,
      noop,
      () => {
        called = true;
      },
    );

    headerViewModel.onProfileClick();

    expect(called).toBe(true);
  });

  it("onNewArticleClick calls the given onNewArticle", () => {
    let called = false;
    const headerViewModel = compileHeaderViewModel(
      "home",
      noop,
      "alice",
      "",
      noop,
      () => {
        called = true;
      },
      noop,
      noop,
    );

    headerViewModel.onNewArticleClick();

    expect(called).toBe(true);
  });

  it("onSettingsClick calls the given onSettings", () => {
    let called = false;
    const headerViewModel = compileHeaderViewModel("home", noop, "alice", "", noop, noop, () => {
      called = true;
    }, noop);

    headerViewModel.onSettingsClick();

    expect(called).toBe(true);
  });

  it("carries the signed-in name and avatar through, empty for a guest", () => {
    const signedIn = compileHeaderViewModel(
      "home",
      noop,
      "alice",
      "https://example.com/alice.png",
      noop,
      noop,
      noop,
      noop,
    );
    const guest = compileHeaderViewModel("home", noop, undefined, "", noop, noop, noop, noop);

    expect(signedIn.signedInName).toBe("alice");
    expect(signedIn.avatarUrl).toBe("https://example.com/alice.png");
    expect(guest.signedInName).toBeUndefined();
    expect(guest.avatarUrl).toBe("");
  });
});
