// The real implementation of TNavigation (navigation.ts) for a running
// browser: which page and which open article live in the URL hash, not in
// memory, so the back/forward buttons and refresh both do the right thing
// for free.
//
// Not unit-tested -- window.location/hashchange are browser globals, same
// category as composition roots (README, "The essential contract"; this
// repo's precedent for anything that only exists once wired to a real
// browser). Verified live: watch the URL bar change on open/close, and
// that the back button actually goes to the right page.
//
// #/article/<title> uses the article's own title, URL-encoded -- no
// synthetic slug, same convention as everywhere else articles are
// identified (selectArticle, editArticle, deleteArticle, toggleFavorite).
// #/login is the only other named route; home is simply no hash.

import { TNavigation, TPage } from "./navigation";

const ARTICLE_HASH_PREFIX = "#/article/";
const LOGIN_HASH = "#/login";

function readPage(): TPage {
  const { hash } = window.location;
  if (hash.startsWith(ARTICLE_HASH_PREFIX)) return "article";
  if (hash === LOGIN_HASH) return "login";
  return "home";
}

function readOpenArticleTitle(): string | null {
  const { hash } = window.location;
  if (!hash.startsWith(ARTICLE_HASH_PREFIX)) return null;
  return decodeURIComponent(hash.slice(ARTICLE_HASH_PREFIX.length));
}

export function createHashNavigation(): TNavigation {
  return {
    getPage: readPage,
    getOpenArticleTitle: readOpenArticleTitle,
    openArticle: (title) => {
      window.location.hash = ARTICLE_HASH_PREFIX + encodeURIComponent(title);
    },
    openLogin: () => {
      window.location.hash = LOGIN_HASH;
    },
    goHome: () => {
      window.location.hash = "";
    },
    subscribe: (listener) => {
      window.addEventListener("hashchange", listener);
      return () => window.removeEventListener("hashchange", listener);
    },
  };
}
