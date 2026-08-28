// The backend accident's own storage -- bun:sqlite, a real database file,
// not an in-memory stand-in (docs/realworld-essence-checklist.md's "Part
// 3 -- The backend accident"). Untested, same category as
// navigation-hash.ts/persistence-local-storage.ts: real IO, verified
// live, not under bun:test.
//
// Schema is normalized and natural-key based, same no-synthetic-id
// discipline src/essence already follows -- articles keyed by title,
// follows/favorites/users keyed by name, not a made-up id. comments.id is
// the one exception, and it's pure SQLite bookkeeping: essence still
// identifies a comment by its full fields (deleteComment's own contract,
// unchanged), so this id never crosses the API boundary except internally
// to find the row to delete.

import { Database } from "bun:sqlite";

export function openDatabase(path: string): Database {
  const db = new Database(path);
  db.exec("PRAGMA journal_mode = WAL;");
  createSchema(db);
  return db;
}

function createSchema(db: Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS articles (
      title TEXT PRIMARY KEY,
      summary TEXT NOT NULL,
      body TEXT NOT NULL,
      tags_json TEXT NOT NULL,
      author_name TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS article_favorites (
      article_title TEXT NOT NULL REFERENCES articles(title) ON DELETE CASCADE,
      name TEXT NOT NULL,
      PRIMARY KEY (article_title, name)
    );

    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      article_title TEXT NOT NULL REFERENCES articles(title) ON DELETE CASCADE,
      author_name TEXT NOT NULL,
      body TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS follows (
      follower_name TEXT NOT NULL,
      followed_name TEXT NOT NULL,
      PRIMARY KEY (follower_name, followed_name)
    );

    CREATE TABLE IF NOT EXISTS users (
      name TEXT PRIMARY KEY,
      bio TEXT NOT NULL DEFAULT '',
      avatar_url TEXT NOT NULL DEFAULT ''
    );
  `);
}

// Same alice/bob-centered cast as articles-io.ts's own seed data, kept
// separate rather than imported -- that file's seed is TArticle[] for the
// in-memory/essential apps; this one seeds every table the backend owns
// (comments, follows, users too), so the two are shaped differently even
// though the articles overlap in spirit.
export function seedIfEmpty(db: Database): void {
  const { count } = db.query("SELECT COUNT(*) as count FROM articles").get() as {
    count: number;
  };
  if (count > 0) return;

  const insertArticle = db.query(
    "INSERT INTO articles (title, summary, body, tags_json, author_name, created_at) VALUES ($title, $summary, $body, $tags_json, $author_name, $created_at)",
  );
  const insertFavorite = db.query(
    "INSERT INTO article_favorites (article_title, name) VALUES ($article_title, $name)",
  );
  const insertComment = db.query(
    "INSERT INTO comments (article_title, author_name, body, created_at) VALUES ($article_title, $author_name, $body, $created_at)",
  );
  const insertFollow = db.query(
    "INSERT INTO follows (follower_name, followed_name) VALUES ($follower_name, $followed_name)",
  );
  const insertUser = db.query(
    "INSERT INTO users (name, bio, avatar_url) VALUES ($name, $bio, $avatar_url)",
  );

  db.transaction(() => {
    insertArticle.run({
      $title: "Grounding software in perception",
      $summary: "Why essence comes before accident.",
      $body: "If it isn't perceivable, it isn't essence. Everything else is machinery -- swappable, replaceable, and beside the point.",
      $tags_json: JSON.stringify(["philosophy", "essence"]),
      $author_name: "alice",
      $created_at: "2026-01-05",
    });
    insertArticle.run({
      $title: "Why this app doesn't use synthetic ids",
      $summary: "Natural keys, all the way down.",
      $body: "An article is its title. A comment is its own content. An id would just be a stand-in for something a person can already point at.",
      $tags_json: JSON.stringify(["philosophy", "typescript"]),
      $author_name: "alice",
      $created_at: "2026-01-12",
    });
    insertArticle.run({
      $title: "A love letter to red, green, refactor",
      $summary: "The same three steps, every single time.",
      $body: "Write the failing test first. Make it pass with the least code that will do it. Then, and only then, clean up.",
      $tags_json: JSON.stringify(["testing", "typescript"]),
      $author_name: "bob",
      $created_at: "2026-01-08",
    });

    for (const name of ["bob", "carol", "dave"]) {
      insertFavorite.run({ $article_title: "Grounding software in perception", $name: name });
    }
    for (const name of ["bob", "carol", "dave", "erin"]) {
      insertFavorite.run({ $article_title: "Why this app doesn't use synthetic ids", $name: name });
    }
    for (const name of ["alice", "carol"]) {
      insertFavorite.run({ $article_title: "A love letter to red, green, refactor", $name: name });
    }

    insertComment.run({
      $article_title: "A love letter to red, green, refactor",
      $author_name: "alice",
      $body: "This is exactly why I stopped skipping the red step.",
      $created_at: "2026-01-09",
    });

    insertFollow.run({ $follower_name: "bob", $followed_name: "alice" });

    insertUser.run({ $name: "alice", $bio: "Writes about essence and accident.", $avatar_url: "" });
    insertUser.run({ $name: "bob", $bio: "Tests first, asks questions later.", $avatar_url: "" });
  })();
}
