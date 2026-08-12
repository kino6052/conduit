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
export type TPage = "home" | "login" | "article";

export type TNavigation = {
  getPage: () => TPage;
  // Meaningful only when getPage() === "article" -- null otherwise, same
  // as before.
  getOpenArticleTitle: () => string | null;
  openArticle: (title: string) => void;
  openLogin: () => void;
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
  const listeners = new Set<() => void>();

  const notify = (): void => {
    for (const listener of listeners) listener();
  };

  return {
    getPage: () => page,
    getOpenArticleTitle: () => openArticleTitle,
    openArticle: (title) => {
      page = "article";
      openArticleTitle = title;
      notify();
    },
    openLogin: () => {
      page = "login";
      openArticleTitle = null;
      notify();
    },
    goHome: () => {
      page = "home";
      openArticleTitle = null;
      notify();
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}
