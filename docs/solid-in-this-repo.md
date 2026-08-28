---
title: SOLID, as actually practiced in this repo
subtitle: A concrete map from principle to file, grounded per docs/metaphysics-of-code.solid.md
date: 2026-08-11
tags: all; code / architecture; code / metaphysics; reference;
---

[`docs/metaphysics-of-code.solid.md`](./metaphysics-of-code.solid.md) re-derives SOLID from the
substance/accident distinction. This doc is the short version, pointed at real files, so code
comments can say "SRP, see here" instead of re-deriving the philosophy inline every time.

## Single Responsibility — one entity or one derived composite, per concern

Not "one reason to change" (unfalsifiable — every stakeholder is a reason). The concrete
version: every file's logic touches exactly one thing from
[`docs/ontological-entities-in-this-repo.md`](./ontological-entities-in-this-repo.md) — one
primary entity, one relation, or one named derived composite built from entities for a
specific screen — never a mix of unrelated ones.

This doesn't mean one entity gets exactly one file. Article alone has `write.ts`, `edit.ts`,
`delete.ts`, `favorite.ts`, and `article.ts` — five separate *concerns*, each entirely about
Article and nothing else. `comment.ts` puts all of Comment's lifecycle (write, read, delete) in
one file instead, because that grouping was still just about Comment. Either shape is fine; what
isn't is a file that reaches into two entities' business, or invents a field that belongs to
neither an entity nor a named composite.

Relations get the same treatment, kept separate from the entities they relate: `follow.ts` is
the follows-relation between the acting identity and an Author-name; `ownership.ts` is the
authored-by relation, deliberately generalized to work on an Article *or* a Comment rather than
living inside either.

Composites are named and scoped the same way: `feed.ts`'s `selectVisibleArticles` and
`src/accidents/view/react/view-model.ts`'s `compileFeedViewModel` are both "the Feed" — a
filtered, lensed list of Articles — never anything more. `essence/article.ts`'s
`selectArticle` and `article-view-model.ts`'s `compileArticleDetailViewModel` are both "the
Article Detail" composite — one Article, its Comments, the ownership relation — never anything
less or more than that screen needs. A composite is allowed to carry a relation's *effect*
(the Delete button existing or not) but never the relation *itself* as a separately named field
— that field wouldn't belong to the entity, the relation, or any named composite; it'd belong
to nothing, which is exactly how `TArticleDetailViewModel.isOwnArticle` was found and removed.

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

Same rule one level down, on a single entity rather than the whole domain: `isMine` in
`src/essence/ownership.ts` takes `{ authorName: string }`, not `TArticle` or `TComment`. It
doesn't need a title, a body, tags, or anything else either entity carries — just the one field
the relation is actually about — which is why it works on both without caring which one it got.

## Dependency Inversion — essence depends on nothing; accidents depend on essence

Check any file in `src/essence`: zero imports from `src/accidents` (both views, navigation,
pagination). The dependency arrow only ever points one way — accidents import essence, never
the reverse. This is what makes `bun run test` able to run the whole essence with zero external
dependencies: the substance doesn't know the accidents exist.
