import { describe, expect, it } from "bun:test";
import { createInitialState, TArticle } from "./state";
import { editArticle } from "./edit";

const article: TArticle = {
  title: "Original Title",
  summary: "Original summary",
  body: "Original body",
  tags: ["original"],
  authorName: "you",
  createdAt: "2026-01-01",
  favoritedBy: ["someone"],
};

describe("editArticle", () => {
  it("updates an existing article's title, summary, body, and tags", () => {
    const state = { ...createInitialState(), articles: [article] };

    const next = editArticle(state, article.title, {
      title: "Updated Title",
      summary: "Updated summary",
      body: "Updated body",
      tags: ["updated"],
    });

    expect(next.articles[0]).toEqual({
      ...article,
      title: "Updated Title",
      summary: "Updated summary",
      body: "Updated body",
      tags: ["updated"],
    });
  });

  it("leaves every other article untouched", () => {
    const other: TArticle = { ...article, title: "Other" };
    const state = { ...createInitialState(), articles: [article, other] };

    const next = editArticle(state, article.title, {
      title: "Updated Title",
      summary: "s",
      body: "b",
      tags: [],
    });

    expect(next.articles[1]).toEqual(other);
  });
});
