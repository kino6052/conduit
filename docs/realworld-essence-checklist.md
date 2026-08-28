---
title: Conduit / RealWorld — Essence & Accidents Checklist
subtitle: Step 1 living checklist (see README.md § Development Approach)
date: 2026-08-10
tags: all; code / architecture; code / metaphysics; checklist;
---

## How to read this

Per [`empirical-software-manifesto.md`](./empirical-software-manifesto.md) and the root [`README.md`](../README.md):

- **Essence (substance)** — what the app _communicates_ to the user. If you removed it, the app would stop being "an app for sharing, discovering, and discussing articles." It must be perceivable on screen.
- **Accidents (machinery)** — how the essence is delivered. Swappable without changing what the app _is_: frameworks, storage, visual design, specific auth mechanism, routing, etc.

This list intentionally ignores the current codebase. It describes the app the way a user perceives it, based on the [RealWorld / Conduit specification](https://github.com/realworld-apps/realworld) (routing, templates, and required-behavior docs), re-expressed in plain language.

This is a **living checklist** — amend it as understanding sharpens. Items marked ⚠️ are calls made without explicit confirmation; revisit them if they feel wrong.

---

## Part 1 — Essence

### 1. Article feed & discovery

- [x] A list of articles is visible to anyone, without needing to be an author of anything. (→ `selectVisibleArticles`, `src/essence/feed.ts`)
- [x] Each article in the list shows enough to decide whether to open it: title, short summary, author's name, publish date, tags, and how many people have favorited it. (→ `TArticle`, `src/essence/state.ts`)
- [x] The list can be narrowed down to articles carrying a specific tag. ⚠️ (treated tags as essence — they're a primary, on-screen way articles are found) (→ `selectVisibleArticles`, `src/essence/feed.ts`)
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
- [x] A comment can be removed by the person who wrote it — and only by them. (→ `deleteComment`, `src/essence/comment.ts`, gated by `isMine` in `src/accidents/view/essence/article.ts`)

### 5. Following authors

- [x] One author can follow another. (→ `toggleFollow`, `src/essence/follow.ts`)
- [x] Following can be undone. (→ `toggleFollow`, `src/essence/follow.ts` — same action, toggled)
- [x] Whether you currently follow someone is visible wherever you'd see them. (→ `isFollowing`, `src/essence/follow.ts`)
- [x] Who you follow determines what shows up in your personal feed (→ ties to §1). (→ `selectVisibleArticles` reads `followedAuthors`, `src/essence/feed.ts`, now populated by `toggleFollow`)

### 6. The acting identity ("you")

- [x] At any moment, the app knows who is reading/writing/favoriting/following/commenting — a "you," distinct from everyone else. Without this, "your feed," "your article," "your comment," and "who you follow" are meaningless. (→ `TState.name`, `src/essence/state.ts`)
- [x] Everything you create or mark is recognizably yours: articles you wrote, comments you posted, articles you favorited, authors you follow. (→ `isMine` (generalized to articles and comments), `TArticle.isFavorite`, `isFollowing`)
- [ ] **Explicitly excluded from essence** (per the README's own worked example): _how_ that identity gets established, proven, or changed — signing up, signing in, sessions, changing your name/bio/photo — is machinery, not identity itself. Only the fact that a "you" exists and things are attributed to it is essence.

---

## Part 2 — Accidents

Grouped to mirror Part 1, so each accident is traceable to the essence it's in service of.

### Establishing "who you are"

- [x] The specific credential scheme (email+password, magic link, OAuth/SSO, a single hard-coded demo identity, etc.) — a name and a password, neither checked against an account record (there isn't one to check against — see "how identity persists" below): `signIn(name, password)`'s contract requires the shape of a credential without yet requiring the substance of one (→ `TSignIn`, `src/accidents/sign-in/sign-in.ts`)
- [x] Sign-up / registration form and flow — collapses into Sign-in below: with nothing to verify a name against, submitting one that already exists and submitting a brand-new one are the same action, so one form covers both (→ `SignIn`, `src/accidents/view/react/components.ts`)
- [x] Sign-in / login form and flow (→ `SignIn`, `src/accidents/view/react/components.ts`; `compileSignInViewModel`, `src/accidents/view/react/sign-in-view-model.ts`; signing in also changes the acting identity's name through the already-essence `changeName`)
- [x] How identity persists between visits — local storage, via a new generic `TPersistence<T>` accident (→ `src/accidents/persistence/persistence.ts`: `createMemoryPersistence`, test-first; `src/accidents/persistence/persistence-local-storage.ts`: `createLocalStoragePersistence`, untested, a browser global, same category as `navigation-hash.ts`). `createPersistentSignIn` (`src/accidents/sign-in/sign-in.ts`) takes a `TPersistence<string>` as a dependency rather than hard-coding `localStorage` itself, so it's testable with the memory implementation — same "Step 4" shape as `createRxState`/`createMemoryState`. `createMemorySignIn` (renamed from `createSignIn`, for the same `createMemory*` naming consistency as navigation/state) stays the essential app's and every test's implementation on purpose — no persistence, a reload loses it, exactly the essential-dependencies point. One real bug caught while wiring this in: restoring a signed-in name from storage isn't enough on its own — essence's own `TState.name` has to be resynced too (`restoreSignedInIdentity`, `src/accidents/view/react/sign-in-view-model.ts`, test-first), or `isMine` would keep comparing ownership against `createInitialState`'s default `"you"` instead of whoever actually reloaded in. Verified live: sign in, reload, and your own article's Edit/Delete controls are still there
- [x] Signing out (→ same `TSignIn`/`SignIn` — a Sign Out control replaces the form once signed in, on the header once pages existed). Doesn't touch the acting identity's name (`TState.name` stays whatever it was) — only whether `TSignIn.signedInName()` returns it changes, since essence has no concept of "no one" (see Part 1, item 6: a "you" is always present). Resolved, not left open anymore: signing out (or never having signed in — a guest) now hides the Editor entirely and blocks the Article page, rather than rendering them unusably (→ `src/index.ts`'s page-level gating, see "Pages" below)

### What a guest can and can't do

Every essence action that attributes something to "you" needs a signed-in
name to attribute it to — a guest (no signed-in name) is blocked from all
of them. Two different, both deliberate, treatments for what "blocked"
looks like:

- [x] **Reading a full article** — blocked with an in-page message
  ("Sign in to read this article.") rather than a redirect, same as the
  message a nonexistent article gets (→ `ArticlePage`,
  `src/accidents/view/react/pages.ts`; see the Article page entry below)
- [x] **Writing a new article, or editing your own** — same message-swap
  treatment ("Sign in to write an article.") on the Editor page (→
  `EditorPage`, same file; see the New article/Edit article entry below)
- [x] **Commenting on an article, or deleting your own comment** —
  blocked as a consequence of the article page itself being blocked, not
  gated separately (there's no way to reach the comment form without
  first reading the article)
- [x] **Deleting your own article** — same as above, a consequence of the
  Article page's own gate
- [x] **Favoriting an article, or following its author** — the one place
  this needed its own gate rather than inheriting a page's: these
  controls appear on the Home feed, which stays open to guests (browsing
  is never gated, only acting). Clicking either as a guest now navigates
  to the Login page, instead of the click silently mutating essence under
  whatever name `state.name` happens to still hold from a previous
  session — essence has no concept of "no one" (Part 1, item 6), so
  without this gate a guest's click wouldn't fail, it would just act as
  whoever the essence's acting identity last was (→ `composeApp`,
  `src/accidents/view/react/compose-app.ts`, sanity-tested in
  `compose-app.test.ts`)
- [x] **Viewing a profile** — same message-swap treatment
  ("Sign in to view this profile.") as Article/Editor, not the redirect
  treatment Favorite/Follow got. Clicking an author's name to get there
  is itself unrestricted for a guest, same as opening an article — only
  what's shown once you arrive is gated (→ `ProfilePage`, same file; see
  the Profile page entry below)
- [x] **Browsing itself is never gated** — the feed, tag filtering, the
  popular tags widget, and opening an article or a profile (the click
  itself, not what you see once there) all stay available to a guest;
  only *acting* requires a signed-in name

⚠️ Two different gating shapes for the same underlying rule (a message
swap on pages vs. a redirect on inline controls) is a real, visible
inconsistency, not a single unified pattern — flagging rather than
pretending otherwise. A page-level gate reads naturally as "this whole
screen isn't for you right now"; an inline control's gate reads more
naturally as "go do the thing that would let you do this," since the
feed around it is otherwise perfectly usable. Both were chosen for what
reads best in their own context, not from one rule applied twice.

### Presenting & editing your identity

- [ ] A dedicated settings page for changing your display name, bio, avatar image, email, or password
- [x] A dedicated profile page for browsing another author ⚠️ (per your call: the _page_ is accident; the underlying attribution and follow relationship it displays are essence) — built (→ the Profile page entry under "Pages" below); bio/avatar and their favorited-articles list are not (same gaps noted there)

### Presentation & delivery of the feed

- [x] The exact "more than fits on screen" mechanism — numbered pages, infinite scroll, a "load more" button (→ `paginate`, `src/accidents/pagination/pagination.ts` — chose numbered pages)
- [x] Visual layout: card design, spacing, colors, fonts (→ `src/accidents/view/styles.css`, values pulled from `legacy/`'s design tokens: Titillium Web/Source Sans Pro fonts, the green/grey/lightgrey palette, 8px radius). No banner or sidebar built yet — src/accidents/view doesn't have those views.
- [x] A second, minimal styling implementation, proving styling itself is a swappable accident rather than something only the real app's `styles.css` provides — `src/accidents/view/essential-ui/` layers a small stylesheet on top of essence-view's exact same render functions and composition root (unchanged; `main.ts` here is `import "../essence/main"`), instead of essence-view's own deliberate zero styling. No design tokens, no fonts pulled from anywhere — just enough CSS (borders, spacing, button affordance) to be comfortably legible. Serve: `bun run essential-ui` (port 4324)
- [x] A "popular tags" browsing widget as a discovery shortcut (a convenience on top of tag filtering, not the filtering capability itself) (→ `selectPopularTags`, `src/accidents/popular-tags/popular-tags.ts`; wired into `src/index.ts` only — React app so far, not the essence view)
- [x] Where the feed's initial articles come from — not hand-typed fixtures, an IO accident: `TLoadArticles`, a contract shaped for real (async, could-fail) IO even though its only implementation today is a small built-in dataset, since there's no backend yet to actually fetch from (→ `loadSeedArticles`, `src/accidents/articles-io/articles-io.ts`, merged into state once at startup in `src/index.ts`). Deliberately connected, not four isolated one-off names: two authors (`alice`, `bob` — the same names essence-view's own fixtures already use) each wrote more than one article, with overlapping tags, so a fresh visitor's feed and popular-tags widget both read as a small real community. React app only — essence-view keeps its own curated, deterministic named states (`src/accidents/view/essence/states.ts`) instead, on purpose (see "Pages" below for the same essence-view-wants-something-different reasoning)

### Presentation of an article

- [x] Rendering the body as formatted markdown vs. plain text vs. rich text — that it's readable text is essence; the rendering technology/format is accident (→ `renderMarkdownToHtml`, `src/accidents/markdown/markdown.ts`, wired into `compileArticleDetailViewModel`'s `bodyHtml`, `src/accidents/view/react/article-view-model.ts` — React app only so far, not the essence view)
- [x] The URL/address scheme used to reach a specific article (→ `createHashNavigation`, `src/accidents/navigation/navigation-hash.ts` — `#/article/<title>`, the article's own title, no synthetic slug)

### Writing & editing mechanics

- [x] The input widgets used for title/summary/body/tags — plain HTML `<input>`/`<textarea>` throughout, tags as one comma-separated text field (→ `Editor`, `src/accidents/view/react/components.ts`; `renderEditor`, `src/accidents/view/essence/editor.ts`). No rich editor, no tag autocomplete, no per-tag input widget — a deliberate choice by omission (never built one), now recorded as the decision rather than left looking unmade
- [x] Draft/autosave behavior — decided against. The form is either blank (writing) or pre-filled once from the article being edited (`TEditorProps.title`/etc., set on mount via React's `defaultValue`, not resynced afterward) — nothing is saved as you type, and navigating away loses unsaved changes, same as the rest of this app not persisting anything beyond the signed-in name itself
- [x] Confirmation prompts before deleting (→ `withConfirmation`, `src/accidents/confirmation/confirmation.ts`, wired to `window.confirm` in `src/index.ts` for article deletion)

### Comments & favorites mechanics

- [ ] Visual placement/styling of the comment thread and comment form
- [x] Confirmation prompts before deleting a comment (→ same `withConfirmation`; wired in both `src/index.essence.ts` and now `src/index.ts` — see the delete-comment item below, which closed the parity gap this line used to flag)
- [ ] The specific icon/animation used to show "favorited"

### Underlying technology

- [x] Front-end language/framework (→ TypeScript + React + RxJS, `src/accidents/view`, following `docs/code-example.md`'s MVVM shape — a composition root, not baked into essence)
- [x] How the composition root itself gets tested — every dependency it needs (navigation, sign-in, confirm, state management, even the view) is injected rather than hard-coded, so `compose-app.ts`'s composition logic (which page, what props) is a plain function testable with in-memory implementations and "bare bone" view functions that just hand back their props, no rendering involved (→ `composeApp`, `src/accidents/view/react/compose-app.ts`; `TStateManagement`, `src/accidents/state-management/state-management.ts` — state management pulled out the same way navigation/sign-in already were; sanity/integration tests in `compose-app.test.ts` cover sign in, publish, edit, delete confirmed/declined, reading as a guest, reading someone else's article)
- [x] The same injectability, proven live rather than only under test — a third composition root, `createEssentialDependenciesApp` (→ `src/index.essential-dependencies.ts`, served at `bun run essential-app`, port 4322), runs the real `composeApp`/essence/pages wired to every dependency's simplest, essential implementation instead of a browser-backed one: `createMemoryNavigation` (no URL), `createMemoryState` (no RxJS), an always-confirm function (no dialog). Clicking through it does exactly what the real app does, because none of that behavior lives in the swapped dependencies — only the URL bar staying static and a refresh losing everything reveal what was actually removed
- [ ] Back-end language/framework — not yet decided (`TLoadArticles`, "presentation & delivery of the feed" above, is shaped for real IO but has no backend behind it yet)
- [ ] Database/storage technology
- [ ] API shape/protocol (REST, GraphQL, RPC, …)
- [ ] Hosting/deployment platform
- [ ] Error-message wording, placement, and validation mechanics
- [ ] Branding, footer text, attribution, favicon, typography

### Site-wide navigation

- [x] A persistent header showing the app's name and a way back to the feed (→ `compileHeaderViewModel`, `src/accidents/view/react/header-view-model.ts`; `Header`, `src/accidents/view/react/components.ts` — styled after `legacy/details/view/components/Navbar` and `Tab`: full-width bar, content capped at the page's own width, green underline on the active tab)
- [x] Home and Login tabs, gated by whether anyone's signed in — a guest sees Login, a signed-in name sees New Article and "Sign Out (name)" instead, same gating shape as `legacy/details/services/SimpleNavigationService.getNavigationTabs`
- [x] A link to Profile — not a header tab (legacy's own nav doesn't put one there either), reached the same way real apps do it: any author's name, wherever it's shown (feed, article, comments), links through to their profile (see the Profile page below)
- [ ] A tab/link to Settings — doesn't exist as a page yet (see Pages below), so linking to it from the header would be a link to nothing

### Pages (how the accidents above get grouped into screens)

A "page" is itself accident, not essence. Two things are true at once
here, and both matter:

1. **Which screens exist as separate, reachable places is accident.**
   RealWorld's own split into Home/Login/Article/etc. is one delivery
   shape, not the only one — a single always-visible screen communicates
   the same essence, just delivered differently.
2. **Pages don't change identity.** Whatever page you're on, `TState`
   (the essence) is exactly the same shape, holding exactly the same
   kind of facts — an article is still an article, a comment still a
   comment, whether it's reachable from `/` or `/article/:title` or one
   scrolling div. A page is purely a *grouping* of already-essential
   things into a screen, the same "derived composite" idea
   `docs/solid-in-this-repo.md`'s SRP section already uses for Feed and
   Article Detail — just one level up.

Point 2 is exactly why `src/accidents/view/essence` — the bare grounding
tool, "storybook for the essence" (`PROMPT.md`) — never grew pages at
all, and correctly so: its entire purpose is showing every relevant piece
of a given state directly, side by side, for inspection. Splitting that
across routed screens would add navigation to click through *while
verifying*, not make the essence any clearer — the opposite of what the
tool is for. The React app (`src/index.ts`) *does* need pages, for the
opposite reason: a real user reading one article shouldn't also be
looking at a blank editor, someone else's sign-in form, and the whole
feed in the same scroll. That's nicer visual separation, a real
usability improvement — but it's still just delivery, not a different
app underneath.

Each entry below is a composite of items already listed above; it's
checked off only once that composition exists as its own distinct,
reachable screen — an unwired collection of the right elements doesn't
count, same "derived composite" standard as above.

- [x] **Home** (`/`) — the article feed and how to narrow it down (→ `HomePage`, `src/accidents/view/react/pages.ts`)
  - [x] Feed, two lenses (global/personal) (→ `selectVisibleArticles`, `src/essence/feed.ts`)
  - [x] Tag filter (→ `onTagClick`, `src/accidents/view/react/view-model.ts`)
  - [x] Popular tags widget (→ `selectPopularTags`, `src/accidents/popular-tags/popular-tags.ts`)
  - [x] Pagination (→ `paginate`, `src/accidents/pagination/pagination.ts`)
  - [x] Reachable from anywhere via the header's Home tab (→ "Site-wide navigation" above)
  - [x] A control to switch feed lenses (global ↔ personal) — both sides (essence-view: `set-filter`, `renderFeed`; React: `onSetFilterClick`, `FeedLensToggle`)
  - [x] No longer includes the write form — Editor moved to its own page (see New article below); Home now only shows what everyone (guest or signed in) can see: the feed and how to narrow it down

- [x] **Login** (`/login`) — establishing "who you are" (→ `LoginPage`, `src/accidents/view/react/pages.ts`, reachable via the header's Login tab and `#/login`)
  - [x] A name+password form (→ `SignIn`, `src/accidents/view/react/components.ts`; `TSignIn`, `src/accidents/sign-in/sign-in.ts`) — RealWorld splits this into Login and Register because its credential scheme has accounts to distinguish; ours doesn't, so one form covers both
  - [x] `NameForm` (a separate "change your display name" control, independent of signing in/out) was retired once this page existed — it was flagged as an unreconciled overlap with `SignIn` (both set `TState.name`); with a real Login page as the one place identity gets established, keeping a second, ungated control for the same fact stopped making sense
  - [x] The signed-in name persists across visits (→ `createPersistentSignIn`, "Establishing 'who you are'" above) — a reload keeps you signed in; there's still no way to *choose* a previously-used name distinct from just signing in again

- [ ] **Settings** (`/settings`) — presenting & editing your identity
  - [ ] Settings form (display name, bio, avatar image, email, password) — not built; changing your name now only happens by signing in as someone else
  - [x] Sign-out control (→ the header's Sign Out tab, `src/accidents/view/react/components.ts`)

- [x] **New article** / **Edit article** (`/editor`, `/editor/:article`) — writing (→ `EditorPage`, `src/accidents/view/react/pages.ts`, reachable via the header's New Article tab, once signed in, and `#/editor`/`#/editor/<title>`)
  - [x] Title/summary/body/tags form (→ `Editor`, `src/accidents/view/react/components.ts`), gated on being signed in — a guest sees "Sign in to write an article." instead, same message-swap shape as the Article page
  - [x] Same form, pre-filled with the article's current values when editing (→ `editArticle`, `src/essence/edit.ts`; `TNavigation.openEditor(title?)`/`getEditingArticleTitle()`, now URL-backed (`src/accidents/navigation/navigation.ts`) instead of plain component state — refresh and back/forward work on this page too now) — both React and essence-view, no cancel-without-saving control on either
  - [x] RealWorld splits New article and Edit article into two routes; one page covers both here, told apart by whether it's pre-filled — same "one form, two actions" shape already used for essence-view's publish-article/save-article and for Sign in/Sign up collapsing into one form
  - [x] After publishing, returns to Home; after saving edits, returns to the article's own page (using its current title, in case the title itself was just changed) — a small but real UX difference from before, when saving an edit left you back on Home

- [x] **Article** (`/article/:title`) — reading, interacting, one article (→ `ArticlePage`, `src/accidents/view/react/pages.ts`)
  - [x] Full body, rendered as markdown (→ `compileArticleDetailViewModel`, `bodyHtml`)
  - [x] Author attribution, tags (→ same)
  - [x] Favorite control (→ `compileFavoriteFollowProps`)
  - [x] Follow control (→ same)
  - [x] Delete control, owner-gated (→ `onDeleteClick`)
  - [x] Edit control, owner-gated — both sides
  - [x] Comment list, attributed (→ `selectComments`)
  - [x] Comment form (→ `onCommentClick`)
  - [x] Delete-comment control, owner-gated — both sides now
  - [x] Reachable at its own URL (→ `createHashNavigation`, `#/article/<title>`)
  - [x] Only available when a name is signed in — a guest sees "Sign in to read this article" instead of the article itself (→ `compose-app.ts`'s page-level gating: `signedInName && openArticleTitle ? compileArticleDetailViewModel(...) : undefined`). This is stricter than plain RealWorld (which lets anyone read), a deliberate choice for this exercise: reading requires a name the same way writing does, so the guest/signed-in distinction has a second, visible consequence beyond just the header
  - [x] The author's name, on the article and on every comment, links through to their profile (→ `onAuthorClick`, `src/accidents/view/react/article-view-model.ts`; `AuthorLink`, `src/accidents/view/react/components.ts`) — see the Profile page below

- [x] **Profile** (`/profile/:authorName`) — an author, their articles (→ `ProfilePage`, `src/accidents/view/react/pages.ts`, reachable via any author name shown anywhere and `#/profile/<authorName>`)
  - [ ] Author bio/avatar display — not yet decided as essence-grounded (see "presenting identity" above); still not built, this page shows only the name
  - [x] Follow control on the profile itself (→ `compileProfileViewModel`, `src/accidents/view/react/profile-view-model.ts`, reusing `toggleFollow`/`isFollowing`)
  - [x] Their authored articles (→ `selectArticlesByAuthor`, `src/essence/article.ts` — new essence selector, same shape as `selectArticle`; the article previews themselves reuse `compileArticlePreviewProps`/`ArticlePreview`, the same components the feed uses, since a preview looks and behaves identically wherever it's shown)
  - [ ] Their favorited articles — not built; would need essence to track *which* articles a name favorited, not just whether the current viewer did (`TArticle.isFavorite` is a per-viewer fact, not a per-article list); a real gap, not a trivial wiring one
  - [x] Reachable at its own URL (→ `#/profile/<authorName>`, `src/accidents/navigation/navigation-hash.ts`)
  - [x] Only available when a name is signed in, same rule and same reasoning as the Article page above — a guest sees "Sign in to view this profile." (→ `compose-app.ts`'s page-level gating). Unlike Article, there's no second "doesn't exist" case: an author isn't an entity that can fail to exist the way an article can (any name is valid to view, even with zero articles), so `undefined` here means exactly one thing, not two

---

## Open questions / unilateral calls (⚠️ items above)

These were classified using the manifesto's test without a direct answer from you — flag any that should flip:

1. **Tags as a filter** — treated as essence (an on-screen way articles are discovered), separate from the "popular tags" widget (accident, a shortcut to that filter).
2. **Article "summary/short description" vs. full body** — treated as essence (it's what lets someone decide whether to open an article from the list); could be argued as accident if you consider a title alone sufficient.
3. **Markdown rendering** — treated the formatting _technology_ as accident; if the app's identity depends on rich-text specifically (not just readable text), this should move to essence.
4. **Whether "Home" is its own distinct page** — settled: it now is (`HomePage`, `src/accidents/view/react/pages.ts`), alongside real Login and Article pages, once real page-level routing was built.
5. ~~`NameForm` vs. `SignIn`~~ — resolved by retiring `NameForm`: with a real Login page as the one place identity gets established, a second, always-available, ungated control for the same fact (`TState.name`) no longer made sense. See the Login page entry above.
6. ~~Whether signing out should hide write affordances~~ — resolved: a guest now gets no Editor on Home and no Article page at all (page-level gating on `signedInName`, `src/index.ts`), rather than a technically-visible-but-meaningless form. Also extended past writing to *reading* an article specifically — see the Article page's last item above, itself a further unilateral call worth flagging: RealWorld lets guests read, this repo now doesn't.
7. **Guests can't read articles either, not just write them** — RealWorld's actual behavior lets anyone read an article without an account; this repo now requires a signed-in name for the Article page too (`src/index.ts`: `signedInName && openArticleTitle ? compileArticleDetailViewModel(...) : undefined`), per an explicit instruction for this exercise ("article is only available when name is present"). Flagging since it's a real divergence from RealWorld's own spec, not just an accident-shape choice.

Already settled by you: **follow/personal feed → essence**, **comments → essence**, **dedicated profile page → accident**, **pagination → accident entirely** (not even the underlying concept of "there's more, and a way to get to it" is essence — the feed showing whatever it shows is sufficient; reaching the rest is purely a delivery-mechanism concern, see Part 2).
