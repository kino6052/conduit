# Conduit — An Empirically Grounded App

[codebase.show](https://codebase.show/projects/realworld)

This is a build of the [RealWorld/Conduit](https://github.com/realworld-apps/realworld) spec
following **Empirically Grounded Software** principles — see
[`docs/empirical-software-manifesto.md`](docs/empirical-software-manifesto.md). The short
version: every piece of software is **substance** (the essence — what it means to the user)
wrapped in **accidents** (the machinery that delivers it — frameworks, databases, styling,
routing). Accidents are swappable; the essence is not. We build the essence first, keep it
framework-free, and only then wrap it in whatever accidents the moment calls for.

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
