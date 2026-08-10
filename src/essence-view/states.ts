import { createInitialState, TArticle, TState } from "../essence/state";
import { writeArticle } from "../essence/write";

// A curated list of essential scenarios to preview, bare-bone-storybook
// style. Not essence itself — a fixture set for manually verifying the
// essence-view against each shape the real state can take.

const welcome: TArticle = {
  title: "Welcome to Conduit",
  summary: "A place to share your knowledge.",
  body: "The essence of a Medium clone, built test-first.",
  tags: ["welcome", "conduit"],
  authorName: "alice",
  createdAt: "2026-01-01",
  favoritesCount: 2,
  isFavorite: false,
};

const grounding: TArticle = {
  title: "Grounding software in perception",
  summary: "Why essence comes before accident.",
  body: "If it isn't perceivable, it isn't essence.",
  tags: ["philosophy"],
  authorName: "bob",
  createdAt: "2026-01-05",
  favoritesCount: 5,
  isFavorite: true,
};

export type TNamedState = { name: string; state: TState };

export const namedStates: TNamedState[] = [
  {
    name: "Empty feed",
    state: createInitialState(),
  },
  {
    name: "Global feed",
    state: { ...createInitialState(), articles: [welcome, grounding] },
  },
  {
    name: "Personal feed (following alice)",
    state: {
      ...createInitialState(),
      articles: [welcome, grounding],
      followedAuthors: ["alice"],
      filterName: "personal",
    },
  },
  {
    name: "Filtered by tag: philosophy",
    state: {
      ...createInitialState(),
      articles: [welcome, grounding],
      activeTag: "philosophy",
    },
  },
  {
    name: "A favorited article",
    state: { ...createInitialState(), articles: [grounding] },
  },
  {
    // Built through the real essence action, not a hand-written fixture —
    // previewing this is how we check writeArticle's shape without
    // clicking through the editor form.
    name: "Freshly published article (by you)",
    state: writeArticle(
      { ...createInitialState(), articles: [welcome, grounding] },
      {
        title: "My First Post",
        summary: "Just published this.",
        body: "Written through the essence, not the UI.",
        tags: ["first-post"],
        createdAt: "2026-02-01",
      },
    ),
  },
];
