// The real implementation of TNavigation (navigation.ts) for a running
// browser: the open article lives in the URL hash, not in memory, so the
// back/forward buttons and refresh both do the right thing for free.
//
// Not unit-tested -- window.location/hashchange are browser globals, same
// category as composition roots (README, "The essential contract"; this
// repo's precedent for anything that only exists once wired to a real
// browser). Verified live: watch the URL bar change on open/close, and
// that the back button actually closes the article.
//
// #/article/<title> uses the article's own title, URL-encoded -- no
// synthetic slug, same convention as everywhere else articles are
// identified (selectArticle, editArticle, deleteArticle, toggleFavorite).

import { TNavigation } from "./navigation";

const ARTICLE_HASH_PREFIX = "#/article/";

function readOpenArticleTitle(): string | null {
  const { hash } = window.location;
  if (!hash.startsWith(ARTICLE_HASH_PREFIX)) return null;
  return decodeURIComponent(hash.slice(ARTICLE_HASH_PREFIX.length));
}

export function createHashNavigation(): TNavigation {
  return {
    getOpenArticleTitle: readOpenArticleTitle,
    openArticle: (title) => {
      window.location.hash = ARTICLE_HASH_PREFIX + encodeURIComponent(title);
    },
    closeArticle: () => {
      window.location.hash = "";
    },
    subscribe: (listener) => {
      window.addEventListener("hashchange", listener);
      return () => window.removeEventListener("hashchange", listener);
    },
  };
}
