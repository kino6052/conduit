# Essence

The minimal, necessary-and-sufficient, accident-agnostic implementation of Conduit.

No framework, no rendering library, no storage — those are accidents (see
[`docs/empirical-software-manifesto.md`](../../docs/empirical-software-manifesto.md)).
Only pure state, pure logic, and pure view-models live here, built test-first.

Scope is driven by [`docs/realworld-essence-checklist.md`](../../docs/realworld-essence-checklist.md).

Run tests: `bun test`

## SOLID, as practiced here

Full mapping: [`docs/solid-in-this-repo.md`](../../docs/solid-in-this-repo.md).

- **Single Responsibility**: one file, one perceivable capability. `favorite.ts` is
  favoriting, `follow.ts` is following, `comment.ts` is commenting — not "one reason to
  change" (unfalsifiable), but "one thing a user could point at."
- **Dependency Inversion**: nothing in this folder imports from `src/accidents` (which is
  everything else — both views, navigation, pagination). Check any file here — zero such
  imports. The dependency arrow points one way: accidents depend on essence, essence depends on
  nothing.
