# RealWorld/Conduit spec — local reference notes

These files are **my own condensed, paraphrased notes** on the RealWorld/Conduit
specification, taken from `https://realworld-docs.netlify.app/specifications/`
on 2026-08-28, kept here so the checklist can cite a stable local reference
instead of re-fetching the internet every cycle.

They are **not a copy of the spec site's text**. Prose explanations here are
written fresh, in this repo's own voice; only the parts that are inherently
functional data — field names, route paths, JSON shapes, exact button/label
text a UI has to reproduce to match the spec — are reproduced exactly,
because a spec is useless if those are paraphrased. For the full text,
diagrams, and reasoning behind the spec, see the source:
`https://realworld-docs.netlify.app/`.

## Files

- [`routes.md`](routes.md) — every frontend route and which page it maps to.
- [`pages.md`](pages.md) — per-page UI element inventory (what's on screen,
  field by field, button by button).
- [`api-shapes.md`](api-shapes.md) — the JSON shapes real RealWorld backends
  return (User/Profile/Article/Comment), since this clone's essence-level
  modeling choices should stay traceable back to what a real implementation
  actually carries.
- [`endpoints.md`](endpoints.md) — the real backend's HTTP API surface, for
  context only — this app has no real backend, so nothing here is a target
  to implement, just a reference for what a "real" Conduit exposes.

## How this repo diverges, at a glance

This clone deliberately diverges from the spec in a few load-bearing ways
that every file above should be read against:

- **Identity is name-only.** No accounts, no email, no password, no JWT —
  signing in is typing a name and having it stick (`TState.name`). Sign In
  and Sign Up are the same one-field action here; the spec keeps them as two
  forms with different fields.
- **No slugs.** Articles are identified by title, comments by full-field
  equality — the spec's `slug` field has no counterpart in this app's essence.
- **Reading an article requires being signed in** in this clone; the spec
  lets anyone read without an account.

See `docs/realworld-essence-checklist.md` for the full, up-to-date list of
what's built, what's an intentional divergence, and what's a real gap.
