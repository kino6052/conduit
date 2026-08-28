---
title: Ontological entities, as actually rendered
subtitle: What this project's screen output says exists — nothing else
date: 2026-08-11
tags: all; code / architecture; code / metaphysics; reference;
---

## The rule

An entity belongs on this list only if it appears in the program's actual output — what
`renderFeed`, `renderArticleDetail`, `renderEditor`, `renderSidebar` (or their React
equivalents) actually produce, checked against the real function bodies, not inferred from
`TState`'s shape or from what a developer might assume exists.

**The user, the developer, "you," any AI or agent — none of these are entities of this
project.** They never appear in a `renderFeed`/`renderArticleDetail` return value. The only
thing the screen ever shows in their place is a _name_ — a string sitting in a byline — and
that name is what's listed below, not a person behind it. This is the same discipline
[`docs/empirical-software-manifesto.md`](empirical-software-manifesto.md) and
[`metaphysics-of-code.substance-vs-essence.md`](metaphysics-of-code.substance-vs-essence.md)
already apply to code: ground everything in what's perceivable, treat everything else as not
existing here. Verified against
[`src/accidents/view/essence/feed.ts`](../src/accidents/view/essence/feed.ts),
[`article.ts`](../src/accidents/view/essence/article.ts),
[`editor.ts`](../src/accidents/view/essence/editor.ts), and
[`sidebar.ts`](../src/accidents/view/essence/sidebar.ts) before writing any of this.

## Primary entities — things you can point to

### Article

Title, a short summary, a full body, a list of tags, an author's name, a publish date, a
favorite count. Rendered as its own `<li>`/`<article>` block in both the feed and the detail
view — a distinct thing, not a property of anything else.

### Comment

A body of text and an author's name, rendered as its own `<li>` under the article it belongs
to. It has no independent existence outside that article (no screen shows a comment on its
own), but it _is_ its own thing on that screen — you can point at "this comment" as distinct
from the article's body or from any other comment.

### Tag

A word or short phrase, rendered as its own clickable `<button>`. Structurally it's just a
string (`TArticle.tags: string[]`) — but the same string recurs across different articles and
is used to filter the feed, so on screen it behaves like a thing with its own identity, not a
one-off detail of a single article.

### Author (a name — not a "User")

A name string, rendered as plain text next to an article or a comment. This is deliberately
_not_ a `User` entity: there's no bio, no avatar, no email, no page of its own — none of that
is ever rendered, because a dedicated profile page was classified as accident, not essence (see
[`docs/realworld-essence-checklist.md`](realworld-essence-checklist.md), Part 2). What exists,
empirically, is the name attached to the things that name authored — nothing more.

## Non-entity

If something doesn't have a perceivable correlate, it can't be an entity

## Entity Derived Composites

## Screens — arrangements of entities, not entities themselves

A screen is where entities and controls sit; it isn't itself a thing you point at the way an
Article is.

- **Feed** — a list of Article previews, plus the global/personal lens and the active tag
  filter (state, not rendered as objects of their own).
- **Article detail** — one Article, its Comments, and the comment-writing form.
- **Editor** — the article-writing form. Its fields (title, summary, body, tags) are plain
  text inputs, not a "draft" entity — nothing called a draft is ever rendered.
- **State picker** — `essence/`-only, part of the grounding tool (`src/accidents/view/essence`,
  see [`PROMPT.md`](../PROMPT.md)), not part of the essence itself: a list of named scenarios,
  each just a label.

## Explicitly not entities

- The user, the developer, an AI/agent — never appear in any rendered output, categorically
  excluded, not just omitted for brevity.
- `id`, `slug` — rejected reifications; see `src/essence/state.ts`'s own comments on why
  `TArticle`/`TComment` don't have them.
