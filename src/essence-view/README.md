# Essence View

The bare-bone, unstyled HTML rendering of `src/essence`'s state — the
"Essence-in-Docs" idea from
[`docs/metaphysics-of-cose.essence-in-docs.md`](../../docs/metaphysics-of-cose.essence-in-docs.md):
a working, perceivable representation of the app, not just typed data.

Rules:

- Pure functions: `(state) => string` (HTML markup). No DOM APIs, no
  framework, no CSS/classes — actual rendering technology is an accident
  (see `docs/realworld-essence-checklist.md`, Part 2), this is only here to
  keep the essence grounded in something you can look at.
- Each function here only ever reads `src/essence` — never the other way
  around.
- Every essence capability gets a corresponding view here, built the same
  red/green/refactor way, in the same cycle as the logic it renders.
