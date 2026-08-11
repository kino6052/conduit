// Navigation ("which article is open") is accident, not essence -- decided
// back when essence-view/main.ts introduced activeArticleTitle. This is
// Step 4 (README, "Connecting to IO") applied to it: the contract is
// defined first, grounded in what's perceivable (an article is open, or
// it isn't), before any concrete implementation exists. Nothing here
// mentions URLs, hashes, or history -- that's the implementation's
// business, not the contract's.
export type TNavigation = {
  getOpenArticleTitle: () => string | null;
  openArticle: (title: string) => void;
  closeArticle: () => void;
  subscribe: (listener: () => void) => () => void;
};

// The simplest implementation of the contract: state held in memory, no
// browser, no URL. Good enough to test the contract itself; the
// composition root picks a different implementation (navigation-hash.ts)
// for the real, running app.
export function createMemoryNavigation(): TNavigation {
  let openArticleTitle: string | null = null;
  const listeners = new Set<() => void>();

  const notify = (): void => {
    for (const listener of listeners) listener();
  };

  return {
    getOpenArticleTitle: () => openArticleTitle,
    openArticle: (title) => {
      openArticleTitle = title;
      notify();
    },
    closeArticle: () => {
      openArticleTitle = null;
      notify();
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}
