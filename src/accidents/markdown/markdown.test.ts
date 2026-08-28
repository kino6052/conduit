import { describe, expect, it } from "bun:test";
import { renderMarkdownToHtml } from "./markdown";

describe("renderMarkdownToHtml", () => {
  it("renders emphasis as strong/em tags", () => {
    expect(renderMarkdownToHtml("**bold** and *italic*")).toContain("<strong>bold</strong>");
    expect(renderMarkdownToHtml("**bold** and *italic*")).toContain("<em>italic</em>");
  });

  it("renders a heading line as a heading tag", () => {
    expect(renderMarkdownToHtml("# Title")).toContain("<h1>Title</h1>");
  });

  it("renders a link", () => {
    expect(renderMarkdownToHtml("[text](https://example.com)")).toContain(
      '<a href="https://example.com">text</a>',
    );
  });

  it("renders plain text as a paragraph when there's no markdown syntax", () => {
    expect(renderMarkdownToHtml("just text")).toContain("<p>just text</p>");
  });
});
