# Conduit — An Empirically Grounded App

[codebase.show](https://codebase.show/projects/realworld)

This is a build of the [RealWorld/Conduit](https://github.com/realworld-apps/realworld) spec
following **Empirically Grounded Software** principles — see
[`docs/empirical-software-manifesto.md`](docs/empirical-software-manifesto.md). The short
version: every piece of software is **substance** (the essence — what it means to the user)
wrapped in **accidents** (the machinery that delivers it — frameworks, databases, styling,
routing). Accidents are swappable; the essence is not. We build the essence first, keep it
framework-free, and only then wrap it in whatever accidents the moment calls for.

**Status:** the essence is complete — every checkable item in
[`docs/realworld-essence-checklist.md`](docs/realworld-essence-checklist.md) is checked off,
each pointing at the `src/essence` code and `src/essence-view` rendering that prove it. 45
tests, branch coverage 30/30 (100%). Next up is Step 5: layering accidents (auth, settings,
pagination, markdown rendering, styling) on top of the now-stable essence.

## Project layout

- **[`docs/`](docs)** — the philosophy, and the living
  [essence checklist](docs/realworld-essence-checklist.md) that drives what gets built next
  (essence items and accident items, kept explicitly separate).
- **[`src/essence/`](src/essence)** — the essence itself. Pure state, pure logic, pure
  selectors/actions. No framework, no DOM, no network, no styling — if it isn't perceivable
  on screen, it doesn't belong here. Dependency-free by default; the checklist explains why.
- **[`src/essence-view/`](src/essence-view)** — a bare, unstyled, _interactive_ HTML rendering
  of the essence, plus a storybook-style sidebar for jumping between named states. This exists
  so the essence stays grounded in something you can actually click, not just typed data and
  green tests. See [`src/essence-view/README.md`](src/essence-view/README.md).
- **[`legacy/`](legacy)** — the prior React/Parcel/Storybook implementation. Kept for
  reference only; it predates the essence/accident split and isn't wired into the current
  toolchain (its dependencies aren't installed).

## Getting Started

> **Prerequisite:** Install [Bun](https://bun.sh).

```bash
bun install
```

```bash
bun run test            # run the essence + essence-view tests
bun run test:coverage   # bun's own function/line coverage
bun run test:branches   # branch coverage via vitest+istanbul, fails under 100%
bun run essence-view    # serve src/essence-view at http://localhost:4321
```

## Development Approach

### Key Principles

- **Essence Preserving**: the essence is protected from the accidents that deliver it.
- **Empirically Grounded**: entities are meaningful and perceivable, and are the source of truth.
- **Accident-Agnostic**: the essence carries no framework, no styling, and — by default — no
  dependencies at all. Frameworks are chosen later, for the accidents, not the essence.
- **Testable**: every branch of every essence function is covered — not just every line.
- **Outside-in, TDD**: nothing is written before a failing test asks for it.
- **Dependency Inversion**: storage, IO, and frameworks are deferred as long as possible.

### The essential contract — why accidents depend on essence, not the other way around

Essence never imports anything from `src/essence-view`, `src/app`, or `src/accidents` — that
direction is checked, not assumed (grep `src/essence` for those paths; there are none). But the
*other* direction is where most designs quietly go wrong: an accident depending on essence
should depend on the smallest, most generic contract that satisfies what it actually does — not
on essence's specific vocabulary. This applies to every kind of accident, not just the view — a
database, an API client, anything at the boundary.

Compare three ways to shape a form's props:

```ts
// Coupled to the domain
type TArticleFormProps = { onSubmitArticle: (draft: TDraftArticle) => void };

// Coupled to nothing about articles -- but still a reification
type TFormProps = { onSubmit: (values: Record<string, string>) => void };

// Grounded: the only thing that actually happens on screen
type TFormProps = { onClick: (values: Record<string, string>) => void };
```

`onSubmitArticle` bakes essence vocabulary — "submitting an article" — directly into a view
component's contract. The moment `writeArticle` is renamed, reshaped, or the whole idea of
"articles" is replaced by something else, the *view* has to change too, even though nothing
about how forms are drawn or clicked has changed. Essence and the view are now welded together
by a name, not by behavior — exactly the "fat interface" Interface Segregation warns about (see
[`docs/solid-in-this-repo.md`](docs/solid-in-this-repo.md)), just moved to the other end of the
dependency arrow.

But `onSubmit` isn't grounded either, even with the domain word gone. **Nobody submits a form.**
A user clicks a button. "Submit" is HTML/HTTP vocabulary — the name of a browser mechanism and
a request method — not anything a person does or perceives themselves doing. It survives in
most codebases only because it's the name of a DOM event; once it's the event name it quietly
becomes the handler's name, then the prop's name, then a whole mental model of "form
submission" that has no referent on the screen. Empirically, from the reference frame of what's
actually perceivable, there is no such event as "submit" — there is a click, on a button that
happens to be inside a form. `onClick` is the grounded version. `onSubmit` is a reification
that happened to become standard, in the same way `id`, `slug`, and `isMine` were reifications
this codebase already removed (see [`docs/realworld-essence-checklist.md`](docs/realworld-essence-checklist.md)
and `src/essence/state.ts`'s comments on `TArticle`/`TComment`).

A generic, grounded prop couples to nothing. A button that takes `{ label, onClick }` doesn't
know or care *what* happens when it's clicked — favoriting an article, publishing one, closing
a dialog are all the same shape to it. Something has to translate "the user clicked this" into
"favorite this article" — but that translation belongs in exactly one place: the composition
root / view-model compiler (`src/app/view-model.ts`, `src/app/composition-root.ts`), which is
the one part of the system explicitly allowed to know about both essence and the view at once.
Everywhere else, the dependency points one way, same as essence's own DIP rule, just mirrored:
essence knows nothing below it; pure view components should know as little as possible about
what's above them.

**The test:** if renaming or restructuring something in `src/essence` would force a rename
inside a presentational component or a storage adapter, the contract between them wasn't
essential — it was borrowed vocabulary. Shape the contract like the *interaction* (click,
label, list), not like the domain and not like the delivery mechanism (submit, request,
response), and let the one composition root carry the meaning.

This is a standard to hold new code to, not a claim that everything here already meets it —
`src/app/components.ts`'s `ArticlePreview` currently takes `onFavoriteClick`/`onFollowClick`
rather than fully generic button props, and its `Editor` still carries `onSubmit`/`handleSubmit`
internally, an `onPublish` prop, and a `TArticleSubmission` type — the exact reifications this
section argues against. These are steps toward the standard, not the standard itself. Worth
tightening in a future cycle; noted here rather than silently left as the model to copy.

### Steps

#### Step 1: Capture the essence as a minimal, necessary-and-sufficient checklist

If something can be removed without changing what the app _is_, it's not essence — it's
accident. The app needs a list of articles with titles; without that, it isn't an app about
sharing and discovering articles. A login form can be removed entirely without changing that
identity. Grounded in the screen, we don't care how — or whether — users log in; we care about
the ability to read and write articles and interact with them. That's the essence.

Captured as a thorough, living checklist:
[`docs/realworld-essence-checklist.md`](docs/realworld-essence-checklist.md) — essence and
accidents listed separately, each essence box linking to the code that proves it.

#### Step 2: Convert the essence to state

A plain, typed object representing the perceivable essence — see
[`src/essence/state.ts`](src/essence/state.ts). Field names are held to the same bar as
everything else: if a name doesn't refer to something a user could point at on screen, it
doesn't belong (no reified `id`s, no `isMine` flags standing in for a comparison anyone could
make themselves).

#### Step 3: MVVM & TDD — the loop, every cycle

Every change to `src/essence` (and its view in `src/essence-view`) goes through the same six
steps, in order, no exceptions:

1. **Write a failing test (red).** State the behavior as an assertion before any
   implementation exists, and confirm it actually fails — not just that the module is
   missing.
   ```ts
   // src/essence/favorite.test.ts
   it("marks an unfavorited article as a favorite, and counts it", () => {
     const state = { ...createInitialState(), articles: [article] };
     const next = toggleFavorite(state, article.title);
     expect(next.articles[0].isFavorite).toBe(true);
     expect(next.articles[0].favoritesCount).toBe(1);
   });
   ```
2. **Make it pass (green).** The smallest implementation that satisfies the assertion —
   nothing speculative, nothing for a case no test has asked for yet.
3. **Refactor.** With the safety net in place, clean up naming and duplication. If nothing
   needs to change, say so — "nothing to refactor" is a valid outcome, not a skipped step.
4. **Run coverage.** `bun run test:branches` — every branch, not just every line, since a
   line can execute while only ever taking one of its paths. Anything under 100% means either
   a missing test or dead code; both get fixed before moving on.
5. **Update the essence view and verify by hand.** `bun run essence-view`, open
   `http://localhost:4321`, and actually click the thing you just built. A passing test proves
   the logic; clicking a real button proves it's grounded in something perceivable. Every
   essence capability should end its cycle with something to click, not just an assertion —
   and where relevant, a new named state in `src/essence-view/states.ts` so the scenario stays
   reachable from the sidebar later.
6. **Commit.** One cycle, one commit, message states what red/green/refactor produced and
   confirms coverage and manual verification both passed.

#### Step 4: Connecting to IO

Delay decisions about storage and other IO as long as possible. Define the essence of any
dependency as an interface first; only the composition root (`src/essence-view/main.ts` today)
knows about a concrete implementation. Develop those implementations with TDD, same as
anything else.

#### Step 5: Capture non-essential features and add them

Keep the essential representation separate from the full, non-essential app. The
non-essential app extends the essential implementation rather than replacing it, and can be
developed and tested in isolation — it doesn't need every dependency composed to make
progress.

### Pros & Cons

**Pros:**

- Legacy-proof and adaptable — the essence doesn't know what framework it'll be wrapped in.
- Builds on established practices: MVVM, TDD, dependency inversion.
- Every essence claim is checkable: a checklist box, a test, and a clickable state, all
  pointing at each other.

**Cons:**

- Requires a coherent conceptual understanding of the application up front.
- Necessitates ongoing refactoring as the checklist grows.

## Conclusion

The essence is the part of this app that doesn't change when the framework does. Everything
in `src/essence` and `src/essence-view` is built to stay that way: framework-free, fully
tested down to the branch, and — critically — always one click away from being checked by a
human, not just a test runner.
