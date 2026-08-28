# Real backend API endpoints

Source: `realworld-docs.netlify.app/specifications/backend/endpoints/`
(2026-08-28). Reference only — this app has no real backend, so nothing
here is a target this repo implements. It's here to make clear which
essence-level facts a real Conduit backend treats as needing a real
server round-trip vs. this app's local, essence-driven approach.

| Method & path | Auth |
|---|---|
| `POST /api/users` | none (register) |
| `POST /api/users/login` | none |
| `GET /api/user` | required (current user) |
| `PUT /api/user` | required (update settings) |
| `GET /api/profiles/:username` | optional |
| `POST /api/profiles/:username/follow` | required |
| `DELETE /api/profiles/:username/follow` | required |
| `GET /api/articles` | optional |
| `GET /api/articles/feed` | required |
| `GET /api/articles/:slug` | none |
| `POST /api/articles` | required |
| `PUT /api/articles/:slug` | required |
| `DELETE /api/articles/:slug` | required |
| `POST /api/articles/:slug/favorite` | required |
| `DELETE /api/articles/:slug/favorite` | required |
| `GET /api/articles/:slug/comments` | optional |
| `POST /api/articles/:slug/comments` | required |
| `DELETE /api/articles/:slug/comments/:id` | required |
| `GET /api/tags` | none |

Every "required" row corresponds to something this app instead gates on
`state.name`/`signedInName` being present, with no network call — the same
essence, delivered without a server. `/favorite` and `/follow` being
separate POST/DELETE endpoints (rather than one toggle) is the clearest
sign the real API treats them as a relation you add yourself to and remove
yourself from, same shape as this app's `toggleFavorite`/`toggleFollow`.
