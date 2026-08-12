import { describe, expect, it } from "bun:test";
import { TArticle } from "../../../essence/state";
import { renderEditor } from "./editor";

const article: TArticle = {
  title: "Real World",
  summary: "s",
  body: "The full body text.",
  tags: ["react", "essence"],
  authorName: "you",
  createdAt: "2026-01-01",
  favoritesCount: 0,
  isFavorite: false,
};

describe("renderEditor", () => {
  it("renders fields for title, summary, body, and tags, and a publish button", () => {
    const html = renderEditor();

    expect(html).toContain(`name="title"`);
    expect(html).toContain(`name="summary"`);
    expect(html).toContain(`name="body"`);
    expect(html).toContain(`name="tags"`);
    expect(html).toContain(`data-action="publish-article"`);
    expect(html).toContain("Publish Article");
  });

  it("pre-fills the fields with an article's current values when editing", () => {
    const html = renderEditor(article);

    expect(html).toContain(`value="Real World"`);
    expect(html).toContain(`value="s"`);
    expect(html).toContain("The full body text.");
    expect(html).toContain(`value="react, essence"`);
    expect(html).toContain(`data-action="save-article"`);
    expect(html).toContain(`name="originalTitle"`);
    expect(html).toContain(`value="Real World"`);
    expect(html).toContain("Save Changes");
  });
});
