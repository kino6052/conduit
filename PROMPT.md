# Working in this repo

You are contributing to Conduit, a RealWorld-spec app built with **Empirically Grounded
Software** principles. This document is the operating manual — follow it as instructions, not
background reading. It doesn't re-derive the philosophy; it tells you what to *do*. For the
"why," see the docs it points to.

## The one rule everything else follows

Every piece of software is **essence** (substance — what the app communicates to the user,
minimal and necessary) wrapped in **accidents** (machinery — frameworks, storage, styling,
routing, anything swappable). If something can be removed without changing what the app *is*,
it's accident, not essence.

- `src/essence/` is the essence. Zero dependencies by default. No framework, no DOM, no
  network, no styling. If a field or function doesn't correspond to something a user could
  point at on screen, it doesn't belong there.
- Everything else (`src/accidents/`, `legacy/`) is accident. Accidents may depend on essence.
  **Essence never depends on accidents** — check this by grepping `src/essence` for imports
  from anywhere else; there should never be any.
- **Never edit `src/essence/state.ts` to add a field an accident needs.** Extend by
  composition instead: `type TPaginationState = TState & { page: number }`. See
  `src/accidents/pagination/pagination-state.ts` for the pattern. This is Open/Closed in practice — see
  [`docs/solid-in-this-repo.md`](docs/solid-in-this-repo.md).

Read [`docs/empirical-software-manifesto.md`](docs/empirical-software-manifesto.md) once, before
your first change, if you haven't. It's short.

## Project layout

| Path | What it is |
|---|---|
| `docs/realworld-essence-checklist.md` | The living checklist. Essence and accidents listed separately. Drives what gets built next. |
| `docs/solid-in-this-repo.md` | SOLID mapped to real files in this repo. |
| `docs/code-example.md` | The reference implementation pattern (tic-tac-toe) — MVVM shape for `src/accidents/view/react`. |
| `src/essence/` | Pure state, pure logic, pure selectors/actions. One file per perceivable capability. |
| `src/index.ts` | Composition root for the React view. Not inside `accidents/view` — a composition root is where essence and a view meet, so it isn't itself "the view." |
| `src/index.essence.ts` | Composition root for the essence view. Same reasoning, same top-level placement. |
| `src/accidents/view/react/` | The real delivery: React + RxJS, following `code-example.md`'s shape (view-model compiler → pure presentational components). Also holds the mount point (`main.ts`), HTML shell, and stylesheet — accident artifacts, not composition logic. |
| `src/accidents/view/essence/` | Bare, unstyled, interactive HTML rendering of the essence, plus a storybook-style state picker. Exists to keep the essence grounded in something clickable — not the real app. Also holds its own `main.ts` (mount point). |
| `src/accidents/navigation/`, `src/accidents/pagination/` | Small, isolated accidents that extend essence state/behavior from the outside. Not wired into a view by default — Step 5 says they can be developed and verified in isolation. |
| `legacy/` | A prior implementation, predating this split. Reference only; not wired into the toolchain. |

## The TDD loop — every essence or accident change, no exceptions

1. **Write a failing test (red).** State the behavior as an assertion before the
   implementation exists. Run it and confirm it actually fails — not just "the module is
   missing," read the failure output.
2. **Make it pass (green).** The smallest implementation that satisfies the assertion. Nothing
   speculative.
3. **Refactor.** Clean up naming/duplication with the safety net in place. "Nothing to
   refactor" is a valid, statable outcome — don't invent busywork.
4. **Run branch coverage.** `bun run test:branches`. Must be 100%. Bun's own `--coverage` only
   reports functions/lines — a line can execute while only ever taking one of its branches, so
   it will lie to you. `test:branches` runs through vitest+istanbul (see `vitest.config.mts`)
   for real per-branch numbers. If it's under 100%, either write the missing test or delete
   the dead code — don't leave it.
5. **Update the essence view/app and verify by what it renders, not by clicking.**
   Browser automation driving clicks turned out unreliable in this environment (it stopped
   working partway through a session, even on buttons proven to work minutes earlier) — do not
   depend on it. Instead:
   - For `src/accidents/view/essence`: add/update a named state in
     `src/accidents/view/essence/states.ts` so the new scenario is reachable from the sidebar,
     and confirm the render *functions'* own unit tests assert the exact output you expect.
     That's the proof, not a simulated click.
   - For `src/accidents/view/react`: confirm the composition root still bundles (`bun build
     src/accidents/view/react/main.ts --outdir <tmp> --format esm`) and, if you want a live
     check, start the dev server and confirm zero console errors — but treat that as a smoke
     test, not the verification. The view-model tests are the verification.
   - Every essence capability should end its cycle with something new to look at — a button,
     a rendered field — not just a passing assertion.
6. **Commit.** One cycle, one commit. Message states what red/green/refactor produced,
   confirms coverage passed, and says plainly if verification was "tests only" vs. "also
   checked live" — don't imply you clicked through something you didn't.

Composition roots (`src/index.ts`, `src/index.essence.ts`), mount points
(`src/accidents/view/*/main.ts`), and pure presentational components
(`src/accidents/view/react/components.ts`) are **not unit-tested** — same precedent as
`code-example.md`'s own `createCompositionRoot`/`Square`/`Board`/`Game`. They're excluded
explicitly in `vitest.config.mts`, not just left untested by accident.

## Naming — every name must be perceivable, not reified

- No synthetic `id`s. Identify things by what a user actually sees: an article by its title,
  a comment by its own content (`isSameComment` compares every field). If two natural keys
  collide in practice, that's a real design problem to raise, not a reason to add a hidden id.
- No routing/backend vocabulary leaking into state. `articleTitle`, not `articleSlug` — a
  slug is a URL accident, the title is what's on screen.
- No flags that just restate a comparison the caller could make itself. Ownership is
  `isMine({ authorName }, state)` — computed by comparing `authorName === state.name` — not a
  stored `isMine: boolean` field that could drift out of sync.
- One file per perceivable capability in `src/essence`: `favorite.ts` is favoriting,
  `follow.ts` is following, `comment.ts` is commenting. Don't merge unrelated capabilities into
  one file, and don't split one capability across files.
- **"Submit" is a reification too.** Nobody submits a form — a user clicks a button. "Submit"
  is HTML/HTTP vocabulary for a browser mechanism, not anything perceivable. A view component's
  *exposed* contract should say `onClick`, not `onSubmit`/`onSubmitArticle`/`onPublish`. See
  README's "The essential contract" section for the full argument.
- **A tool's own reification is fine — as long as it doesn't leak.** React's DOM event really
  is named `onSubmit`; a native button's attribute really is `type="submit"`. Using those
  *inside* a component's own implementation is fine — don't fork vocabulary a library already
  committed to. The rule is about the boundary: whatever the component *exposes* to its caller
  (its props type) must be grounded, even if its internal wiring isn't. Guard the boundary, not
  every line inside it.

## The checklist is not optional bookkeeping

[`docs/realworld-essence-checklist.md`](docs/realworld-essence-checklist.md) is the source of
truth for what's built and what isn't.

- Check off an item **only** after its code and tests actually exist and pass — check the box
  in the same commit as the code, with a `(→ functionName, path/to/file.ts)` pointer.
- If a checklist item is only partially satisfied, say so in a note next to it rather than
  checking or leaving it fully unchecked — see the history of the "who you follow determines
  your feed" item for the pattern.
- If you discover a capability or an accident category the checklist doesn't mention, **add
  it** — to Part 1 if it's essence (something removable would change what the app *is*), Part 2
  if it's accident. Don't silently build things the checklist doesn't track.
- Essence and accident classification calls that weren't explicitly confirmed get a ⚠️ and a
  line in "Open questions" at the bottom — flag your own judgment calls the same way.

## Commands

```bash
bun install              # install everything (essence itself needs none, but the repo does)
bun run test             # bun's own fast test run, src/
bun run test:coverage    # bun's function/line coverage (not sufficient alone — see above)
bun run test:branches    # the real check — 100% branches required, fails otherwise
bun run essence-view     # serve src/accidents/view/essence at :4321
bun run app              # serve src/accidents/view/react at :4323
```

## Before you start a session here

1. Read this file.
2. Skim [`docs/realworld-essence-checklist.md`](docs/realworld-essence-checklist.md) — what's
   checked, what's next, what's flagged.
3. Run `bun run test:branches` — confirm you're starting from green, 100%.
4. Pick the next unchecked item (or ask which one, if it's genuinely ambiguous which accident
   to build next — essence has a natural order from the checklist, accidents mostly don't).
5. Follow the TDD loop above. One item, one cycle, one commit. Don't batch multiple checklist
   items into one commit unless they're genuinely inseparable (e.g. a rename touching several
   files).
