# Conduit — An Empirically Grounded App

[codebase.show](https://codebase.show/projects/realworld)

## What this is

This is a build of the [RealWorld/Conduit](https://github.com/realworld-apps/realworld) spec —
a small blogging app: articles, comments, favoriting, following, a feed. There is nothing unusual
about the app itself. What's unusual is the order it got built in, and the questions that order
forces you to answer honestly.

Most software gets built the other way around: pick a framework, pick a database, and only then
work out what the app actually is. This one didn't. It started with one question — what does a
person using this app actually perceive? — and answered only that question, for a long time,
before a single line of framework code existed. The full reasoning behind that is
[`docs/empirical-software-manifesto.md`](docs/empirical-software-manifesto.md); this README is
the shorter, walked-through version, grounded in what actually happened while building this
particular app.

## Essence and accident

Say you're reading an article on this app. What's actually there?

A title. A body of text. Who wrote it. How many people favorited it. Some tags. That's the whole
of it — that's what you see, and that's everything the app has to be in order to be an app for
reading and writing articles.

None of that needed React to exist. None of it needed a particular database, a particular
routing scheme, a particular styling library. You could describe the whole thing on a napkin —
an article can be written, read, favorited, tagged — and nothing about the description would
change if the app were rebuilt from nothing, next year, in a different language.

That's the **essence**: the part of the app that's actually there, in front of a person.
Everything else — React, the database, the URL bar, the CSS — is **accident**: the machinery
that happens to be delivering the essence today, and could just as easily deliver it some other
way tomorrow.

There's one test for telling them apart, and it's the only test this project uses: can you point
at it on the screen? An article's title — yes, obviously. A `favoritesCount` number cached
somewhere in a database table — no. Nobody ever sees that field; they see a number next to a
heart icon, and the field is just one way of producing that number. If something can be removed
or swapped without changing what a person in front of the screen would say the app *is*, it's
accident. If removing it changes what the app is, it's essence.

The essence lives in [`src/essence`](src/essence) — plain objects, plain functions, nothing
else. Open any file there and it won't import React, won't import a database client, won't
import anything from the rest of the project at all. It can't: essence code never imports from
`src/accidents`, and that's checkable with one grep, not just a promise someone's supposed to
keep.

## Building the essence first, and putting off every other decision

Once essence and accident are actually separate, something follows from that separation: most
of the decisions usually made in the first week of a project — which framework, which database,
which API shape — turn out not to need making yet. They can wait. In this project, they did
wait, for most of its life.

The backend is the clearest case. Bun and SQLite weren't picked on day one and built around.
For most of this project there simply wasn't a backend at all — favoriting, following, writing,
commenting, every bit of it worked, was tested, and could be clicked through, with nothing
behind it but a name typed into a box and kept in memory. A backend only got built once "we need
one" was itself the next thing on the list — planned as its own document
([`docs/realworld-essence-checklist.md`](docs/realworld-essence-checklist.md), Part 3), argued
about, before a single line of server code existed.

Bio and avatar images went the same way. An earlier pass through this project decided — wrongly
— that neither one had anywhere to go: nothing on screen showed a bio, nothing showed an avatar,
so why build a page to edit them? That reasoning held for a while, then got checked against the
actual specification this app follows, and turned out to be backwards — every real version of
this app shows an avatar next to almost every name, and a bio on every profile. The wrong call
is still visible in [`docs/ontological-entities-in-this-repo.md`](docs/ontological-entities-in-this-repo.md),
corrected in place instead of quietly edited away, because the mistake is worth as much as the
fix: it shows exactly what happens when you reason from what your own code currently does
instead of checking what the app is actually supposed to show.

Whether Sign In and Sign Up should be one page or two sat as an open, named question in the
checklist for most of the project too — not an oversight, a flagged decision waiting for someone
to actually need the answer before it got one.

None of this happened by accident (the ordinary kind, not the technical kind). It's Step 4 of
this project's own process, taken seriously: describe what a dependency needs to *do*, in the
plainest terms available, and only decide *how* it does that once the question is concrete
enough that answering it is a real decision — not a guess made early, wearing a decision's
clothes.

## Four small apps, so you can think about one thing at a time

Open this repo and you won't find one app. You'll find four, and each one is missing something
the others have.

[`src/index.essence.ts`](src/index.essence.ts) runs the essence with nothing wrapped around it —
no React, no build step, plain strings written straight into the page. Nobody would ship this.
But it answers one question cleanly, with nothing else competing for attention: what does the
essence actually do?

[`src/accidents/view/essential-ui`](src/accidents/view/essential-ui) is the same thing with a
stylesheet on top, and nothing else added. It answers a second question on its own: is styling
actually separate from logic, or did the two get tangled together somewhere without anyone
noticing?

[`src/index.essential-dependencies.ts`](src/index.essential-dependencies.ts) is the real
composition logic — the same code deciding which page you're on, what a button should say, what
happens when it's clicked — wired to the simplest version of everything around it: no real URL,
no real storage, a confirmation dialog that always says yes. It answers a third question: does
the *shape* of the whole app hold up once every real-world complication is taken away?

[`src/index.ts`](src/index.ts) is the real thing: React, a real URL, a real database over HTTP.

Four exists instead of one because a person can't usefully reason about all four levels — the
essence alone, the essence with delivery, the whole app's logic, the whole app for real — while
looking at a single build that already has every accident decided inside it. There's nothing
left to separate once everything is already wired together. Split into four, and each one lets
you look at exactly one layer without the others getting in the way. That's also what makes it
possible to reason correctly about adding something new: the question "does this belong in the
essence, or is it an accident of how the essence gets delivered" can be asked against a genuinely
bare version of the essence, instead of guessed at while looking at a screen full of framework
code.

It isn't only a nice idea, either. Splitting it this way caught something once that a single
build never could have. The essence-view's editor form used a real click handler instead of a
real form submission — a fix for how clicks behave in some browsers — which meant a standard
HTML attribute, `required`, added to stop a blank title, silently did nothing there, even though
it worked correctly in the real app. Nobody would have noticed from the real app alone; there, it
worked fine. It only showed up because a second, framework-free version of the same essence
existed to check against.

## What this grounds: SOLID, made checkable

Every one of the five SOLID principles gets argued about constantly, and one reason is that most
of them are stated in a way that can't actually be checked. Take Single Responsibility: "a class
should have one reason to change." How many reasons can a piece of code have to change? As many
as there are people with an opinion about it — which means the rule can't ever really be broken,
on paper, because nothing counts as clear evidence against it.

Grounded in essence, the same rule becomes something you can check: one file's logic touches
exactly one entity, one relation between entities, or one named group of entities built for a
specific screen — never a mix. [`docs/ontological-entities-in-this-repo.md`](docs/ontological-entities-in-this-repo.md)
lists what those are, built by reading this app's own rendered output line by line, not by
guessing. A field called `isOwnArticle` failed that test directly: it wasn't Article, wasn't
Comment, wasn't a relation, wasn't a named screen composite — it was a cached answer to a
comparison anyone could already make themselves, and it was removed once that was noticed.

Open/Closed shows up as a rule this codebase has never once broken: `src/essence/state.ts` has
never grown a field that only an accident needs. Pagination needed a page number and a page
size; instead of adding them to the essence, `pagination-state.ts` wraps the essence in
something slightly bigger:

```ts
export type TPaginationState = TState & { page: number; pageSize: number };
```

The essence itself is never touched. It's wrapped.

Liskov Substitution is the reason that wrapping works at all: `TPaginationState` is still a
`TState`, plus two more fields, so anywhere the essence is expected, the wrapped version can be
handed over instead, with no translation code in between.

Interface Segregation is about taking only what's actually needed. `paginate` doesn't know an
article exists — it takes a plain list and two numbers, nothing about Conduit at all. `isMine`,
deciding whether something belongs to you, takes just an author's name — not a whole article,
not a whole comment, just the one field the question is actually about.

Dependency Inversion is the rule the file layout enforces on its own: nothing in `src/essence`
imports anything from `src/accidents`. Not "shouldn't." Doesn't — checkable with one grep, every
time, not a promise resting on anyone's memory.

The full file-by-file mapping lives in [`docs/solid-in-this-repo.md`](docs/solid-in-this-repo.md).

## Myths this busts

Once "does this appear on the actual screen" is the whole test for whether something is real,
a few pieces of standard advice stop holding up.

Domain-Driven Design is the clearest one. Ask what a "domain" actually is, and the honest answer
is: it's a model of how an organization talks about itself in a meeting, not a model of what a
user of the software actually sees. Nobody using this app ever encounters an Aggregate Root, a
Bounded Context, or a Repository. They see a button, a list, a form, a number — the same list
`docs/ontological-entities-in-this-repo.md` builds by reading render functions, not by guessing
what a stakeholder might call something. The moment "Customer" gets treated as more real than
the actual `<article>` tag on the screen, the architecture has started answering to an
organizational chart instead of to a person — and an org chart changes for reasons that have
nothing to do with whether the software still works.

There's a pattern worth noticing in how failures like that get explained away, too. When a
system built this other way becomes unmaintainable, the explanation is almost always some
version of "it wasn't done correctly" — the bounded contexts were drawn wrong, the team didn't
understand the pattern deeply enough. Ask what evidence would ever count *against* the method
itself, and there usually isn't one. A claim that absorbs every failure as proof of insufficient
purity, rather than as evidence against itself, isn't something you can actually test. That's
worth sitting with, because it's exactly the standard the next section holds this project to.

And "one reason to change" turns out to be an example of its own critique. It sounds like an
engineering principle. It behaves like a slogan — one nobody can point to a clear violation of,
because "reason to change" was never defined narrowly enough to be violated in the first place.

## What would prove this wrong

A method that can't be shown wrong isn't worth much more than the ones criticized above. So here,
plainly, are the ways this whole approach could turn out to be mistaken — not bugs in one file,
but places where the philosophy itself would have failed:

- **A real feature that grounding in what's on screen simply can't express.** If some genuine
  requirement turned out to have no perceivable form at all — nothing you could ever point to —
  and the app needed it anyway, that would mean "ground everything in what's visible" is too
  narrow a rule to build real software with.
- **Essence that can't actually stay preserved.** If, no matter how carefully the boundary was
  guarded, framework or database vocabulary kept leaking into `src/essence` with no way to stop
  it, that would mean the essence/accident split isn't a real boundary — just a convenient story.
- **Accidents that can't actually be put off.** If a real decision about the database, the
  framework, or the API shape turned out to be impossible to defer — if the essence genuinely
  couldn't be finished without deciding those things first — that would mean "decide the essence,
  then decide the accidents" is backwards, not just difficult.
- **A composition root that behaves differently than its missing accident explains.** Each of
  the four apps above is supposed to differ from the real one in exactly the way its swapped-out
  dependency accounts for — no URL updates, a reload loses everything, and nothing more. If one
  of them ever broke, or behaved differently, in some way that difference didn't cover, that
  would be direct evidence the essence wasn't as pure as claimed.
- **A file that genuinely can't be traced to one entity, relation, or named composite — with no
  fix available.** The grounded version of Single Responsibility above only means something if
  it can fail. If some piece of logic unavoidably needed two unrelated entities at once, with no
  clean way to split it, that would be a real counter-example to the rule, not just an
  inconvenience.
- **A reification that full test coverage stops catching.** The next section's claim is that a
  stored fact duplicating a derivable one always shows up as an awkward, extra branch to test.
  If that ever stopped being true — if a fake fact could hide behind 100% coverage without a
  test ever having to justify its existence — the coverage argument would be broken, not just
  imperfect.

None of these have happened here. That isn't proof the method is correct everywhere, forever —
it's the honest list of what *would* have counted as proof against it, which is the only thing
that makes the claims in this document actual claims, rather than slogans.

## TDD, and why full coverage is doing more than testing

Every change to the essence goes through the same loop, every time: write a test that fails,
write the smallest thing that makes it pass, clean up, run coverage, click the thing in a
browser, commit. Nothing skips a step. "Nothing needed cleaning up" is an allowed answer for the
refactor step — but only once someone's actually checked, not as a default nobody bothered to
ask about.

```ts
it("marks an unfavorited article as a favorite", () => {
  const next = toggleFavorite(state, article.title);
  expect(isFavoritedBy(next.articles[0], next.name)).toBe(true);
});
```

The coverage run — `bun run test:branches` — isn't measured in lines. It's measured in
branches: every `if`, every `?:`, every `&&`, both ways, or the build fails. That distinction
matters more than it sounds like it should, because of what a reification actually does to code.

A field that duplicates a fact instead of deriving it almost never adds new behavior on its own.
What it adds is a branch: a check for whether the cached copy still agrees with the real thing, a
fallback for when it doesn't. To reach 100%, that branch needs its own test — a test whose entire
purpose is proving a fake fact hasn't drifted from a real one. Writing that test is
uncomfortable, and the discomfort is the point: it's the moment the reification announces
itself, while it's still small and cheap to remove.

This project has a real example of exactly that. Articles used to carry a stored `isFavorite`
flag and a `favoritesCount` number, updated by hand every time someone favorited or
unfavorited something. Nothing forced those two numbers to stay honest — they were just two
separate facts that happened, so far, to agree. They were replaced with one list:
`favoritedBy: string[]`, the actual names of everyone who favorited the article. The count is
just how long the list is. "Did I favorite this" is just whether my name is in it. There's one
fact now, not two pretending to be independent, and there's nothing left that could drift.

That's also the whole reason refactoring stays affordable here instead of getting deferred the
way it usually does. A small, pure, fully-covered function doesn't need a staging deploy or a
colleague's manual click-through to be trusted after a change — the coverage run either stays
green or it doesn't, in seconds, for the entire essence at once.

## The part that doesn't take care of itself

None of the above makes grounding self-sustaining. It has to be checked, over and over, because
a reification isn't a one-time mistake avoided by deciding to avoid it — it's just where naming
things tends to drift, and it happened here more than once, with every rule above already in
force the whole time.

`docs/ontological-entities-in-this-repo.md` once stated, confidently, that an author had no
bio, no avatar, no email — a claim about what didn't exist, made by looking at what this
codebase currently did instead of checking what the app was actually supposed to show. It was
wrong, and it's still visible in the docs, corrected rather than deleted.

The stored `isFavorite`/`favoritesCount` pair above sat in the codebase for a real stretch of
time before anyone caught it.

And most recently: a handler called `onFavoriteClick` sat directly inside the contract a
presentational button reads its props from — essence vocabulary, crossing the exact boundary
this document argues shouldn't be crossed. It survived several rounds of review, flagged even in
an earlier version of this document as a known, unfixed gap, before it was actually fixed. The
people writing the rule that essence vocabulary shouldn't cross that boundary were, for a while,
the same people who'd left a piece of essence vocabulary sitting right on top of it.

None of that means the method failed. It means grounding decays the same way any other
invariant does, if nobody's actively holding it in place — which is exactly why "refactor" is a
step in the loop every single cycle, not something saved for when it starts to hurt, and exactly
why full branch coverage matters here specifically: it's what makes checking constantly cheap
enough to actually do, instead of being the first thing skipped when a deadline is close.

## Status

Finished, for now. Every essence item in
[`docs/realworld-essence-checklist.md`](docs/realworld-essence-checklist.md) is built and
checked off, each pointing at the `src/essence` code and its views (`src/accidents/view`) that
prove it. A round of checking that checklist against the actual RealWorld/Conduit spec
(paraphrased locally in [`docs/spec/`](docs/spec)) turned up real, spec-grounded gaps — an
author's bio and avatar image, a Settings page to edit them, Sign In and Sign Up as two real
pages, a real backend — all since closed. 245 tests, branch coverage 158/158 (100%). Four
composition roots (below) all build and run: the real app (React, RxJS, hash routing, a
Bun+SQLite backend), the essential-dependencies build (the same real logic, in-memory
dependencies), the bare essence-view (no framework at all), and essential-ui (essence-view plus
a stylesheet). What's left open is deliberately left open — see the checklist's own "Open
questions" section for the calls still flagged as unilateral. "Finished" here means "nothing
currently known to be ungrounded," not "nothing left to ever revisit" — see the section above.

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
  [`src/index.essential-dependencies.ts`](src/index.essential-dependencies.ts).
  - **[`backend/`](src/accidents/backend)** and **[`backend-sync/`](src/accidents/backend-sync)**
    — the real backend (Bun + SQLite, its own process, its own README-worthy plan in
    `docs/realworld-essence-checklist.md`'s Part 3) and the client-side adapter that keeps
    essence and every view-model completely unaware it exists.
  - **[`view/react/`](src/accidents/view/react)** — the real delivery: React + RxJS. View-model
    compiler, pure presentational components, `pages.ts` (Home/Login/Register/Article/Editor/
    Profile/Settings — separate routed screens), mount point, HTML shell, stylesheet.
    `compose-app.ts` holds the actual composition logic (which page, what props) as a plain,
    fully unit-tested function — every dependency it needs (navigation, sign-in, confirm, state,
    even the view itself) is injected, so `compose-app.test.ts` exercises the whole app end to
    end with in-memory implementations and bare bone view models, no rendering involved.
    `src/index.ts` just builds the real versions of those dependencies and adapts React's hooks
    into the plain snapshot this function takes.
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
bun run backend         # serve the real Bun+SQLite backend at http://localhost:4325 (needed by `bun run app`)
```
