// The client-side half of the backend accident's "adapter"
// (docs/realworld-essence-checklist.md's "Part 3") -- the whole point of
// this file is that essence, every view-model, and every component never
// change: this just watches TState transitions from the outside and
// figures out what, if anything, the backend needs told about it.
//
// Pure and tested, on purpose: no fetch, no bun:sqlite, nothing that
// can't run under bun:test. The real network calls this list implies are
// someone else's job (an executor, wired only into src/index.ts) -- same
// "define the contract/pure logic first, leave real IO for later" shape
// as every other accident here.

import { TArticle, TComment, TState } from "../../essence/state";
import { selectBio } from "../../essence/bio";
import { selectAvatarUrl } from "../../essence/avatar";

export type TSyncAction =
  | { type: "create-article"; article: TArticle }
  | { type: "edit-article"; article: TArticle }
  | { type: "delete-article"; title: string }
  | { type: "add-favorite"; title: string; name: string }
  | { type: "remove-favorite"; title: string; name: string }
  | { type: "add-comment"; comment: TComment }
  | { type: "remove-comment"; comment: TComment }
  | { type: "add-follow"; follower: string; followed: string }
  | { type: "remove-follow"; follower: string; followed: string }
  | { type: "update-user"; name: string; bio: string; avatarUrl: string };

// Same fields, same shape as essence/comment.ts's own (unexported)
// isSameComment -- kept as its own copy rather than importing a private
// helper across files; a comment's identity is always "all of its
// fields," everywhere that fact is needed.
function isSameComment(a: TComment, b: TComment): boolean {
  return (
    a.articleTitle === b.articleTitle &&
    a.authorName === b.authorName &&
    a.body === b.body &&
    a.createdAt === b.createdAt
  );
}

export function computeSyncActions(oldState: TState, newState: TState): TSyncAction[] {
  const actions: TSyncAction[] = [];

  const oldTitles = new Set(oldState.articles.map((article) => article.title));
  const newTitles = new Set(newState.articles.map((article) => article.title));

  for (const article of newState.articles) {
    if (!oldTitles.has(article.title)) {
      actions.push({ type: "create-article", article });
    }
  }
  for (const article of oldState.articles) {
    if (!newTitles.has(article.title)) {
      actions.push({ type: "delete-article", title: article.title });
    }
  }

  // Articles present in both states: an edited field (title itself isn't
  // compared here -- a title change is a new natural key, so it's already
  // reported above as a delete of the old one plus a create of the new
  // one, which is the philosophically consistent reading: this article,
  // identified by title, really did stop existing and a different one
  // took its place) and/or a changed favoritedBy, diffed independently so
  // either kind of change (or both at once) is reported correctly.
  for (const oldArticle of oldState.articles) {
    const newArticle = newState.articles.find((article) => article.title === oldArticle.title);
    if (!newArticle) continue;

    if (
      oldArticle.summary !== newArticle.summary ||
      oldArticle.body !== newArticle.body ||
      JSON.stringify(oldArticle.tags) !== JSON.stringify(newArticle.tags)
    ) {
      actions.push({ type: "edit-article", article: newArticle });
    }

    for (const name of newArticle.favoritedBy) {
      if (!oldArticle.favoritedBy.includes(name)) {
        actions.push({ type: "add-favorite", title: newArticle.title, name });
      }
    }
    for (const name of oldArticle.favoritedBy) {
      if (!newArticle.favoritedBy.includes(name)) {
        actions.push({ type: "remove-favorite", title: oldArticle.title, name });
      }
    }
  }

  for (const comment of newState.comments) {
    if (!oldState.comments.some((existing) => isSameComment(existing, comment))) {
      actions.push({ type: "add-comment", comment });
    }
  }
  for (const comment of oldState.comments) {
    if (!newState.comments.some((existing) => isSameComment(existing, comment))) {
      actions.push({ type: "remove-comment", comment });
    }
  }

  // Follows and your own bio/avatar are all properties of *the current
  // acting identity* -- comparing old vs. new only makes sense when it's
  // the same identity on both sides. A name change (signing in as someone
  // else) isn't a change to sync; it's a switch to a different identity
  // whose own follows/bio/avatar the backend already has from whenever
  // *that* name last synced them. Known gap, not solved here: this app
  // doesn't yet re-fetch a newly-signed-in name's own data from the
  // backend (docs/realworld-essence-checklist.md's "Part 3").
  if (oldState.name === newState.name) {
    for (const name of newState.followedAuthors) {
      if (!oldState.followedAuthors.includes(name)) {
        actions.push({ type: "add-follow", follower: newState.name, followed: name });
      }
    }
    for (const name of oldState.followedAuthors) {
      if (!newState.followedAuthors.includes(name)) {
        actions.push({ type: "remove-follow", follower: oldState.name, followed: name });
      }
    }

    const oldBio = selectBio(oldState, oldState.name);
    const newBio = selectBio(newState, newState.name);
    const oldAvatarUrl = selectAvatarUrl(oldState, oldState.name);
    const newAvatarUrl = selectAvatarUrl(newState, newState.name);
    if (oldBio !== newBio || oldAvatarUrl !== newAvatarUrl) {
      actions.push({ type: "update-user", name: newState.name, bio: newBio, avatarUrl: newAvatarUrl });
    }
  }

  return actions;
}
