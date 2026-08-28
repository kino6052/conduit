import { describe, expect, it } from "bun:test";
import { createMemoryNavigation } from "./navigation";

describe("createMemoryNavigation", () => {
  it("starts on the home page, with no article open", () => {
    const navigation = createMemoryNavigation();

    expect(navigation.getPage()).toBe("home");
    expect(navigation.getOpenArticleTitle()).toBeNull();
  });

  it("opens an article -- the article page", () => {
    const navigation = createMemoryNavigation();

    navigation.openArticle("Real World");

    expect(navigation.getPage()).toBe("article");
    expect(navigation.getOpenArticleTitle()).toBe("Real World");
  });

  it("goHome returns to the home page and closes the open article", () => {
    const navigation = createMemoryNavigation();
    navigation.openArticle("Real World");

    navigation.goHome();

    expect(navigation.getPage()).toBe("home");
    expect(navigation.getOpenArticleTitle()).toBeNull();
  });

  it("openLogin opens the login page", () => {
    const navigation = createMemoryNavigation();

    navigation.openLogin();

    expect(navigation.getPage()).toBe("login");
  });

  it("opening an article from the login page leaves the login page", () => {
    const navigation = createMemoryNavigation();
    navigation.openLogin();

    navigation.openArticle("Real World");

    expect(navigation.getPage()).toBe("article");
  });

  it("openEditor with no title opens the editor page for a new article", () => {
    const navigation = createMemoryNavigation();

    navigation.openEditor();

    expect(navigation.getPage()).toBe("editor");
    expect(navigation.getEditingArticleTitle()).toBeNull();
  });

  it("openEditor with a title opens the editor page pre-filled for that article", () => {
    const navigation = createMemoryNavigation();

    navigation.openEditor("Real World");

    expect(navigation.getPage()).toBe("editor");
    expect(navigation.getEditingArticleTitle()).toBe("Real World");
  });

  it("goHome leaves the editor page and clears which article was being edited", () => {
    const navigation = createMemoryNavigation();
    navigation.openEditor("Real World");

    navigation.goHome();

    expect(navigation.getPage()).toBe("home");
    expect(navigation.getEditingArticleTitle()).toBeNull();
  });

  it("opening an article closes the editor", () => {
    const navigation = createMemoryNavigation();
    navigation.openEditor("Real World");

    navigation.openArticle("Real World");

    expect(navigation.getEditingArticleTitle()).toBeNull();
  });

  it("openProfile opens that author's profile page", () => {
    const navigation = createMemoryNavigation();

    navigation.openProfile("alice");

    expect(navigation.getPage()).toBe("profile");
    expect(navigation.getProfileAuthorName()).toBe("alice");
  });

  it("goHome leaves the profile page", () => {
    const navigation = createMemoryNavigation();
    navigation.openProfile("alice");

    navigation.goHome();

    expect(navigation.getPage()).toBe("home");
    expect(navigation.getProfileAuthorName()).toBeNull();
  });

  it("opening an article closes the profile page", () => {
    const navigation = createMemoryNavigation();
    navigation.openProfile("alice");

    navigation.openArticle("Real World");

    expect(navigation.getProfileAuthorName()).toBeNull();
  });

  it("notifies subscribers when the page changes", () => {
    const navigation = createMemoryNavigation();
    let notifications = 0;
    navigation.subscribe(() => {
      notifications += 1;
    });

    navigation.openArticle("Real World");

    expect(notifications).toBe(1);
  });

  it("stops notifying once unsubscribed", () => {
    const navigation = createMemoryNavigation();
    let notifications = 0;
    const unsubscribe = navigation.subscribe(() => {
      notifications += 1;
    });
    unsubscribe();

    navigation.openArticle("Real World");

    expect(notifications).toBe(0);
  });
});
