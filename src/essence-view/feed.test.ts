import { describe, expect, it } from "bun:test";
import { createInitialState, TArticle } from "../essence/state";
import { renderFeed } from "./feed";

const article: TArticle = {
  title: "Real World",
  summary: "A demo app",
  body: "...",
  tags: ["react"],
  authorName: "alice",
  createdAt: "2026-01-01",
  favoritesCount: 3,
  isFavorite: false,
};

describe("renderFeed", () => {
  it("renders every visible article's title, summary, author, date, tags, and favorite count", () => {
    const state = { ...createInitialState(), articles: [article] };

    const html = renderFeed(state);

    expect(html).toContain("Real World");
    expect(html).toContain("A demo app");
    expect(html).toContain("alice");
    expect(html).toContain("2026-01-01");
    expect(html).toContain("react");
    expect(html).toContain("3");
  });

  it("renders no article items for an empty feed", () => {
    const state = createInitialState();

    expect(renderFeed(state)).not.toContain("<h2>");
  });

  it("renders a favorite button, labeled by whether you've favorited it", () => {
    const favorited: TArticle = { ...article, isFavorite: true };
    const state = { ...createInitialState(), articles: [favorited] };

    const html = renderFeed(state);

    expect(html).toContain(`data-action="toggle-favorite" data-title="Real World"`);
    expect(html).toContain("Unfavorite");
  });

  it("renders a follow button, labeled by whether you follow the author", () => {
    const state = {
      ...createInitialState(),
      articles: [article],
      followedAuthors: ["alice"],
    };

    const html = renderFeed(state);

    expect(html).toContain(`data-action="toggle-follow" data-author-name="alice"`);
    expect(html).toContain("Unfollow");
  });

  it("renders each tag as a clickable filter", () => {
    const state = { ...createInitialState(), articles: [article] };

    const html = renderFeed(state);

    expect(html).toContain(`data-action="set-tag" data-tag="react"`);
  });

  it("renders buttons to switch between the global and personal feed", () => {
    const html = renderFeed(createInitialState());

    expect(html).toContain(`data-action="set-filter" data-filter-name="global"`);
    expect(html).toContain(`data-action="set-filter" data-filter-name="personal"`);
  });

  it("renders the title as an open-article control, so an article can be read in full", () => {
    const state = { ...createInitialState(), articles: [article] };

    const html = renderFeed(state);

    expect(html).toContain(`data-action="open-article" data-title="Real World"`);
  });
});
