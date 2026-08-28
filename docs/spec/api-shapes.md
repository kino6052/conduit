# Real API JSON shapes

Source: `realworld-docs.netlify.app/specifications/backend/api-response-format/`
(2026-08-28). These are the JSON object shapes a real RealWorld backend
returns. This app has no backend or wire format of its own — these are here
so essence-level modeling choices (like `TArticle.favoritedBy`) can be
checked against what a real implementation actually carries underneath its
own API, even where the wire shape itself differs.

## User (returned on login/register, and from `GET /api/user`)
```
user: { email, token, username, bio, image }
```

## Profile (returned from `GET /api/profiles/:username`, and embedded as
`author` on every Article/Comment)
```
profile: { username, bio, image, following }
```

## Article
```
article: {
  slug, title, description, body, tagList,
  createdAt, updatedAt,
  favorited, favoritesCount,
  author: { username, bio, image, following }
}
```
Listing endpoints return articles without `body` (a 2024 performance
change), plus an `articlesCount` alongside the array.

## Comment
```
comment: {
  id, createdAt, updatedAt, body,
  author: { username, bio, image, following }
}
```

## Tags
```
tags: string[]
```

## Notes for this app's essence

- `favorited`/`favoritesCount` are **per-request, per-viewer** facts in the
  real API (`favorited` answers "does *whoever's asking* favorite this");
  the real backend still needs its own internal table of who-favorited-what
  to compute them, it just never returns that whole table over the wire.
  This app's `TArticle.favoritedBy: string[]` (see
  `docs/realworld-essence-checklist.md`) models that same internal table
  directly, since there's no request boundary here to compute per-viewer
  fields fresh behind — a reasonable modeling choice, not a wire-format
  match.
- `author`/`profile` always carry `bio` and `image` — confirms the
  correction in `docs/ontological-entities-in-this-repo.md`: these are real,
  spec-required attributes of an author, not invented ones.
- `following` is per-viewer the same way `favorited` is — this app's
  `followedAuthors: string[]` on `TState` already models it the same
  direct-relation way.
- No `slug` counterpart exists in this app's essence (see
  `docs/spec/README.md`); titles/full-field-equality serve as the natural
  key instead.
