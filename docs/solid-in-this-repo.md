---
title: SOLID, as actually practiced in this repo
subtitle: A concrete map from principle to file, grounded per docs/metaphysics-of-code.solid.md
date: 2026-08-11
tags: all; code / architecture; code / metaphysics; reference;
---

[`docs/metaphysics-of-code.solid.md`](./metaphysics-of-code.solid.md) re-derives SOLID from the
substance/accident distinction. This doc is the short version, pointed at real files, so code
comments can say "SRP, see here" instead of re-deriving the philosophy inline every time.

## Single Responsibility — one component, one perceivable entity

Not "one reason to change" (unfalsifiable — every stakeholder is a reason). Each file in
`src/essence` corresponds to exactly one thing a user could point at or one capability they
could name: `favorite.ts` is favoriting, `follow.ts` is following, `comment.ts` is commenting.
None of them reach into each other's concerns.

## Open/Closed — the essence is closed, accidents are open

`src/essence/state.ts` is never edited to add accident-only concerns. Pagination needed a
`page`/`pageSize` — instead of adding those fields to `TState`, `src/accidents/pagination/pagination-state.ts`
defines `TPaginationState = TState & { page; pageSize }` and builds one from an existing essence
state via composition (`{ ...essence, page: 1, pageSize: 10 }`). The essence is extended, never
modified. This is the Decorator pattern applied to state: wrap, don't rewrite.

## Liskov Substitution — a decorated state still satisfies the original contract

`TPaginationState` is a strict superset of `TState` (every essence field, plus more). Anywhere
`TState` is expected — `selectVisibleArticles`, `selectArticle`, `isMine`, all of them —
a `TPaginationState` can be passed instead and behaves identically, because it *is* one, plus
extra. `selectVisiblePage` in `src/accidents/pagination/pagination-state.ts` proves this: it hands the
whole wrapped state straight to `selectVisibleArticles` with no adapter, no field-picking.

## Interface Segregation — accidents depend on the smallest slice of essence they need

`paginate<T>(items, page, pageSize)` in `src/accidents/pagination/pagination.ts` doesn't import `TState` or
`TArticle` at all — it takes `T[]`. It has no idea articles, comments, or Conduit exist. The
narrowest possible contract, derived from what the function actually does, not from "the
shape of our domain."

## Dependency Inversion — essence depends on nothing; accidents depend on essence

Check any file in `src/essence`: zero imports from `src/accidents` (both views, navigation,
pagination). The dependency arrow only ever points one way — accidents import essence, never
the reverse. This
is what makes `bun run test` able to run the whole essence with zero external dependencies: the
substance doesn't know the accidents exist.
