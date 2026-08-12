// The essence only needs a full article body to be readable text
// (docs/realworld-essence-checklist.md, "Rendering the body as formatted
// markdown vs. plain text vs. rich text" -- the formatting technology is
// accident, not what makes an article an article). This wraps the one
// library call our view depends on, so the rendering behavior our
// components rely on is locked in by a test rather than assumed.
import { marked } from "marked";

export function renderMarkdownToHtml(source: string): string {
  return marked.parse(source, { async: false }) as string;
}
