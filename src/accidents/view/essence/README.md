# Essence View

The bare-bone, unstyled HTML rendering of `src/essence`'s state — the
"Essence-in-Docs" idea from
[`docs/metaphysics-of-cose.essence-in-docs.md`](../../../../docs/metaphysics-of-cose.essence-in-docs.md):
a working, perceivable representation of the app, not just typed data.

The render functions here (`feed.ts`, `article.ts`, `sidebar.ts`, `editor.ts`, `states.ts`) are
this folder's own concern. The composition root that wires them together —
[`src/index.essence.ts`](../../../index.essence.ts) — sits one level above `accidents/view`,
same as the React composition root (`src/index.ts`): a composition root is where essence and a
view meet, so it isn't itself "the view." `main.ts` in this folder is just the DOM mount,
importing that composition root — accident artifact, not composition logic. Serve:
`bun run essence-view` (port 4321).

Rules:

- Pure functions: `(state) => string` (HTML markup). No DOM APIs, no
  framework, no CSS/classes — actual rendering technology is an accident
  (see `docs/realworld-essence-checklist.md`, Part 2), this is only here to
  keep the essence grounded in something you can look at.
- Each function here only ever reads `src/essence` — never the other way
  around.
- Every essence capability gets a corresponding view here, built the same
  red/green/refactor way, in the same cycle as the logic it renders.
