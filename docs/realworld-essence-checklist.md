---
title: Conduit / RealWorld — Essence & Accidents Checklist
subtitle: Step 1 living checklist (see README.md § Development Approach)
date: 2026-08-10
tags: all; code / architecture; code / metaphysics; checklist;
---

## How to read this

Per [`empirical-software-manifesto.md`](./empirical-software-manifesto.md) and the root [`README.md`](../README.md):

- **Essence (substance)** — what the app *communicates* to the user. If you removed it, the app would stop being "an app for sharing, discovering, and discussing articles." It must be perceivable on screen.
- **Accidents (machinery)** — how the essence is delivered. Swappable without changing what the app *is*: frameworks, storage, visual design, specific auth mechanism, routing, etc.

This list intentionally ignores the current codebase. It describes the app the way a user perceives it, based on the [RealWorld / Conduit specification](https://github.com/realworld-apps/realworld) (routing, templates, and required-behavior docs), re-expressed in plain language.

This is a **living checklist** — amend it as understanding sharpens. Items marked ⚠️ are calls made without explicit confirmation; revisit them if they feel wrong.

---

## Part 1 — Essence

### 1. Article feed & discovery

- [x] A list of articles is visible to anyone, without needing to be an author of anything. (→ `selectVisibleArticles`, `src/essence/feed.ts`)
- [x] Each article in the list shows enough to decide whether to open it: title, short summary, author's name, publish date, tags, and how many people have favorited it. (→ `TArticle`, `src/essence/state.ts`)
- [x] The list can be narrowed down to articles carrying a specific tag. ⚠️ (treated tags as essence — they're a primary, on-screen way articles are found) (→ `selectVisibleArticles`, `src/essence/feed.ts`)
- [ ] There is a way to reach articles beyond the first batch shown (the list is browsable, not capped at one screenful). ⚠️ (the *concept* of "there's more, and you can get to it" is essence; the exact mechanism — pages, infinite scroll, "load more" — is accident, see Part 2)
- [x] The feed has two lenses: everything (global), and only the authors you follow (personal). (→ `selectVisibleArticles`, `src/essence/feed.ts`)

### 2. Reading an article

- [x] A single article can be opened to read its full content, beyond the preview. (→ `selectArticle`, `src/essence/article.ts`)
- [x] The author is visibly attributed on the article. (→ `TArticle.authorName`, `src/essence/state.ts`)
- [x] The article's tags are visible. (→ `TArticle.tags`, `src/essence/state.ts`)

### 3. Writing & owning articles

- [x] A new article can be written: a title, a short summary, and a full body. (→ `writeArticle`, `src/essence/write.ts`)
- [x] Tags can be attached to an article while writing it. (→ `writeArticle`, `src/essence/write.ts`)
- [x] An article can later be edited by the person who wrote it. (→ `editArticle`, `src/essence/edit.ts`)
- [x] An article can be removed by the person who wrote it. (→ `deleteArticle`, `src/essence/delete.ts`)
- [x] Editing/removing is only ever available on your own article — it's not offered on anyone else's. (→ `isMine`, `src/essence/ownership.ts`)

### 4. Interacting with an article

- [x] An article can be marked as a favorite, and unmarked. (→ `toggleFavorite`, `src/essence/favorite.ts`)
- [x] The favorite count on an article is visible. (→ `TArticle.favoritesCount`, kept in sync by `toggleFavorite`)
- [x] A comment can be written on an article. (→ `writeComment`, `src/essence/comment.ts`)
- [x] Existing comments are visible under the article, each attributed to who wrote it. (→ `selectComments`, `src/essence/comment.ts`)
- [x] A comment can be removed by the person who wrote it — and only by them. (→ `deleteComment`, `src/essence/comment.ts`, gated by `isMine` in `src/essence-view/article.ts`)

### 5. Following authors

- [x] One author can follow another. (→ `toggleFollow`, `src/essence/follow.ts`)
- [x] Following can be undone. (→ `toggleFollow`, `src/essence/follow.ts` — same action, toggled)
- [x] Whether you currently follow someone is visible wherever you'd see them. (→ `isFollowing`, `src/essence/follow.ts`)
- [x] Who you follow determines what shows up in your personal feed (→ ties to §1). (→ `selectVisibleArticles` reads `followedAuthors`, `src/essence/feed.ts`, now populated by `toggleFollow`)

### 6. The acting identity ("you")

- [x] At any moment, the app knows who is reading/writing/favoriting/following/commenting — a "you," distinct from everyone else. Without this, "your feed," "your article," "your comment," and "who you follow" are meaningless. (→ `TState.name`, `src/essence/state.ts`)
- [x] Everything you create or mark is recognizably yours: articles you wrote, comments you posted, articles you favorited, authors you follow. (→ `isMine` (generalized to articles and comments), `TArticle.isFavorite`, `isFollowing`)
- [ ] **Explicitly excluded from essence** (per the README's own worked example): *how* that identity gets established, proven, or changed — signing up, signing in, sessions, changing your name/bio/photo — is machinery, not identity itself. Only the fact that a "you" exists and things are attributed to it is essence.

---

## Part 2 — Accidents

Grouped to mirror Part 1, so each accident is traceable to the essence it's in service of.

### Establishing "who you are"

- [ ] Sign-up / registration form and flow
- [ ] Sign-in / login form and flow
- [ ] The specific credential scheme (email+password, magic link, OAuth/SSO, a single hard-coded demo identity, etc.)
- [ ] How identity persists between visits (token, cookie, server session, local storage, …)
- [ ] Signing out

### Presenting & editing your identity

- [ ] A dedicated settings page for changing your display name, bio, avatar image, email, or password
- [ ] A dedicated profile page for browsing another author — their bio, avatar, and full article/favorites list ⚠️ (per your call: the *page* is accident; the underlying attribution and follow relationship it displays are essence)

### Presentation & delivery of the feed

- [ ] The exact "more than fits on screen" mechanism — numbered pages, infinite scroll, a "load more" button
- [ ] Visual layout: banner, sidebar placement, card design, spacing, colors, fonts, icons
- [ ] A "popular tags" browsing widget as a discovery shortcut (a convenience on top of tag filtering, not the filtering capability itself)

### Presentation of an article

- [ ] Rendering the body as formatted markdown vs. plain text vs. rich text — that it's readable text is essence; the rendering technology/format is accident
- [ ] The URL/address scheme used to reach a specific article

### Writing & editing mechanics

- [ ] The input widgets used for title/summary/body/tags (plain fields vs. rich editor, tag autocomplete, etc.)
- [ ] Any draft/autosave behavior
- [ ] Confirmation prompts before deleting

### Comments & favorites mechanics

- [ ] Visual placement/styling of the comment thread and comment form
- [ ] Confirmation prompts before deleting a comment
- [ ] The specific icon/animation used to show "favorited"

### Underlying technology

- [ ] Programming language(s) and framework(s), front and back
- [ ] Database/storage technology
- [ ] API shape/protocol (REST, GraphQL, RPC, …)
- [ ] Hosting/deployment platform
- [ ] Error-message wording, placement, and validation mechanics
- [ ] Branding, footer text, attribution, favicon, typography

---

## Open questions / unilateral calls (⚠️ items above)

These were classified using the manifesto's test without a direct answer from you — flag any that should flip:

1. **Tags as a filter** — treated as essence (an on-screen way articles are discovered), separate from the "popular tags" widget (accident, a shortcut to that filter).
2. **"There's more articles than fit on screen"** — treated the *concept* as essence, the *mechanism* (pagination vs. infinite scroll) as accident.
3. **Article "summary/short description" vs. full body** — treated as essence (it's what lets someone decide whether to open an article from the list); could be argued as accident if you consider a title alone sufficient.
4. **Markdown rendering** — treated the formatting *technology* as accident; if the app's identity depends on rich-text specifically (not just readable text), this should move to essence.

Already settled by you: **follow/personal feed → essence**, **comments → essence**, **dedicated profile page → accident**.
