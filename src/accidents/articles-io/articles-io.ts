import { TArticle } from "../../essence/state";

// Real IO -- a fetch, a file read -- would be async and could fail; there's
// no backend to fetch from yet (still open,
// docs/realworld-essence-checklist.md: "back-end language/framework"), but
// the contract is shaped for one anyway, same "Step 4" discipline as
// TNavigation/TConfirm/TSignIn: define it grounded in what the essence
// needs (a list of TArticle) before any concrete implementation exists.
export type TLoadArticles = () => Promise<TArticle[]>;

// alice and bob -- the same two names essence-view's own fixtures use
// (src/accidents/view/react/pages.ts's sibling,
// src/accidents/view/essence/states.ts), not a fresh cast invented here.
// Each wrote more than one article, and their tags overlap, so a fresh
// visitor's feed and popular-tags widget both read as one small, real
// community -- articles connected to a few recurring authors, not a pile
// of disconnected one-off names.
const seedArticles: TArticle[] = [
  {
    title: "Grounding software in perception",
    summary: "Why essence comes before accident.",
    body: "If it isn't perceivable, it isn't essence. Everything else is machinery -- swappable, replaceable, and beside the point.",
    tags: ["philosophy", "essence"],
    authorName: "alice",
    createdAt: "2026-01-05",
    favoritesCount: 3,
    isFavorite: false,
  },
  {
    title: "Why this app doesn't use synthetic ids",
    summary: "Natural keys, all the way down.",
    body: "An article is its title. A comment is its own content. An id would just be a stand-in for something a person can already point at.",
    tags: ["philosophy", "typescript"],
    authorName: "alice",
    createdAt: "2026-01-12",
    favoritesCount: 5,
    isFavorite: false,
  },
  {
    title: "A love letter to red, green, refactor",
    summary: "The same three steps, every single time.",
    body: "Write the failing test first. Make it pass with the least code that will do it. Then, and only then, clean up.",
    tags: ["testing", "typescript"],
    authorName: "bob",
    createdAt: "2026-01-08",
    favoritesCount: 2,
    isFavorite: false,
  },
  {
    title: "What guarding the boundary actually means",
    summary: "A library's own vocabulary is fine -- as long as it doesn't leak.",
    body: "React calls it onSubmit. HTML calls it type=\"submit\". Neither word needs to survive past the component that uses it.",
    tags: ["testing", "react"],
    authorName: "bob",
    createdAt: "2026-01-15",
    favoritesCount: 4,
    isFavorite: false,
  },
];

// The simplest implementation: a small, connected dataset held in this
// file rather than fetched from anywhere. Good enough to test the
// contract itself, and, for now, the only implementation this app has --
// same starting point as createMemoryNavigation before a real backend
// exists to fetch from. A fresh copy every call, and a fresh copy of each
// article inside it -- callers own what they do with the array (write,
// favorite, delete), never this module's own data.
export const loadSeedArticles: TLoadArticles = async () =>
  seedArticles.map((article) => ({ ...article }));
