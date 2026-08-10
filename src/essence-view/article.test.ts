import { describe, expect, it } from "bun:test";
import { createInitialState, TArticle, TComment } from "../essence/state";
import { renderArticleDetail } from "./article";

const article: TArticle = {
  title: "Real World",
  summary: "A demo app",
  body: "The full body text.",
  tags: ["react"],
  authorName: "alice",
  createdAt: "2026-01-01",
  favoritesCount: 3,
  isFavorite: false,
};

const comment: TComment = {
  articleTitle: "Real World",
  authorName: "bob",
  body: "Great read!",
  createdAt: "2026-01-02",
};

describe("renderArticleDetail", () => {
  it("renders the full article: title, body, tags, and author", () => {
    const html = renderArticleDetail(article, [], createInitialState());

    expect(html).toContain("Real World");
    expect(html).toContain("The full body text.");
    expect(html).toContain("react");
    expect(html).toContain("alice");
  });

  it("renders each comment, attributed to who wrote it", () => {
    const html = renderArticleDetail(article, [comment], createInitialState());

    expect(html).toContain("Great read!");
    expect(html).toContain("bob");
  });

  it("renders a form to post a new comment", () => {
    const html = renderArticleDetail(article, [], createInitialState());

    expect(html).toContain(`data-action="post-comment" data-article-title="Real World"`);
    expect(html).toContain("Post Comment");
  });

  it("renders edit/delete controls only when the article is yours", () => {
    const state = { ...createInitialState(), name: "alice" };

    const html = renderArticleDetail(article, [], state);

    expect(html).toContain(`data-action="edit-article" data-title="Real World"`);
    expect(html).toContain(`data-action="delete-article" data-title="Real World"`);
  });

  it("hides edit/delete controls on someone else's article", () => {
    const state = { ...createInitialState(), name: "someone-else" };

    const html = renderArticleDetail(article, [], state);

    expect(html).not.toContain("edit-article");
    expect(html).not.toContain("delete-article");
  });

  it("labels the follow button Unfollow when you already follow the author", () => {
    const state = { ...createInitialState(), followedAuthors: ["alice"] };

    const html = renderArticleDetail(article, [], state);

    expect(html).toContain("Unfollow");
  });

  it("labels the favorite button Unfavorite when you've already favorited it", () => {
    const favorited: TArticle = { ...article, isFavorite: true };

    const html = renderArticleDetail(favorited, [], createInitialState());

    expect(html).toContain("Unfavorite");
  });
});
