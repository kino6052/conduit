# Page-by-page UI element inventory

Source: `realworld-docs.netlify.app/specifications/frontend/templates/`
(2026-08-28). This lists what's *on screen* for each real RealWorld page —
field by field, button by button — as a checklist to build/verify against.
Labels and field names are quoted exactly since they're what a matching
implementation has to reproduce; the grouping and commentary are mine.

## Header (signed out)
- "conduit" brand link, "Home", "Sign in", "Sign up"

## Header (signed in)
- "conduit" brand link, "Home", "New Article" (with an icon), "Settings"
  (with an icon), and the user's own name **with their avatar image**,
  linking to their own profile

## Footer
- "conduit" brand link
- an attribution line crediting the RealWorld project, MIT-licensed

## Home (`/#/`)
- Banner: "conduit" heading + a one-line tagline underneath
- Feed toggle: "Your Feed" (signed-in only) / "Global Feed" tabs
- Article preview cards, each with: author avatar (linked), author name
  (linked), publish date, a favorite/heart button showing a count, the
  article's title (linked), its summary, "Read more...", and its tag list
- Sidebar: "Popular Tags" heading + a list of tag pills
- Pagination, numbered

## Sign in (`/#/login`)
- "Sign in" heading, a "Need an account?" link to Sign up
- An error-message list
- Email field, password field, "Sign in" button

## Sign up (`/#/register`)
- "Sign up" heading, a "Have an account?" link to Sign in
- An error-message list
- Username field, email field, password field, "Sign up" button

## Settings (`/#/settings`)
- "Your Settings" heading
- An error-message list
- Avatar-URL field, name field, a bio textarea, email field, a
  new-password field, "Update Settings" button, and a logout link/button

## Editor (`/#/editor`, `/#/editor/:slug`)
- An error-message list
- Title field, a one-line "what's this about" field, a markdown body
  textarea, a tag-entry field that turns each entry into its own removable
  pill (not a single comma-separated field), "Publish Article" button

## Article (`/#/article/:slug`)
- Banner: article title, author avatar (linked), author name (linked),
  publish date, a follow button (with a counter), a favorite button (with a
  counter); an edit button and a delete button, both shown only to the
  article's own author
- Body: the rendered markdown, then the tag list
- The same author-meta + follow/favorite/edit/delete row repeats below the
  body
- Comments: a "post a comment" textarea + button, then a list of comment
  cards, each showing the commenter's avatar, name, date, body text, and a
  delete icon shown only to that comment's own author

## Profile (`/#/profile/:username`, `/#/profile/:username/favorites`)
- User info: avatar, username, bio text
- A follow button (viewing someone else) *or* an "Edit Profile Settings"
  button (viewing your own profile) — never both
- A toggle between "My Articles" and "Favorited Articles" (two routes, one
  page, swapping which list is shown)
- The same article-preview cards and pagination as Home

## How this app compares

See `docs/realworld-essence-checklist.md` for the authoritative, current
list of what's built vs. gap vs. deliberate divergence — this file is a
reference for *the spec*, not a status report on this codebase.
