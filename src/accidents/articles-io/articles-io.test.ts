import { describe, expect, it } from "bun:test";
import { loadSeedArticles } from "./articles-io";

describe("loadSeedArticles", () => {
  it("resolves to more than one article", async () => {
    const articles = await loadSeedArticles();

    expect(articles.length).toBeGreaterThan(1);
  });

  it("connects multiple articles to the same authors, not one-off names", async () => {
    const articles = await loadSeedArticles();

    const authorNames = articles.map((article) => article.authorName);
    const uniqueAuthors = new Set(authorNames);
    // Fewer distinct authors than articles means at least one author wrote
    // more than one -- a small, connected community, not isolated one-off
    // names each appearing exactly once.
    expect(uniqueAuthors.size).toBeLessThan(articles.length);
  });

  it("every article has the shape essence expects, and isn't already favorited by a fresh visitor", async () => {
    const articles = await loadSeedArticles();

    for (const article of articles) {
      expect(typeof article.title).toBe("string");
      expect(article.title.length).toBeGreaterThan(0);
      expect(typeof article.authorName).toBe("string");
      expect(Array.isArray(article.tags)).toBe(true);
      // "you" -- createInitialState's default acting identity -- never
      // appears; the seed data connects alice/bob/carol/dave/erin/frank
      // to each other, not to whoever's about to load the app fresh.
      expect(article.favoritedBy).not.toContain("you");
    }
  });

  it("resolves a fresh array each call -- callers own what they do with it", async () => {
    const first = await loadSeedArticles();
    first.push({
      title: "Mutated",
      summary: "s",
      body: "b",
      tags: [],
      authorName: "eve",
      createdAt: "2026-01-01",
      favoritedBy: [],
    });

    const second = await loadSeedArticles();

    expect(second.some((article) => article.title === "Mutated")).toBe(false);
  });
});
