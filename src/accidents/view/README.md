# View

Two accident-layer implementations of the same view, side by side — view (and view-model) are
themselves accidents, a rendering-technology choice swappable like any other, which is why both
live under `src/accidents/`, not as their own top-level folders.

Each has its own composition root, but neither composition root lives *in here* — a composition
root is where essence and a view actually meet and get wired together, so both sit at the top of
`src/`, one hop above this folder, not buried inside it:

- **[`react/`](react)** — the real delivery: React + RxJS, following
  [`docs/code-example.md`](../../../docs/code-example.md)'s MVVM shape (view-model compiler →
  pure presentational components). Composition root: [`src/index.ts`](../../index.ts). Mount
  point, HTML shell, and stylesheet all live in `react/` itself — accident artifacts, not
  composition logic. Serve: `bun run app` (port 4323).
- **[`essence/`](essence)** — the bare, unstyled, framework-free rendering used to keep the
  essence grounded in something clickable during TDD — see
  [`essence/README.md`](essence/README.md). Composition root:
  [`src/index.essence.ts`](../../index.essence.ts). Serve: `bun run essence-view` (port 4321).

Neither `view-model.ts`/`article-view-model.ts` (in `react/`) nor `feed.ts`/`article.ts`/etc.
(in `essence/`) duplicate any logic — both just render `src/essence`'s state and call its
functions. Pure presentational pieces in both are TDD'd the same way; composition roots and DOM
mount points are not unit-tested (same precedent as `code-example.md`'s own
`createCompositionRoot`), excluded explicitly in `vitest.config.mts` rather than left untested
by accident.
