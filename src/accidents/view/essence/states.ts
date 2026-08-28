import { createInitialState, TArticle, TState } from "../../../essence/state";
import { writeArticle } from "../../../essence/write";
import { writeComment } from "../../../essence/comment";

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
  // Two favorites, neither "you" -- demonstrates the count without also
  // claiming you favorited it (see "grounding" below for that case).
  favoritedBy: ["alice", "bob"],
};

const grounding: TArticle = {
  title: "Grounding software in perception",
  summary: "Why essence comes before accident.",
  body: "If it isn't perceivable, it isn't essence.",
  tags: ["philosophy"],
  authorName: "bob",
  createdAt: "2026-01-05",
  // "you" (the default acting identity, TState.name) is one of the five --
  // the "A favorited article" named state below previews this exact
  // article specifically to show the Unfavorite label from your own
  // perspective.
  favoritedBy: ["alice", "carol", "dave", "erin", "you"],
};

export type TNamedState = {
  name: string;
  state: TState;
  // Which article's detail view (article.ts) should already be open when
  // this state is previewed, if any — lets the detail view (comments,
  // edit/delete controls) be previewed without clicking through the feed.
  openArticleTitle?: string;
};

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
  {
    // Also built through real essence actions -- previews the detail view
    // (article.ts): full body, tags, comments attributed to their authors,
    // and since it's authored by "you" (the default identity), the
    // edit/delete controls that isMine gates. Two comments -- one alice's,
    // one your own -- so the delete-comment control's isMine gate shows up
    // both ways (hidden on alice's, visible on yours) in the same preview.
    name: "An article with comments (owned by you)",
    state: (() => {
      const withArticle = writeArticle(createInitialState(), {
        title: "My First Post",
        summary: "Just published this.",
        body: "Written through the essence, not the UI.",
        tags: ["first-post"],
        createdAt: "2026-02-01",
      });
      const withAlicesComment = writeComment(
        { ...withArticle, name: "alice" },
        "My First Post",
        "Nice one!",
        "2026-02-02",
      );
      const withYourComment = writeComment(
        { ...withAlicesComment, name: "you" },
        "My First Post",
        "Thanks for reading!",
        "2026-02-03",
      );
      return withYourComment;
    })(),
    openArticleTitle: "My First Post",
  },
];
