# App

The real accident-layer delivery of Conduit — React + RxJS, following
[`docs/code-example.md`](../../docs/code-example.md)'s shape exactly:

1. **Pure logic** — already lives in `src/essence`; nothing here duplicates it.
2. **`view-model.ts`** — action runners (`onToggleFavorite`) and a view-model compiler
   (`compileFeedViewModel`) that turns essence state into props a component can render.
   Pure, TDD'd, no React import.
3. **`components.ts`** — pure presentational components (`ArticlePreview`, `Feed`), built with
   `React.createElement` (no JSX, no build-step transform to depend on). Not unit-tested — same
   as `code-example.md`'s `Square`/`Board`/`Game`, verified by looking, not asserting.
4. **`composition-root.ts`** — where essence, the view-model compiler, and the components
   finally meet: an RxJS `BehaviorSubject` store, `getState`/`setState`, a `useSharedState` hook,
   and the assembled `App`. Also not unit-tested, same precedent.

This is separate from [`src/essence-view`](../essence-view), which stays framework-free —
that folder exists purely to keep the essence grounded in something clickable during TDD.
`src/app` is the shape a real deployment would actually take.
