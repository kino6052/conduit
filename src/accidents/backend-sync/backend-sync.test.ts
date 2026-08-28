import { describe, expect, it } from "bun:test";
import { createInitialState, TArticle, TComment, TState } from "../../essence/state";
import { setBio } from "../../essence/bio";
import { setAvatarUrl } from "../../essence/avatar";
import { computeSyncActions } from "./backend-sync";

const article: TArticle = {
  title: "Real World",
  summary: "s",
  body: "b",
  tags: ["x"],
  authorName: "alice",
  createdAt: "2026-01-01",
  favoritedBy: [],
};

describe("computeSyncActions", () => {
  it("reports nothing for two identical states", () => {
    const state = { ...createInitialState(), articles: [article] };

    expect(computeSyncActions(state, state)).toEqual([]);
  });

  it("reports a new article as create-article", () => {
    const oldState = createInitialState();
    const newState = { ...oldState, articles: [article] };

    expect(computeSyncActions(oldState, newState)).toEqual([{ type: "create-article", article }]);
  });

  it("reports a removed article as delete-article", () => {
    const oldState = { ...createInitialState(), articles: [article] };
    const newState = { ...oldState, articles: [] };

    expect(computeSyncActions(oldState, newState)).toEqual([
      { type: "delete-article", title: "Real World" },
    ]);
  });

  it("reports a changed body/summary/tags as edit-article", () => {
    const oldState = { ...createInitialState(), articles: [article] };
    const edited: TArticle = { ...article, summary: "new summary" };
    const newState = { ...oldState, articles: [edited] };

    expect(computeSyncActions(oldState, newState)).toEqual([
      { type: "edit-article", article: edited },
    ]);
  });

  it("reports a changed body alone as edit-article", () => {
    const oldState = { ...createInitialState(), articles: [article] };
    const edited: TArticle = { ...article, body: "new body" };
    const newState = { ...oldState, articles: [edited] };

    expect(computeSyncActions(oldState, newState)).toEqual([
      { type: "edit-article", article: edited },
    ]);
  });

  it("reports changed tags alone as edit-article", () => {
    const oldState = { ...createInitialState(), articles: [article] };
    const edited: TArticle = { ...article, tags: ["y"] };
    const newState = { ...oldState, articles: [edited] };

    expect(computeSyncActions(oldState, newState)).toEqual([
      { type: "edit-article", article: edited },
    ]);
  });

  it("a title change is a delete of the old title plus a create of the new one", () => {
    const oldState = { ...createInitialState(), articles: [article] };
    const renamed: TArticle = { ...article, title: "Renamed" };
    const newState = { ...oldState, articles: [renamed] };

    expect(computeSyncActions(oldState, newState)).toEqual([
      { type: "create-article", article: renamed },
      { type: "delete-article", title: "Real World" },
    ]);
  });

  it("reports a name added to favoritedBy as add-favorite", () => {
    const oldState = { ...createInitialState(), articles: [article] };
    const favorited: TArticle = { ...article, favoritedBy: ["bob"] };
    const newState = { ...oldState, articles: [favorited] };

    expect(computeSyncActions(oldState, newState)).toEqual([
      { type: "add-favorite", title: "Real World", name: "bob" },
    ]);
  });

  it("reports a name removed from favoritedBy as remove-favorite", () => {
    const withFavorite: TArticle = { ...article, favoritedBy: ["bob"] };
    const oldState = { ...createInitialState(), articles: [withFavorite] };
    const newState = { ...oldState, articles: [article] };

    expect(computeSyncActions(oldState, newState)).toEqual([
      { type: "remove-favorite", title: "Real World", name: "bob" },
    ]);
  });

  it("a name that stays favorited across old and new isn't reported at all", () => {
    const before: TArticle = { ...article, favoritedBy: ["bob", "carol"] };
    const after: TArticle = { ...article, favoritedBy: ["bob", "dave"] };
    const oldState = { ...createInitialState(), articles: [before] };
    const newState = { ...oldState, articles: [after] };

    const actions = computeSyncActions(oldState, newState);

    expect(actions).toContainEqual({ type: "add-favorite", title: "Real World", name: "dave" });
    expect(actions).toContainEqual({ type: "remove-favorite", title: "Real World", name: "carol" });
    expect(actions).toHaveLength(2);
  });

  it("reports a new comment as add-comment", () => {
    const comment: TComment = {
      articleTitle: "Real World",
      authorName: "bob",
      body: "Nice!",
      createdAt: "2026-01-02",
    };
    const oldState = createInitialState();
    const newState = { ...oldState, comments: [comment] };

    expect(computeSyncActions(oldState, newState)).toEqual([{ type: "add-comment", comment }]);
  });

  it("reports a removed comment as remove-comment", () => {
    const comment: TComment = {
      articleTitle: "Real World",
      authorName: "bob",
      body: "Nice!",
      createdAt: "2026-01-02",
    };
    const oldState = { ...createInitialState(), comments: [comment] };
    const newState = { ...oldState, comments: [] };

    expect(computeSyncActions(oldState, newState)).toEqual([{ type: "remove-comment", comment }]);
  });

  it("a comment present in both old and new isn't reported at all", () => {
    const kept: TComment = {
      articleTitle: "Real World",
      authorName: "bob",
      body: "Nice!",
      createdAt: "2026-01-02",
    };
    const added: TComment = { ...kept, authorName: "carol", body: "Agreed." };
    const oldState = { ...createInitialState(), comments: [kept] };
    const newState = { ...oldState, comments: [kept, added] };

    expect(computeSyncActions(oldState, newState)).toEqual([{ type: "add-comment", comment: added }]);
  });

  it("reports a newly followed author as add-follow", () => {
    const oldState = createInitialState();
    const newState = { ...oldState, followedAuthors: ["alice"] };

    expect(computeSyncActions(oldState, newState)).toEqual([
      { type: "add-follow", follower: "you", followed: "alice" },
    ]);
  });

  it("reports an unfollowed author as remove-follow", () => {
    const oldState = { ...createInitialState(), followedAuthors: ["alice"] };
    const newState = { ...oldState, followedAuthors: [] };

    expect(computeSyncActions(oldState, newState)).toEqual([
      { type: "remove-follow", follower: "you", followed: "alice" },
    ]);
  });

  it("an author still followed in both old and new isn't reported at all", () => {
    const oldState = { ...createInitialState(), followedAuthors: ["alice", "carol"] };
    const newState = { ...oldState, followedAuthors: ["alice", "bob"] };

    const actions = computeSyncActions(oldState, newState);

    expect(actions).toContainEqual({ type: "add-follow", follower: "you", followed: "bob" });
    expect(actions).toContainEqual({ type: "remove-follow", follower: "you", followed: "carol" });
    expect(actions).toHaveLength(2);
  });

  it("reports an avatar change alone as one update-user action", () => {
    const oldState = createInitialState();
    const newState = setAvatarUrl(oldState, "https://example.com/you.png");

    expect(computeSyncActions(oldState, newState)).toEqual([
      { type: "update-user", name: "you", bio: "", avatarUrl: "https://example.com/you.png" },
    ]);
  });

  it("reports a changed bio/avatar as one update-user action", () => {
    const oldState = createInitialState();
    const newState = setAvatarUrl(setBio(oldState, "new bio"), "https://example.com/you.png");

    expect(computeSyncActions(oldState, newState)).toEqual([
      { type: "update-user", name: "you", bio: "new bio", avatarUrl: "https://example.com/you.png" },
    ]);
  });

  it("does not report follow/bio/avatar changes across a name change -- switching identity isn't syncing one", () => {
    const oldState: TState = { ...createInitialState(), followedAuthors: ["alice"] };
    const newState: TState = { ...oldState, name: "bob", followedAuthors: ["carol"] };

    expect(computeSyncActions(oldState, newState)).toEqual([]);
  });
});
