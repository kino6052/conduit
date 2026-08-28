import { describe, expect, it } from "bun:test";
import { createInitialState, TComment } from "./state";
import { writeComment, selectComments, deleteComment } from "./comment";

describe("writeComment", () => {
  it("adds a comment, authored by you", () => {
    const state = createInitialState();

    const next = writeComment(state, "Some Article", "Great post!", "2026-01-10");

    expect(next.comments).toEqual([
      {
        articleTitle: "Some Article",
        authorName: "you",
        body: "Great post!",
        createdAt: "2026-01-10",
      },
    ]);
  });

  it("leaves existing comments untouched", () => {
    const state = {
      ...createInitialState(),
      comments: [
        {
          articleTitle: "Other Article",
          authorName: "bob",
          body: "Existing comment",
          createdAt: "2026-01-01",
        },
      ],
    };

    const next = writeComment(state, "Some Article", "Great post!", "2026-01-10");

    expect(next.comments).toHaveLength(2);
    expect(next.comments[0].body).toBe("Existing comment");
  });
});

describe("selectComments", () => {
  it("returns only the comments for the given article", () => {
    const state = {
      ...createInitialState(),
      comments: [
        { articleTitle: "A", authorName: "alice", body: "Nice!", createdAt: "2026-01-01" },
        { articleTitle: "B", authorName: "bob", body: "Great!", createdAt: "2026-01-02" },
      ],
    };

    expect(selectComments(state, "A")).toEqual([
      { articleTitle: "A", authorName: "alice", body: "Nice!", createdAt: "2026-01-01" },
    ]);
  });
});

describe("deleteComment", () => {
  const comment: TComment = {
    articleTitle: "A",
    authorName: "you",
    body: "Nice!",
    createdAt: "2026-01-01",
  };

  it("removes the comment", () => {
    const state = { ...createInitialState(), comments: [comment] };

    const next = deleteComment(state, comment);

    expect(next.comments).toEqual([]);
  });

  it("leaves every other comment untouched", () => {
    const other: TComment = { ...comment, body: "A different comment" };
    const state = { ...createInitialState(), comments: [comment, other] };

    const next = deleteComment(state, comment);

    expect(next.comments).toEqual([other]);
  });
});
