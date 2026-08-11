import { describe, expect, it } from "bun:test";
import { createMemoryNavigation } from "./navigation";

describe("createMemoryNavigation", () => {
  it("starts with no article open", () => {
    const navigation = createMemoryNavigation();

    expect(navigation.getOpenArticleTitle()).toBeNull();
  });

  it("opens an article", () => {
    const navigation = createMemoryNavigation();

    navigation.openArticle("Real World");

    expect(navigation.getOpenArticleTitle()).toBe("Real World");
  });

  it("closes the open article", () => {
    const navigation = createMemoryNavigation();
    navigation.openArticle("Real World");

    navigation.closeArticle();

    expect(navigation.getOpenArticleTitle()).toBeNull();
  });

  it("notifies subscribers when the open article changes", () => {
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
