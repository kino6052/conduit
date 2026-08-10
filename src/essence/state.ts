// The perceivable essence of Conduit, as state.
// Every field here traces back to a checked box in
// docs/realworld-essence-checklist.md — nothing else lives here.

// every field name should be related to something perceivable
// no abstract / reified concepts allowed

export type TArticle = {
  // we don't use id because it can be calculated from properties here
  title: string;
  summary: string;
  body: string;
  tags: string[];
  authorName: string;
  createdAt: string;
  favoritesCount: number;
  isFavorite: boolean;
};

export type TComment = {
  // we don't use id because it can be calculated from properties here
  articleSlug: string;
  authorName: string;
  body: string;
  createdAt: string;
};

export type TFilterName = "global" | "personal"; // everyone, or just who you follow

export type TState = {
  name: string; // the acting identity ("you") — always present
  articles: TArticle[];
  comments: TComment[];
  followedAuthors: string[];
  filterName: TFilterName;
  activeTag: string | null;
};

export function createInitialState(): TState {
  return {
    name: "you",
    articles: [],
    comments: [],
    followedAuthors: [],
    filterName: "global",
    activeTag: null,
  };
}
