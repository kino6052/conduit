# Conduit — An Empirically Grounded App

[codebase.show](https://codebase.show/projects/realworld)

This is a build of the [RealWorld/Conduit](https://github.com/realworld-apps/realworld) spec
following **Empirically Grounded Software** principles — see
[`docs/empirical-software-manifesto.md`](docs/empirical-software-manifesto.md). The short
version: every piece of software is **substance** (the essence — what it means to the user)
wrapped in **accidents** (the machinery that delivers it — frameworks, databases, styling,
routing). Accidents are swappable; the essence is not. We build the essence first, keep it
framework-free, and only then wrap it in whatever accidents the moment calls for — and we keep
every decision *about* those accidents open for as long as possible, deciding the framework, the
database, the API shape, even whether Sign In and Sign Up are one page or two, only once the
essence made the question concrete enough to actually answer. The
[Philosophy in practice](#philosophy-in-practice) section below is the fuller argument for why
that ordering isn't just a style preference: it's what makes the rest of this README's claims
checkable rather than asserted.

**Status:** finished, for now. Every essence item in
[`docs/realworld-essence-checklist.md`](docs/realworld-essence-checklist.md) is built and checked
off, each pointing at the `src/essence` code and its views (`src/accidents/view`) that prove it.
A round of checking that checklist against the actual RealWorld/Conduit spec (paraphrased locally
in [`docs/spec/`](docs/spec)) turned up real, spec-grounded gaps — an author's bio and avatar
image, a Settings page to edit them, Sign In and Sign Up as two real pages, a real backend — all
since closed. 245 tests, branch coverage 156/156 (100%). Four composition roots
([below](#project-layout)) all build and run: the real app (React, RxJS, hash routing, a
Bun+SQLite backend), the essential-dependencies build (same real logic, in-memory dependencies),
the bare essence-view (no framework at all), and essential-ui (essence-view plus a stylesheet).
What's left open is deliberately left open — see the checklist's own "Open questions" section for
the calls still flagged as unilateral, and the caveat on reification below for why "finished"
here means "nothing currently known to be ungrounded," not "nothing left to ever revisit."

## Project layout

- **[`docs/`](docs)** — the philosophy, and the living
  [essence checklist](docs/realworld-essence-checklist.md) that drives what gets built next
  (essence items and accident items, kept explicitly separate).
- **[`src/essence/`](src/essence)** — the essence itself. Pure state, pure logic, pure
  selectors/actions. No framework, no DOM, no network, no styling — if it isn't perceivable
  on screen, it doesn't belong here. Dependency-free by default; the checklist explains why.
- **[`src/accidents/`](src/accidents)** — everything that delivers the essence. Composition
  roots sit at the top of `src/`, not buried inside here (a composition root is where essence
  and a view meet, so it isn't itself "the view") — see
  [`src/index.ts`](src/index.ts), [`src/index.essence.ts`](src/index.essence.ts), and
  [`src/index.essential-dependencies.ts`](src/index.essential-dependencies.ts) — the same real
  `composeApp`/essence/pages as `src/index.ts`, wired to every dependency's simplest, essential
  implementation instead (in-memory navigation and state, an always-confirm function), running
  live rather than only under test.
  - **[`view/react/`](src/accidents/view/react)** — the real delivery: React + RxJS. View-model
    compiler, pure presentational components, `pages.ts` (Home/Login/Article/Editor — separate
    routed screens), mount point, HTML shell, stylesheet. `compose-app.ts` holds the actual
    composition logic (which page, what props) as a plain, fully unit-tested function — every
    dependency it needs (navigation, sign-in, confirm, state, even the view itself) is injected,
    so `compose-app.test.ts` exercises the whole app end to end with in-memory implementations
    and bare bone view models, no rendering involved. `src/index.ts` just builds the real
    versions of those dependencies and adapts React's hooks into the plain snapshot this
    function takes.
  - **[`view/essence/`](src/accidents/view/essence)** — a bare, unstyled, _interactive_ HTML
    rendering of the essence, plus a storybook-style sidebar for jumping between named states.
    Exists so the essence stays grounded in something you can actually click, not just typed
    data and green tests. See [its README](src/accidents/view/essence/README.md). Deliberately
    has no pages of its own — see the essence checklist's "Pages" section for why a grounding
    tool and a real app want opposite things here.
  - **[`view/essential-ui/`](src/accidents/view/essential-ui)** — the barebone/essential UI
    dependency: the exact same essence-view render functions and composition root, unchanged
    (`main.ts` here is a one-line `import "../essence/main"`), with a minimal stylesheet and
    HTML shell layered on top instead of essence-view's own zero styling. Builds on top of the
    essence-view literally — not a fork, a presentation layer.
  - **[`navigation/`](src/accidents/navigation)**, **[`pagination/`](src/accidents/pagination)**,
    **[`state-management/`](src/accidents/state-management)** — smaller, isolated accidents,
    developed and tested independent of either view.
- **[`legacy/`](legacy)** — the prior React/Parcel/Storybook implementation. Kept for
  reference only; it predates the essence/accident split and isn't wired into the current
  toolchain (its dependencies aren't installed).

## Getting Started

> **Prerequisite:** Install [Bun](https://bun.sh).

```bash
bun install
```

```bash
bun run test            # run every essence + accident test
bun run test:coverage   # bun's own function/line coverage
bun run test:branches   # branch coverage via vitest+istanbul, fails under 100%
bun run essence-view    # serve src/accidents/view/essence at http://localhost:4321
bun run app             # serve src/accidents/view/react at http://localhost:4323
bun run essential-app   # serve the same app on essential (in-memory) dependencies at http://localhost:4322
bun run essential-ui    # serve essence-view with a minimal stylesheet layered on top, at http://localhost:4324
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

Essence never imports anything from `src/accidents` (either view, navigation, pagination) — that
direction is checked, not assumed (grep `src/essence` for that path; there are none). But the
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
root / view-model compiler (`src/accidents/view/react/view-model.ts`, `src/index.ts`), which is
the one part of the system explicitly allowed to know about both essence and the view at once.
Everywhere else, the dependency points one way, same as essence's own DIP rule, just mirrored:
essence knows nothing below it; pure view components should know as little as possible about
what's above them.

**The test:** if renaming or restructuring something in `src/essence` would force a rename
inside a presentational component or a storage adapter, the contract between them wasn't
essential — it was borrowed vocabulary. Shape the contract like the *interaction* (click,
label, list), not like the domain and not like the delivery mechanism (submit, request,
response), and let the one composition root carry the meaning.

**A tool's own reification is allowed to exist — just not to leak.** React's DOM event is
literally named `onSubmit`; an HTML button's native attribute is literally `type="submit"`.
Renaming those away would just mean maintaining a fork of vocabulary React and HTML already
committed to — pointless. The rule is about the *boundary*:
`src/accidents/view/react/components.ts`'s `Editor` uses React's
`onSubmit`/`handleSubmit`/`type="submit"` entirely inside its own implementation,
and that's fine, because nothing outside the component ever sees those names. What the
component *exposes* — `TEditorProps` — is `onClick`, grounded, with no `onSubmit` in sight.
Guard the boundary, not every line inside it.

**"Store"/"session"/"storage"/"auth" are the same mistake as "submit," just from the backend
side.** None of them ever appear in what the app renders — same test
`docs/ontological-entities-in-this-repo.md` already applies to reject `User` as an entity. An
accident that needs to hold state with no perceivable or persisted backing yet — whether you're
currently signed in, an RxJS subject wiring essence to React — should be named after the fact
itself (`signedIn`) or the form/control that drives it (`state$`), not the implementation
category it happens to resemble (`store`, `session`). This is stricter than the boundary rule
above: it applies to internal variable names too, including inside the composition root, because
unlike React's `onSubmit` there's no library actually calling the concept "a store" — that name
would be one we invented, not one we inherited.

This was a standard to hold new code to before it was a standard the existing code actually
met. `ArticlePreview` used to take `onFavoriteClick`/`onFollowClick` directly — real leaks, not
guarded internal detail, flagged here rather than silently left as the model to copy. Fixed:
`TToggleButtonProps`/`TButtonProps` (`view-model.ts`) are two fully generic shapes — a labeled
button with an on/off state, and a labeled button without one — and `compileFavoriteFollowProps`
is the one place now allowed to know that the first one means favoriting and the second one
means following. The feed's lens toggle ("Global Feed"/"Your Feed") and Profile's one
context-dependent button (Follow/Unfollow, or Edit Profile Settings on your own profile) went
through the same fix, for the same reason: `onSetFilterClick(filterName: TFilterName)` handed a
presentational component an essence-defined union type directly, and `isOwnProfile` was a stored
flag standing in for a choice the view-model layer could just make once and hand down as the
button's own label — the same "no `isOwnArticle`-style cache" rule `isMine` already followed,
just found a second time, one layer up.

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

Every change to `src/essence` (and its views in `src/accidents/view`) goes through the same six
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
   and where relevant, a new named state in `src/accidents/view/essence/states.ts` so the
   scenario stays reachable from the sidebar later.
6. **Commit.** One cycle, one commit, message states what red/green/refactor produced and
   confirms coverage and manual verification both passed.

#### Step 4: Connecting to IO

Delay decisions about storage and other IO as long as possible. Define the essence of any
dependency as an interface first; only a composition root (`src/index.ts`,
`src/index.essence.ts`) knows about a concrete implementation. `src/accidents/navigation` is
this applied for real: `TNavigation` is the interface, `createMemoryNavigation` and
`createHashNavigation` are two swappable implementations behind it. Develop implementations
with TDD, same as anything else.

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

## Philosophy in practice

Everything above is a method. This section is why the method produces the specific things this
repo has: four composition roots instead of one, decisions left open for most of the project's
life, and a coverage gate that fails the build at 99%. None of it is aesthetic preference —
each choice is what the essence/accident split *implies*, once you take it seriously enough to
follow through.

### Decisions kept open — on purpose, and for a long time

"Build the essence first" only means something if the accidents genuinely stayed undecided
while it happened. In this repo they did, checkably:

- **The backend didn't exist until the very last feature.** Every essence function — favoriting,
  following, writing, commenting — was built, tested, and clicked-through in
  `src/accidents/view/essence` for most of this project's life with *no* durable storage
  anywhere except a signed-in name in `localStorage`. Bun and SQLite weren't chosen on day one
  and worked backward from; they were chosen once "we need a backend" was itself the next item
  on the checklist, planned as its own doc section (`docs/realworld-essence-checklist.md`'s
  "Part 3") *before* a line of server code existed, specifically so the choice could be argued
  about instead of assumed.
- **Bio and avatar sat unbuilt, on purpose, until the spec forced the question.** An earlier pass
  reasoned — wrongly — that neither had "a perceivable correlate anywhere in this app's actual
  rendered output" and used that to decide against a Settings page outright. That call held for
  a while, got checked against the actual RealWorld specification, turned out to be reasoning
  from this codebase's own current gaps rather than from the thing it was supposed to be
  grounded in, and was reversed — see
  [`docs/ontological-entities-in-this-repo.md`](docs/ontological-entities-in-this-repo.md)'s
  Author entry, which still carries the correction inline rather than a silently edited history.
  The point isn't that the first call was wrong; it's that the architecture made the wrongness
  cheap to find and cheap to fix, because nothing downstream had been built assuming it.
- **Whether Sign In and Sign Up should be one page or two stayed an open question** — literally
  flagged as one, by name, in the checklist's own "Open questions" section — for most of this
  project, resolved only once it was worth answering.
- Every one of these lived, while undecided, as a flagged, dated, revisitable entry in
  `docs/realworld-essence-checklist.md`'s own "Open questions / unilateral calls" section — not
  as an implicit assumption baked into code no one thought to question.

This is Step 4 (`Connecting to IO`, above) taken all the way: not "defer storage a little," but
defer *every* accident-level commitment until the essence has made the question concrete enough
that answering it is a real decision instead of a guess dressed up as one.

### Why four composition roots, not one

A claim like "the essence doesn't depend on React, RxJS, or a backend" is unfalsifiable until
someone actually tries running it without them. One working app proves nothing about that claim
— you cannot tell, from a single build, whether framework-coupling quietly leaked in, because
there's nothing to compare it against. So this repo doesn't have one composition root; it has
four, each one a live falsification attempt against a specific piece of the claim:

- **`src/index.essence.ts`** — the essence with *no* framework at all: no React, no build step,
  plain DOM strings. If the essence secretly needed React, this wouldn't run.
- **`src/accidents/view/essential-ui`** — the exact same essence-view render functions, with
  only a stylesheet layered on top. If styling and logic were actually entangled, this
  wouldn't be a one-line `import`.
- **`src/index.essential-dependencies.ts`** — the *real* `composeApp`, the real React
  components, wired to the simplest possible implementation of every dependency (in-memory
  state, no URL, an always-`true` confirm). If any of navigation, persistence, or the backend
  had quietly become load-bearing for the composition logic itself, this build would either fail
  to compile or behave differently in some way beyond "the URL bar doesn't update and a reload
  loses everything" — exactly the two things the swapped dependencies were actually responsible
  for, and the only two things that are allowed to differ.
- **`src/index.ts`** — every accident for real: React, RxJS, hash routing, `localStorage`, a
  Bun+SQLite backend over HTTP.

This isn't hypothetical insurance. It caught a real bug this project: essence-view's Editor used
`type="button"` with manual click-delegation (a fix for real click-handling quirks), which meant
the native HTML `required` attribute — added to match the real app's validation — was silently
inert there, since `required` only guards an actual `submit` event. The bug was invisible in the
real app, where `required` genuinely works. It was only visible because a second, framework-free
build of the same essence existed to check against — the falsification attempt actually caught
something, which is the only way you'd know the whole exercise wasn't theater.

### What this grounds: SOLID, precisely

The full mapping lives in [`docs/solid-in-this-repo.md`](docs/solid-in-this-repo.md); the
headline claim is that every letter stops being a matter of taste once "essence" has a checkable
definition — [`docs/ontological-entities-in-this-repo.md`](docs/ontological-entities-in-this-repo.md),
built from what the app's own render functions actually produce, not from what a developer
assumes exists.

- **Single Responsibility** stops meaning "one reason to change" — a phrase so elastic that
  every stakeholder in the building counts as a reason, which makes the principle unfalsifiable:
  no file could ever conclusively violate it, because you can always invent a reason it might
  need to change. The grounded version is checkable instead: *one file's logic touches exactly
  one entity, one relation, or one named derived composite from the entity list — never a mix.*
  `TArticleDetailViewModel.isOwnArticle` failed this test and was removed — not because someone
  felt it was inelegant, but because it belonged to none of the three categories: not an entity,
  not a relation, not a named composite, just a cached comparison masquerading as a fact.
- **Open/Closed** is why `src/essence/state.ts` has never once grown an accident-only field.
  Pagination needed `page`/`pageSize`; they live in
  `src/accidents/pagination/pagination-state.ts`'s `TPaginationState = TState & { page; pageSize }`
  — essence extended by intersection, never edited. The same shape was reused for this session's
  loading-state accident (`TLoadingState = TState & { isLoaderShown }`) without anyone having to
  re-derive the pattern; it was already load-bearing precedent, not a one-off decision.
- **Liskov Substitution** holds because a decorated state is a strict superset, not a
  reshaping — `TPaginationState` and `TLoadingState` both satisfy every essence function's
  contract with zero adapter code, because they *are* a `TState`, plus more.
- **Interface Segregation** is the rule this README's own "essential contract" section spends
  the most words on: a contract shaped like the interaction (`onClick`, a label, a list), never
  like the domain (`onSubmitArticle`) and never like the delivery mechanism (`onSubmit`) —
  `isMine` taking `{ authorName: string }` instead of a whole `TArticle` is the same rule one
  level down, on a single function instead of a whole boundary.
- **Dependency Inversion** is the one rule enforced by the file system itself, not just
  convention: `src/essence` has zero imports from `src/accidents`, checkable with one grep.

### Myths this busts

Once "an entity is a thing that appears in the program's own rendered output" is the actual
test — not "a thing the team agreed to model" — several standard pieces of advice stop surviving
contact with it:

- **Domain-Driven Design's "domain" is not a feature of the software's relationship to its
  user — it's a model of the organization's own bureaucracy.** A user never sees an Aggregate
  Root, a Bounded Context, or a Repository; they see a button, a list, a form, a confirmation
  message. Those are the actual ontological primitives — the same list this repo's own
  [`docs/ontological-entities-in-this-repo.md`](docs/ontological-entities-in-this-repo.md)
  derives, line by line, from what `renderFeed`/`renderArticleDetail`/the React components
  actually produce. The moment "Customer" or "Aggregate" gets architectural authority instead
  of a rendered `<article>` or `<li>`, the org chart has been handed the structural weight of
  physical law — and org charts change for political reasons, constantly, while a button either
  is or isn't on the screen. This is an inverted ontological commitment in the literal sense: DDD
  takes the map (how people in a meeting talk about the system) as more real than the territory
  (what the system actually shows a user), when it has to be the other way around for the
  architecture to answer to anything checkable.
- **"The bounded contexts were drawn wrong" is not a diagnosis — it's the tell that the
  methodology is unfalsifiable.** When a DDD system, a microservices architecture, or an
  event-sourced system becomes unmaintainable, the standard explanation is always some version
  of "not executed correctly," never "the method itself was the problem." A claim that can
  absorb every failure as evidence of insufficient purity, rather than as evidence against
  itself, isn't an engineering claim — it can't be tested, which means it can't be wrong, which
  means it isn't telling you anything. This repo's essence/accident split makes the opposite bet
  explicitly falsifiable, and stakes something on it: if any of the four composition roots above
  failed to build, or behaved differently in some way beyond what its swapped-out accidents were
  actually responsible for, that would be direct evidence the essence wasn't as pure as claimed
  — not a reason to add a fifth composition root and call the first four "not executed
  correctly."
- **"One reason to change" is itself an example of the pattern it's diagnosing in others** — an
  ungrounded principle, stated as if self-evidently true, that turns out to be unfalsifiable the
  moment you ask what actually counts as a reason. This repo doesn't reject SRP; it replaces the
  unfalsifiable phrasing with the checkable one two sections up, which is the same move made
  against DDD, just aimed at a principle usually taken for granted rather than one usually
  argued against.

### TDD, and why the coverage gate is doing more than QA

Every essence change goes through the same six-step loop (Step 3, above): a failing test first,
the smallest implementation that passes it, a refactor pass that's allowed to conclude "nothing
to refactor," a coverage run, a manual click in `essence-view`, one commit. `bun run
test:branches` isn't measuring code quality in the abstract — it fails the build under 100%, on
purpose, and that specific bar (branches, not lines — a line can execute while only ever taking
one of its paths) is what turns coverage from a QA metric into an entity-creep detector.

Here's the mechanism: a reified field — a stored flag, a cached value, an `id`, a duplicated fact
— almost never introduces new *behavior*. It introduces a new *branch*: a check for whether the
cached value agrees with the thing it's cached from, an `if` that only exists to keep two
representations in sync, a fallback for the case where they've drifted. To hit 100%, that branch
now needs its own test — which means writing a test whose entire purpose is proving a reification
doesn't cause a bug that a derived computation could never have had in the first place, because
there'd be nothing to drift. Writing that test is uncomfortable in exactly the way that's useful:
it's the moment the reification announces itself, before it's had time to spread. This project's
own `favoritedBy: string[]` replacing a stored `isFavorite`/`favoritesCount` pair is that pattern
caught directly — the stored pair could disagree with reality by construction (nothing forced
`favoritesCount` to equal how many names had actually favorited it); `favoritedBy.length` cannot,
because there's only one fact, not two describing the same thing.

The speed argument follows from the same mechanism, not a separate one. Because every essence
function is small, pure, and already proven correct down to the branch, a refactor doesn't need
a QA pass, a staging deploy, or a colleague's manual click-through to be trusted — `bun run
test:branches` either stays green or it doesn't, in seconds, for the whole essence at once. The
"Cons" list above says this approach "necessitates ongoing refactoring as the checklist grows";
100% branch coverage is exactly what makes that refactoring cheap enough to actually happen
instead of being deferred the way it usually is everywhere else.

### The caveat: reifications slip in anyway

None of this makes grounding self-sustaining. It has to be re-checked, constantly, because
reification is not a one-time architectural mistake you avoid by deciding to — it's the default
gravity of naming things, and it slipped into *this* project's own code and docs more than once,
with the discipline explicitly in force the whole time:

- `docs/ontological-entities-in-this-repo.md`'s own Author entry asserted, confidently, that
  there was "no bio, no avatar, no email" — a claim about what doesn't exist that turned out to
  be wrong, made from introspecting this codebase's current state rather than checking the
  actual spec the checklist is supposed to answer to.
- `TArticle.isFavorite`/`favoritesCount` were exactly the kind of stored duplication the
  coverage argument above describes — present in the codebase for a real stretch of time before
  being caught and replaced.
- Mid-session, correcting a Settings-page decision required an explicit reminder that bio,
  avatar, and identity fields describe *names*, not *people* — that this app's ontology has no
  `User`/`Person` entity, only names and the independent, perceivable facts attached to them
  (`src/essence/bio.ts`'s and `avatar.ts`'s own header comments exist specifically to keep that
  distinction visible at the one place future code would be most tempted to blur it).

The lesson isn't that the method failed; it's that grounding decays without active maintenance,
the same way any invariant does. That's precisely why the TDD loop's third step is "Refactor,"
every single cycle, not "refactor when it starts to hurt" — and precisely why 100% branch
coverage matters here specifically: it's what makes near-constant refactoring cheap enough to
actually happen on every cycle, rather than being the thing that gets skipped when a deadline is
close. A codebase that can't afford to refactor constantly will accumulate the reifications this
philosophy exists to prevent, regardless of how good its founding principles were on day one.

## Conclusion

The essence is the part of this app that doesn't change when the framework does. Everything
in `src/essence` and `src/accidents/view/essence` is built to stay that way: framework-free,
fully tested down to the branch, and — critically — always one click away from being checked by
a human, not just a test runner.
