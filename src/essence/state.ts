// The perceivable essence of Conduit, as state.
// Every field here traces back to a checked box in
// docs/realworld-essence-checklist.md — nothing else lives here.

// every field name should be related to something perceivable
// no abstract / reified concepts allowed

// Dependency Inversion (docs/solid-in-this-repo.md#dependency-inversion):
// this file, and everything else in src/essence, imports nothing from
// src/accidents (both views, navigation, pagination all live there). The
// dependency arrow points one way --
// accidents depend on essence, never the reverse. If accidents need more
// than TState offers (e.g. pagination's page/pageSize), they extend it by
// composition from their own side (src/accidents/pagination/pagination-state.ts),
// never by editing this file -- see Open/Closed in the same doc.

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
  // and articleTitle, not articleSlug -- a slug is a routing accident,
  // the title is what you actually see
  articleTitle: string;
  authorName: string;
  body: string;
  createdAt: string;
};

export type TFilterName = "global" | "personal"; // everyone, or just who you follow

export type TState = {
  // The acting identity -- always present in essence. Whether anyone is
  // currently "signed in" (vs. a guest) is an accident's concern, tracked
  // by extending state from the accident side
  // (src/accidents/sign-in/sign-in.ts), never by making this field
  // optional -- same Open/Closed discipline pagination-state.ts already
  // established for page/pageSize.
  name: string;
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
