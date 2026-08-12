// Navigation ("which page is showing, and which article, if any") is
// accident, not essence -- decided when src/index.essence.ts (essence-view's
// composition root) first introduced activeArticleTitle. This is Step 4
// (README, "Connecting to IO") applied to it: the contract is defined
// first, grounded in what's perceivable, before any concrete
// implementation exists. Nothing here mentions URLs, hashes, or history --
// that's the implementation's business, not the contract's.
//
// TPage exists because separate, dedicated pages are themselves accident --
// docs/realworld-essence-checklist.md's "Pages" section: which of these
// screens exist as distinct, reachable places (vs. everything on one
// always-visible screen) doesn't change what the app *is*, only how it's
// delivered.
export type TPage = "home" | "login" | "article" | "editor" | "profile";

export type TNavigation = {
  getPage: () => TPage;
  // Meaningful only when getPage() === "article" -- null otherwise.
  getOpenArticleTitle: () => string | null;
  // Meaningful only when getPage() === "editor" -- null means a blank
  // form (writing a new article), a title means pre-filled (editing that
  // one). Same "one form, two actions, told apart by what's already
  // pre-filled" shape as essence-view's editingArticleTitle
  // (src/index.essence.ts) and the Editor component itself.
  getEditingArticleTitle: () => string | null;
  // Meaningful only when getPage() === "profile" -- whose profile,
  // identified the same way everything else is, by the name itself, not
  // a synthetic id.
  getProfileAuthorName: () => string | null;
  openArticle: (title: string) => void;
  openLogin: () => void;
  openEditor: (title?: string) => void;
  openProfile: (authorName: string) => void;
  goHome: () => void;
  subscribe: (listener: () => void) => () => void;
};

// The simplest implementation of the contract: state held in memory, no
// browser, no URL. Good enough to test the contract itself; the
// composition root picks a different implementation (navigation-hash.ts)
// for the real, running app.
export function createMemoryNavigation(): TNavigation {
  let page: TPage = "home";
  let openArticleTitle: string | null = null;
  let editingArticleTitle: string | null = null;
  let profileAuthorName: string | null = null;
  const listeners = new Set<() => void>();

  const notify = (): void => {
    for (const listener of listeners) listener();
  };

  const clearEverything = (): void => {
    openArticleTitle = null;
    editingArticleTitle = null;
    profileAuthorName = null;
  };

  return {
    getPage: () => page,
    getOpenArticleTitle: () => openArticleTitle,
    getEditingArticleTitle: () => editingArticleTitle,
    getProfileAuthorName: () => profileAuthorName,
    openArticle: (title) => {
      clearEverything();
      page = "article";
      openArticleTitle = title;
      notify();
    },
    openLogin: () => {
      clearEverything();
      page = "login";
      notify();
    },
    openEditor: (title) => {
      clearEverything();
      page = "editor";
      editingArticleTitle = title ?? null;
      notify();
    },
    openProfile: (authorName) => {
      clearEverything();
      page = "profile";
      profileAuthorName = authorName;
      notify();
    },
    goHome: () => {
      clearEverything();
      page = "home";
      notify();
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}
