// The backend accident's HTTP surface -- Bun.serve, routes shaped like
// the real spec's (docs/spec/endpoints.md), adapted for this app's own
// identity model: natural keys instead of slugs, an explicit `asName`
// field on every mutating request instead of a JWT/session (there's no
// account to hold one), and CORS since the frontend is a separate
// process/origin (docs/realworld-essence-checklist.md's "Part 3").
//
// Untested, same category as navigation-hash.ts/persistence-local-
// storage.ts: real IO (bun:sqlite, a real HTTP server), verified live.
// The wire shapes here are deliberately spec-flavored (title/description/
// tagList/author{username,bio,image}), not this app's own essence field
// names (summary/tags/authorName) -- converting between the two is the
// client-side adapter's job (a later cycle), so this file stays ignorant
// of TState/TArticle entirely, same "guard the boundary" discipline as
// everywhere else a library/protocol's own vocabulary shouldn't leak
// past where it's actually needed.

import { Database } from "bun:sqlite";
import { openDatabase, seedIfEmpty } from "./db";

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

type TWireComment = {
  id: number;
  body: string;
  createdAt: string;
  author: TWireAuthor;
};

function readAuthor(db: Database, name: string): TWireAuthor {
  const row = db.query("SELECT bio, avatar_url FROM users WHERE name = $name").get({
    $name: name,
  }) as { bio: string; avatar_url: string } | null;
  return { username: name, bio: row?.bio ?? "", image: row?.avatar_url ?? "" };
}

function readArticle(db: Database, title: string): TWireArticle | undefined {
  const row = db
    .query(
      "SELECT title, summary, body, tags_json, author_name, created_at FROM articles WHERE title = $title",
    )
    .get({ $title: title }) as
    | {
        title: string;
        summary: string;
        body: string;
        tags_json: string;
        author_name: string;
        created_at: string;
      }
    | null;
  if (!row) return undefined;

  const favoritedBy = (
    db
      .query("SELECT name FROM article_favorites WHERE article_title = $title")
      .all({ $title: title }) as { name: string }[]
  ).map((r) => r.name);

  return {
    title: row.title,
    description: row.summary,
    body: row.body,
    tagList: JSON.parse(row.tags_json),
    createdAt: row.created_at,
    favoritedBy,
    author: readAuthor(db, row.author_name),
  };
}

function readAllArticles(db: Database): TWireArticle[] {
  const titles = (db.query("SELECT title FROM articles ORDER BY created_at").all() as {
    title: string;
  }[]).map((r) => r.title);
  return titles.map((title) => readArticle(db, title)!);
}

function readComments(db: Database, articleTitle: string): TWireComment[] {
  const rows = db
    .query(
      "SELECT id, author_name, body, created_at FROM comments WHERE article_title = $title ORDER BY created_at",
    )
    .all({ $title: articleTitle }) as {
    id: number;
    author_name: string;
    body: string;
    created_at: string;
  }[];
  return rows.map((row) => ({
    id: row.id,
    body: row.body,
    createdAt: row.created_at,
    author: readAuthor(db, row.author_name),
  }));
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

export function createBackendServer(dbPath: string, port: number) {
  const db = openDatabase(dbPath);
  seedIfEmpty(db);

  return Bun.serve({
    port,
    async fetch(req) {
      if (req.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: CORS_HEADERS });
      }

      const url = new URL(req.url);
      const { pathname } = url;

      if (req.method === "GET" && pathname === "/api/articles") {
        return json({ articles: readAllArticles(db) });
      }

      const articleMatch = pathname.match(/^\/api\/articles\/([^/]+)$/);
      if (articleMatch) {
        const title = decodeURIComponent(articleMatch[1]);

        if (req.method === "GET") {
          const article = readArticle(db, title);
          return article ? json({ article }) : json({ message: "not found" }, 404);
        }

        if (req.method === "POST") {
          const body = (await req.json()) as {
            title: string;
            description: string;
            body: string;
            tagList: string[];
            createdAt: string;
            asName: string;
          };
          db.query(
            "INSERT INTO articles (title, summary, body, tags_json, author_name, created_at) VALUES ($title, $summary, $body, $tags_json, $author_name, $created_at)",
          ).run({
            $title: body.title,
            $summary: body.description,
            $body: body.body,
            $tags_json: JSON.stringify(body.tagList),
            $author_name: body.asName,
            $created_at: body.createdAt,
          });
          return json({ article: readArticle(db, body.title) }, 201);
        }

        if (req.method === "PUT") {
          const body = (await req.json()) as {
            title: string;
            description: string;
            body: string;
            tagList: string[];
          };
          db.query(
            "UPDATE articles SET title = $newTitle, summary = $summary, body = $body, tags_json = $tags_json WHERE title = $title",
          ).run({
            $newTitle: body.title,
            $summary: body.description,
            $body: body.body,
            $tags_json: JSON.stringify(body.tagList),
            $title: title,
          });
          return json({ article: readArticle(db, body.title) });
        }

        if (req.method === "DELETE") {
          db.query("DELETE FROM articles WHERE title = $title").run({ $title: title });
          return json({});
        }
      }

      const commentsMatch = pathname.match(/^\/api\/articles\/([^/]+)\/comments$/);
      if (commentsMatch) {
        const articleTitle = decodeURIComponent(commentsMatch[1]);

        if (req.method === "GET") {
          return json({ comments: readComments(db, articleTitle) });
        }

        if (req.method === "POST") {
          const body = (await req.json()) as { body: string; createdAt: string; asName: string };
          db.query(
            "INSERT INTO comments (article_title, author_name, body, created_at) VALUES ($article_title, $author_name, $body, $created_at)",
          ).run({
            $article_title: articleTitle,
            $author_name: body.asName,
            $body: body.body,
            $created_at: body.createdAt,
          });
          return json({ comments: readComments(db, articleTitle) }, 201);
        }
      }

      const favoriteMatch = pathname.match(/^\/api\/articles\/([^/]+)\/favorite$/);
      if (favoriteMatch && (req.method === "POST" || req.method === "DELETE")) {
        const articleTitle = decodeURIComponent(favoriteMatch[1]);
        const body = (await req.json()) as { asName: string };
        if (req.method === "POST") {
          db.query(
            "INSERT OR IGNORE INTO article_favorites (article_title, name) VALUES ($article_title, $name)",
          ).run({ $article_title: articleTitle, $name: body.asName });
        } else {
          db.query(
            "DELETE FROM article_favorites WHERE article_title = $article_title AND name = $name",
          ).run({ $article_title: articleTitle, $name: body.asName });
        }
        return json({ article: readArticle(db, articleTitle) });
      }

      const followMatch = pathname.match(/^\/api\/profiles\/([^/]+)\/follow$/);
      if (followMatch && (req.method === "POST" || req.method === "DELETE")) {
        const followedName = decodeURIComponent(followMatch[1]);
        const body = (await req.json()) as { asName: string };
        if (req.method === "POST") {
          db.query(
            "INSERT OR IGNORE INTO follows (follower_name, followed_name) VALUES ($follower_name, $followed_name)",
          ).run({ $follower_name: body.asName, $followed_name: followedName });
        } else {
          db.query(
            "DELETE FROM follows WHERE follower_name = $follower_name AND followed_name = $followed_name",
          ).run({ $follower_name: body.asName, $followed_name: followedName });
        }
        return json({});
      }

      const followingMatch = pathname.match(/^\/api\/users\/([^/]+)\/following$/);
      if (followingMatch && req.method === "GET") {
        const followerName = decodeURIComponent(followingMatch[1]);
        const rows = db
          .query("SELECT followed_name FROM follows WHERE follower_name = $name")
          .all({ $name: followerName }) as { followed_name: string }[];
        return json({ following: rows.map((r) => r.followed_name) });
      }

      if (pathname === "/api/user" && req.method === "PUT") {
        const body = (await req.json()) as { asName: string; bio: string; image: string };
        db.query(
          "INSERT INTO users (name, bio, avatar_url) VALUES ($name, $bio, $avatar_url) ON CONFLICT(name) DO UPDATE SET bio = $bio, avatar_url = $avatar_url",
        ).run({ $name: body.asName, $bio: body.bio, $avatar_url: body.image });
        return json({ user: readAuthor(db, body.asName) });
      }

      return json({ message: "not found" }, 404);
    },
  });
}
