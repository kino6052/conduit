import { describe, expect, it } from "bun:test";
import { createInitialState } from "./state";
import { writeComment } from "./comment";

describe("writeComment", () => {
  it("adds a comment, authored by you", () => {
    const state = createInitialState();

    const next = writeComment(state, "Some Article", "Great post!", "2026-01-10");

    expect(next.comments).toEqual([
      {
        articleSlug: "Some Article",
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
          articleSlug: "Other Article",
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
