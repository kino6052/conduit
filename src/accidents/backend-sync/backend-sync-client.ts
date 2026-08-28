// The real half of the backend accident's client-side adapter -- fetch,
// against the separate backend process (src/accidents/backend/server.ts).
// Untested, same category as navigation-hash.ts/persistence-local-
// storage.ts: real IO, verified live, not under bun:test. The pure half
// (computeSyncActions, backend-sync.ts) stays fully covered; this file
// only converts between its TSyncAction[] and actual HTTP calls, and
// between the server's spec-flavored wire shapes and TState.

import { createInitialState, TArticle, TComment, TState } from "../../essence/state";
import { TSyncAction } from "./backend-sync";

type TWireAuthor = { username: string; bio: string; image: string };

type TWireArticle = {
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  favoritedBy: string[];
  author: TWireAuthor;
};

type TWireComment = { id: number; body: string; createdAt: string; author: TWireAuthor };

function toArticle(wire: TWireArticle): TArticle {
  return {
    title: wire.title,
    summary: wire.description,
    body: wire.body,
    tags: wire.tagList,
    authorName: wire.author.username,
    createdAt: wire.createdAt,
    favoritedBy: wire.favoritedBy,
  };
}

function toComment(articleTitle: string, wire: TWireComment): TComment {
  return {
    articleTitle,
    authorName: wire.author.username,
    body: wire.body,
    createdAt: wire.createdAt,
  };
}

// One GET /api/articles, one GET .../comments per article, and (once a
// signed-in name is known) one GET .../following -- assembled into a
// TState the same shape createInitialState() already produces, just
// filled in from the backend instead of empty. Every author's bio/avatar
// encountered along the way (as an article's or comment's author) is
// folded in too, since the wire format already embeds it -- no separate
// per-name fetch needed for that part.
export async function hydrateStateFromBackend(
  baseUrl: string,
  actingName: string | undefined,
): Promise<TState> {
  const articlesResponse = await fetch(`${baseUrl}/api/articles`);
  const { articles: wireArticles } = (await articlesResponse.json()) as {
    articles: TWireArticle[];
  };

  const bios = new Map<string, string>();
  const avatarUrls = new Map<string, string>();
  const rememberAuthor = (author: TWireAuthor): void => {
    bios.set(author.username, author.bio);
    avatarUrls.set(author.username, author.image);
  };

  const articles = wireArticles.map((wire) => {
    rememberAuthor(wire.author);
    return toArticle(wire);
  });

  const comments: TComment[] = [];
  for (const wire of wireArticles) {
    const commentsResponse = await fetch(
      `${baseUrl}/api/articles/${encodeURIComponent(wire.title)}/comments`,
    );
    const { comments: wireComments } = (await commentsResponse.json()) as {
      comments: TWireComment[];
    };
    for (const wireComment of wireComments) {
      rememberAuthor(wireComment.author);
      comments.push(toComment(wire.title, wireComment));
    }
  }

  let followedAuthors: string[] = [];
  if (actingName) {
    const followingResponse = await fetch(
      `${baseUrl}/api/users/${encodeURIComponent(actingName)}/following`,
    );
    const { following } = (await followingResponse.json()) as { following: string[] };
    followedAuthors = following;
  }

  return {
    ...createInitialState(),
    name: actingName ?? "you",
    articles,
    comments,
    followedAuthors,
    bios: [...bios.entries()].map(([name, text]) => ({ name, text })),
    avatarUrls: [...avatarUrls.entries()].map(([name, url]) => ({ name, url })),
  };
}

function postJson(url: string, body: unknown): Promise<Response> {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function putJson(url: string, body: unknown): Promise<Response> {
  return fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function deleteJson(url: string, body?: unknown): Promise<Response> {
  return fetch(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

// Fire-and-forget from the caller's point of view -- essence/the
// view-model layer already updated the UI synchronously before this ever
// runs (setState already happened); this just persists what already
// changed. Sequential, not Promise.all, so two actions touching the same
// row (e.g. an edit followed immediately by a delete) land in the order
// they actually happened.
export async function executeSyncActions(baseUrl: string, actions: TSyncAction[]): Promise<void> {
  for (const action of actions) {
    await executeOne(baseUrl, action);
  }
}

async function executeOne(baseUrl: string, action: TSyncAction): Promise<void> {
  switch (action.type) {
    case "create-article":
      await postJson(`${baseUrl}/api/articles/${encodeURIComponent(action.article.title)}`, {
        title: action.article.title,
        description: action.article.summary,
        body: action.article.body,
        tagList: action.article.tags,
        createdAt: action.article.createdAt,
        asName: action.article.authorName,
      });
      return;

    case "edit-article":
      await putJson(`${baseUrl}/api/articles/${encodeURIComponent(action.article.title)}`, {
        title: action.article.title,
        description: action.article.summary,
        body: action.article.body,
        tagList: action.article.tags,
      });
      return;

    case "delete-article":
      await deleteJson(`${baseUrl}/api/articles/${encodeURIComponent(action.title)}`);
      return;

    case "add-favorite":
      await postJson(`${baseUrl}/api/articles/${encodeURIComponent(action.title)}/favorite`, {
        asName: action.name,
      });
      return;

    case "remove-favorite":
      await deleteJson(`${baseUrl}/api/articles/${encodeURIComponent(action.title)}/favorite`, {
        asName: action.name,
      });
      return;

    case "add-comment":
      await postJson(
        `${baseUrl}/api/articles/${encodeURIComponent(action.comment.articleTitle)}/comments`,
        {
          body: action.comment.body,
          createdAt: action.comment.createdAt,
          asName: action.comment.authorName,
        },
      );
      return;

    case "remove-comment":
      await deleteJson(
        `${baseUrl}/api/articles/${encodeURIComponent(action.comment.articleTitle)}/comments`,
        {
          authorName: action.comment.authorName,
          body: action.comment.body,
          createdAt: action.comment.createdAt,
        },
      );
      return;

    case "add-follow":
      await postJson(`${baseUrl}/api/profiles/${encodeURIComponent(action.followed)}/follow`, {
        asName: action.follower,
      });
      return;

    case "remove-follow":
      await deleteJson(`${baseUrl}/api/profiles/${encodeURIComponent(action.followed)}/follow`, {
        asName: action.follower,
      });
      return;

    case "update-user":
      await putJson(`${baseUrl}/api/user`, {
        asName: action.name,
        bio: action.bio,
        image: action.avatarUrl,
      });
      return;
  }
}
