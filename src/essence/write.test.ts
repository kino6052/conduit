import { describe, expect, it } from "bun:test";
import { createInitialState } from "./state";
import { writeArticle } from "./write";

describe("writeArticle", () => {
  it("adds a new article, authored by you", () => {
    const state = createInitialState();

    const next = writeArticle(state, {
      title: "New Post",
      summary: "Summary",
      body: "Body text",
      tags: ["life"],
      createdAt: "2026-01-10",
    });

    expect(next.articles).toEqual([
      {
        title: "New Post",
        summary: "Summary",
        body: "Body text",
        tags: ["life"],
        authorName: state.name,
        createdAt: "2026-01-10",
        favoritesCount: 0,
        isFavorite: false,
      },
    ]);
  });

  it("leaves existing articles untouched", () => {
    const state = {
      ...createInitialState(),
      articles: [
        {
          title: "Old Post",
          summary: "s",
          body: "b",
          tags: [],
          authorName: "bob",
          createdAt: "2026-01-01",
          favoritesCount: 0,
          isFavorite: false,
        },
      ],
    };

    const next = writeArticle(state, {
      title: "New Post",
      summary: "Summary",
      body: "Body text",
      tags: [],
      createdAt: "2026-01-10",
    });

    expect(next.articles[0].title).toBe("Old Post");
    expect(next.articles).toHaveLength(2);
  });
});
