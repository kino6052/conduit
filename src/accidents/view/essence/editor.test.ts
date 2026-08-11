import { describe, expect, it } from "bun:test";
import { renderEditor } from "./editor";

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
});
