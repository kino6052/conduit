// The real implementation of TNavigation (navigation.ts) for a running
// browser: which page, which open article, which article (if any) is
// being edited, and whose profile (if any) is open all live in the URL
// hash, not in memory, so the back/forward buttons and refresh all do the
// right thing for free.
//
// Not unit-tested -- window.location/hashchange are browser globals, same
// category as composition roots (README, "The essential contract"; this
// repo's precedent for anything that only exists once wired to a real
// browser). Verified live: watch the URL bar change on open/close, and
// that the back button actually goes to the right page.
//
// #/article/<title>, #/editor/<title>, and #/profile/<authorName> all use
// the thing's own name, URL-encoded -- no synthetic slug, same convention
// as everywhere else articles/authors are identified (selectArticle,
// editArticle, deleteArticle, toggleFavorite, toggleFollow). #/editor with
// nothing after it is a blank form; #/login is the only other named
// route; home is simply no hash.

import { TNavigation, TPage } from "./navigation";

const ARTICLE_HASH_PREFIX = "#/article/";
const EDITOR_HASH_PREFIX = "#/editor";
const PROFILE_HASH_PREFIX = "#/profile/";
const LOGIN_HASH = "#/login";

function readPage(): TPage {
  const { hash } = window.location;
  if (hash.startsWith(ARTICLE_HASH_PREFIX)) return "article";
  if (hash.startsWith(PROFILE_HASH_PREFIX)) return "profile";
  if (hash.startsWith(EDITOR_HASH_PREFIX)) return "editor";
  if (hash === LOGIN_HASH) return "login";
  return "home";
}

function readOpenArticleTitle(): string | null {
  const { hash } = window.location;
  if (!hash.startsWith(ARTICLE_HASH_PREFIX)) return null;
  return decodeURIComponent(hash.slice(ARTICLE_HASH_PREFIX.length));
}

function readEditingArticleTitle(): string | null {
  const { hash } = window.location;
  if (!hash.startsWith(EDITOR_HASH_PREFIX)) return null;
  const rest = hash.slice(EDITOR_HASH_PREFIX.length);
  if (!rest.startsWith("/")) return null;
  return decodeURIComponent(rest.slice(1));
}

function readProfileAuthorName(): string | null {
  const { hash } = window.location;
  if (!hash.startsWith(PROFILE_HASH_PREFIX)) return null;
  return decodeURIComponent(hash.slice(PROFILE_HASH_PREFIX.length));
}

export function createHashNavigation(): TNavigation {
  return {
    getPage: readPage,
    getOpenArticleTitle: readOpenArticleTitle,
    getEditingArticleTitle: readEditingArticleTitle,
    getProfileAuthorName: readProfileAuthorName,
    openArticle: (title) => {
      window.location.hash = ARTICLE_HASH_PREFIX + encodeURIComponent(title);
    },
    openLogin: () => {
      window.location.hash = LOGIN_HASH;
    },
    openEditor: (title) => {
      window.location.hash = title
        ? `${EDITOR_HASH_PREFIX}/${encodeURIComponent(title)}`
        : EDITOR_HASH_PREFIX;
    },
    openProfile: (authorName) => {
      window.location.hash = PROFILE_HASH_PREFIX + encodeURIComponent(authorName);
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
