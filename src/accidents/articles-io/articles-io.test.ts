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

  it("every article has the shape essence expects", async () => {
    const articles = await loadSeedArticles();

    for (const article of articles) {
      expect(typeof article.title).toBe("string");
      expect(article.title.length).toBeGreaterThan(0);
      expect(typeof article.authorName).toBe("string");
      expect(Array.isArray(article.tags)).toBe(true);
      expect(article.isFavorite).toBe(false);
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
      favoritesCount: 0,
      isFavorite: false,
    });

    const second = await loadSeedArticles();

    expect(second.some((article) => article.title === "Mutated")).toBe(false);
  });
});
