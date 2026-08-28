# Frontend routes

Source: `realworld-docs.netlify.app/specifications/frontend/routing/`.
Paths below use the real spec's hash-routing convention (`/#/...`), same
scheme this app uses (`src/accidents/navigation/navigation-hash.ts`).

| Route | Page |
|---|---|
| `/#/` | Home — feed, tag filter, pagination |
| `/#/login` | Sign in |
| `/#/register` | Sign up |
| `/#/settings` | Settings |
| `/#/editor` | New article |
| `/#/editor/:slug` | Edit an existing article |
| `/#/article/:slug` | Read one article, its comments |
| `/#/profile/:username` | A profile's own articles |
| `/#/profile/:username/favorites` | The same profile's favorited articles |

## How this app's routing compares

- Same shape for Home/Login/Editor/Article: `#/`, `#/login`, `#/editor`,
  `#/editor/<title>`, `#/article/<title>` (title standing in for slug — see
  `docs/spec/README.md` on the no-slugs divergence).
- No `/#/register` — Sign In and Sign Up are one form/one route here.
- No `/#/settings` — not built yet (`docs/realworld-essence-checklist.md`).
- Profile's own-articles and favorited-articles are **two routes** in the
  real spec (a separate `/favorites` path swapping which list the same page
  shows) but **one page, both sections at once** in this app
  (`#/profile/:authorName` shows an "Articles" section and a "Favorited
  Articles" section together, not toggled). Functionally equivalent content,
  different navigation shape.
