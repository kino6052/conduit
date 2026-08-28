// Pure presentational view components -- docs/code-example.md's shape:
// React.createElement, no JSX (no build-step transform to depend on),
// no logic, just props -> markup. Not unit-tested, same as
// code-example.md's Square/Board/Game -- verified by looking, not
// asserting (see vitest.config.mts's coverage exclude for why).
//
// className values reference src/accidents/view/styles.css. That file is the only
// place actual colors/fonts/spacing are decided -- these components stay
// ignorant of what the classes render as, same "boundary" discipline as
// the onClick/onSubmit split (README, "The essential contract").

import React from "react";
import {
  TArticlePreviewProps,
  TFeedViewModel,
  TEditorProps,
  TTagProps,
} from "./view-model";
import { TArticleDetailViewModel, TCommentProps } from "./article-view-model";
import { THeaderProps } from "./header-view-model";
import { TSignInViewModel } from "./sign-in-view-model";
import { TProfileViewModel } from "./profile-view-model";
import { TSettingsViewModel } from "./settings-view-model";

// Layout matches legacy/details/view/components/Navbar + Tab: a
// full-width bar (className "header") with an inner row capped at the
// same width as the rest of the page, a logo, and a row of tabs. Which
// tabs show up (Login vs. a name + Sign Out) mirrors legacy's own
// SimpleNavigationService.getNavigationTabs gating on whether anyone's
// signed in -- guest or not is the only thing that decides it here too.
export function Header(props: THeaderProps) {
  return React.createElement(
    "header",
    { className: "header" },
    React.createElement(
      "div",
      { className: "header-content" },
      React.createElement(
        "button",
        { className: "logo", onClick: props.onHomeClick },
        "conduit",
      ),
      React.createElement(
        "nav",
        { className: "nav" },
        React.createElement(
          "button",
          {
            className: props.isHome ? "nav-tab active" : "nav-tab",
            onClick: props.onHomeClick,
          },
          "Home",
        ),
        // New Article is only offered once signed in -- writing requires
        // a name, same rule as HomePage's own Editor gating
        // (src/accidents/view/react/pages.ts) and legacy's
        // SimpleNavigationService (New article only shows up logged in).
        props.signedInName
          ? React.createElement(
              "button",
              {
                className: props.isEditor ? "nav-tab active" : "nav-tab",
                onClick: props.onNewArticleClick,
              },
              "New Article",
            )
          : null,
        props.signedInName
          ? React.createElement(
              "button",
              {
                className: props.isSettings ? "nav-tab active" : "nav-tab",
                onClick: props.onSettingsClick,
              },
              "Settings",
            )
          : null,
        props.signedInName
          ? React.createElement(
              "span",
              { className: "nav-tab" },
              AuthorLink(props.signedInName, props.avatarUrl, props.onProfileClick),
            )
          : null,
        // Two separate tabs for a guest, matching the real spec's own
        // header (docs/spec/pages.md's Header entry) -- Sign in and Sign
        // up used to be one "Login" tab leading to one collapsed form;
        // now each has its own page (LoginPage/RegisterPage, pages.ts).
        !props.signedInName
          ? React.createElement(
              "button",
              {
                className: props.isLogin ? "nav-tab active" : "nav-tab",
                onClick: props.onLoginClick,
              },
              "Sign in",
            )
          : null,
        !props.signedInName
          ? React.createElement(
              "button",
              {
                className: props.isRegister ? "nav-tab active" : "nav-tab",
                onClick: props.onRegisterClick,
              },
              "Sign up",
            )
          : null,
      ),
    ),
  );
}

// The author name shown next to an article/comment, clickable through to
// that author's profile -- same button-styled-as-text approach as
// card-title above (a real click target, not a decorative label). The
// avatar (when set) rides along inside the same click target, same
// "one thing, one control" shape as everywhere else in this app.
function AuthorLink(authorName: string, avatarUrl: string, onClick: () => void) {
  return React.createElement(
    "button",
    { className: "author link-button", onClick },
    avatarUrl
      ? React.createElement("img", {
          className: "avatar-small",
          src: avatarUrl,
          alt: "",
        })
      : null,
    authorName,
  );
}

// A minimal inline heart -- filled once favorited, outline otherwise --
// next to the same favoriteLabel text that was already there. No icon
// library: one <svg>, one <path>, styled entirely by currentColor so it
// picks up whatever .btn-accent's own color already is.
function HeartIcon(filled: boolean) {
  return React.createElement(
    "svg",
    {
      viewBox: "0 0 24 24",
      width: 14,
      height: 14,
      "aria-hidden": true,
      fill: filled ? "currentColor" : "none",
      stroke: "currentColor",
      strokeWidth: 2,
    },
    React.createElement("path", {
      d: "M12 21s-6.7-4.35-9.3-8.1C.8 9.8 1.6 6.2 4.6 5 6.7 4.15 9 5 12 8c3-3 5.3-3.85 7.4-3 3 1.2 3.8 4.8 1.9 7.9C18.7 16.65 12 21 12 21z",
    }),
  );
}

function FavoriteButton(props: {
  isFavorite: boolean;
  favoriteLabel: string;
  onFavoriteClick: () => void;
}) {
  return React.createElement(
    "button",
    { className: "btn btn-accent", onClick: props.onFavoriteClick },
    HeartIcon(props.isFavorite),
    props.favoriteLabel,
  );
}

function TagList(tags: string[], onTagClick?: (tag: string) => void) {
  return React.createElement(
    "ul",
    { className: "tag-list" },
    ...tags.map((tag) =>
      React.createElement(
        "li",
        { key: tag },
        React.createElement(
          "button",
          { className: "tag", onClick: onTagClick ? () => onTagClick(tag) : undefined },
          tag,
        ),
      ),
    ),
  );
}

export function ArticlePreview(props: TArticlePreviewProps) {
  return React.createElement(
    "li",
    { className: "card" },
    React.createElement(
      "h2",
      null,
      React.createElement(
        "button",
        { className: "card-title", onClick: props.onOpenClick },
        props.title,
      ),
    ),
    React.createElement("p", { className: "summary" }, props.summary),
    React.createElement(
      "div",
      { className: "meta" },
      AuthorLink(props.authorName, props.avatarUrl, props.onAuthorClick),
      React.createElement("button", { className: "btn", onClick: props.onFollowClick }, props.followLabel),
      React.createElement("span", { className: "date" }, props.createdAt),
    ),
    TagList(props.tags, props.onTagClick),
    React.createElement(
      "div",
      { className: "actions" },
      FavoriteButton(props),
    ),
  );
}

function Comment(props: TCommentProps) {
  return React.createElement(
    "li",
    { className: "comment" },
    React.createElement("p", { className: "comment-body" }, props.body),
    React.createElement(
      "div",
      { className: "meta" },
      AuthorLink(props.authorName, props.avatarUrl, props.onAuthorClick),
      props.onDeleteClick
        ? React.createElement(
            "button",
            { className: "btn btn-danger", onClick: props.onDeleteClick },
            "Delete Comment",
          )
        : null,
    ),
  );
}

function CommentForm(onClick: (body: string) => void) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onClick(String(data.get("body") ?? ""));
    event.currentTarget.reset();
  };

  return React.createElement(
    "form",
    { className: "form", onSubmit: handleSubmit },
    React.createElement("textarea", { name: "body", placeholder: "Write a comment..." }),
    React.createElement("button", { className: "btn btn-accent", type: "submit" }, "Post Comment"),
  );
}

export function ArticleDetail(props: TArticleDetailViewModel) {
  return React.createElement(
    "article",
    { className: "card" },
    React.createElement("h1", null, props.title),
    React.createElement(
      "div",
      { className: "meta" },
      AuthorLink(props.authorName, props.avatarUrl, props.onAuthorClick),
      React.createElement("button", { className: "btn", onClick: props.onFollowClick }, props.followLabel),
    ),
    // dangerouslySetInnerHTML is React's own name for "insert pre-rendered
    // HTML" -- library vocabulary contained inside this component, same
    // "guard the boundary" rule as onSubmit above. The HTML itself was
    // rendered from markdown in the tested view-model layer
    // (article-view-model.ts), not here.
    React.createElement("div", { className: "body", dangerouslySetInnerHTML: { __html: props.bodyHtml } }),
    TagList(props.tags),
    React.createElement(
      "div",
      { className: "actions" },
      FavoriteButton(props),
      props.onEditClick
        ? React.createElement(
            "button",
            { className: "btn", onClick: props.onEditClick },
            "Edit Article",
          )
        : null,
      props.onDeleteClick
        ? React.createElement(
            "button",
            { className: "btn btn-danger", onClick: props.onDeleteClick },
            "Delete Article",
          )
        : null,
    ),
    React.createElement("h2", null, "Comments"),
    CommentForm(props.onCommentClick),
    React.createElement(
      "ul",
      { className: "comment-list" },
      ...props.commentProps.map((comment, index) =>
        React.createElement(Comment, { key: index, ...comment }),
      ),
    ),
  );
}

export function Editor(props: TEditorProps) {
  // onSubmit/type="submit" below are React's/HTML's own vocabulary, used
  // entirely inside this component's implementation -- fine, per the
  // "guard the boundary" rule (README, "The essential contract"). What
  // this component exposes to its caller is TEditorProps.onClick, grounded,
  // no "submit" in sight.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const tags = String(data.get("tags") ?? "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    props.onClick({
      title: String(data.get("title") ?? ""),
      summary: String(data.get("summary") ?? ""),
      body: String(data.get("body") ?? ""),
      tags,
    });

    event.currentTarget.reset();
  };

  return React.createElement(
    "form",
    { className: "form", onSubmit: handleSubmit },
    React.createElement("input", {
      name: "title",
      placeholder: "Article Title",
      defaultValue: props.title,
      // required, not a custom error message -- a blank title isn't just
      // an incomplete article, it breaks the natural-key identification
      // scheme every essence function already relies on (an article *is*
      // its title; two blank ones would collide). The browser's own
      // built-in validation UI is the whole mechanism here, same "plain
      // fields" choice already made for every input in this app.
      required: true,
    }),
    React.createElement("input", {
      name: "summary",
      placeholder: "What's this article about?",
      defaultValue: props.summary,
    }),
    React.createElement("textarea", {
      name: "body",
      placeholder: "Write your article (in markdown)",
      defaultValue: props.body,
    }),
    React.createElement("input", {
      name: "tags",
      placeholder: "Enter tags",
      defaultValue: props.tags?.join(", "),
    }),
    React.createElement(
      "button",
      { className: "btn btn-accent", type: "submit" },
      props.title ? "Save Changes" : "Publish Article",
    ),
  );
}

// Two mutually exclusive perceivable states, not a "session" flag checked
// elsewhere: while signed out, the only thing on screen is a form asking
// for a name and password; once signed in, the form is gone and a name
// plus a Sign Out control take its place. Only rendered on LoginPage
// (src/accidents/view/react/pages.ts) -- Home's own gating on the same
// signedInName fact (no Editor for a guest) lives there, not here.
// submitLabel defaults to "Sign In" -- Login/RegisterPage (pages.ts) both
// render this exact same form (the underlying action really is
// identical: TSignIn.signIn(name, password) either reuses or creates
// that name, there's no separate account record), just with different
// button text so each page still reads honestly as what it says it is.
export function SignIn(props: TSignInViewModel, submitLabel = "Sign In") {
  if (props.signedInName) {
    return React.createElement(
      "div",
      { className: "form" },
      React.createElement("span", { className: "author" }, props.signedInName),
      React.createElement("button", { className: "btn", onClick: props.onSignOutClick }, "Sign Out"),
    );
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    props.onSignInClick(String(data.get("name") ?? ""), String(data.get("password") ?? ""));
    event.currentTarget.reset();
  };

  return React.createElement(
    "form",
    { className: "form", onSubmit: handleSubmit },
    // required on both -- same reasoning as Editor's title: a blank name
    // can't become the acting identity anything else gets attributed to,
    // and a blank password isn't a credential at all even though nothing
    // checks its substance yet. Browser-native validation, no custom
    // error-message UI invented for it.
    React.createElement("input", { name: "name", placeholder: "Name", required: true }),
    React.createElement("input", {
      name: "password",
      type: "password",
      placeholder: "Password",
      required: true,
    }),
    React.createElement("button", { className: "btn btn-accent", type: "submit" }, submitLabel),
  );
}

// Only bio and avatar -- username is Login's job (sign in as someone else),
// email/password have no essence-grounded field to edit at all (see
// settings-view-model.ts's own header comment and
// docs/realworld-essence-checklist.md's Settings entry).
export function Settings(props: TSettingsViewModel) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    props.onSaveClick(String(data.get("bio") ?? ""), String(data.get("avatarUrl") ?? ""));
  };

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "form",
      { className: "form", onSubmit: handleSubmit },
      React.createElement("input", {
        name: "avatarUrl",
        placeholder: "URL of profile picture",
        defaultValue: props.avatarUrl,
      }),
      React.createElement("textarea", {
        name: "bio",
        placeholder: "Short bio about you",
        defaultValue: props.bio,
      }),
      React.createElement("button", { className: "btn btn-accent", type: "submit" }, "Update Settings"),
    ),
    // Sign out lives here now, not the header -- the header's signed-in
    // name links to your own profile instead
    // (docs/realworld-essence-checklist.md's header-navigation entry).
    React.createElement(
      "button",
      { className: "btn", onClick: props.onSignOutClick },
      "Sign Out",
    ),
  );
}

export function PopularTags(tagProps: TTagProps[]) {
  return React.createElement(
    "ul",
    { className: "tag-list" },
    ...tagProps.map((props) =>
      React.createElement(
        "li",
        { key: props.label },
        React.createElement(
          "button",
          { className: props.isActive ? "tag active" : "tag", onClick: props.onClick },
          props.label,
        ),
      ),
    ),
  );
}

function FeedLensToggle(props: TFeedViewModel) {
  const lens = (filterName: TFeedViewModel["filterName"], label: string) =>
    React.createElement(
      "button",
      {
        className: props.filterName === filterName ? "nav-tab active" : "nav-tab",
        onClick: () => props.onSetFilterClick(filterName),
      },
      label,
    );

  return React.createElement(
    "nav",
    { className: "nav" },
    lens("global", "Global Feed"),
    lens("personal", "Your Feed"),
  );
}

// Visible only while a tag filter is active -- not just "click the same
// tag again," which only works if you can still see and remember which
// tag that was (view-model.ts's own onClearTag comment).
function ActiveTagFilter(activeTag: string, onClearClick: () => void) {
  return React.createElement(
    "div",
    { className: "active-tag-filter" },
    React.createElement("span", null, `Filtering by "${activeTag}"`),
    React.createElement("button", { className: "btn", onClick: onClearClick }, "Clear"),
  );
}

export function Feed(props: TFeedViewModel) {
  return React.createElement(
    React.Fragment,
    null,
    FeedLensToggle(props),
    props.activeTag ? ActiveTagFilter(props.activeTag, props.onClearTagClick) : null,
    React.createElement(
      "ul",
      { className: "feed" },
      ...props.articlePreviewProps.map((previewProps) =>
        React.createElement(ArticlePreview, { key: previewProps.title, ...previewProps }),
      ),
    ),
  );
}

// Attribution, not navigation -- no links to pages of this app, just where
// the spec this app follows comes from. Same on every page (pages.ts adds
// it as the last sibling after Header/.page on each of them), same
// "shared chrome" role Header plays at the top.
export function Footer() {
  return React.createElement(
    "footer",
    { className: "footer" },
    "conduit — an empirically grounded app, built against the ",
    React.createElement(
      "a",
      { href: "https://codebase.show/projects/realworld", target: "_blank", rel: "noreferrer" },
      "RealWorld",
    ),
    " spec",
  );
}

// An author, and the articles they wrote -- reuses ArticlePreview for the
// list, same component the feed uses, since an article preview looks and
// behaves identically wherever it's shown.
export function Profile(props: TProfileViewModel) {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "div",
      { className: "profile-header" },
      // No <img> at all when there's nothing to show -- same "absent, not
      // a broken-image placeholder" rule as everywhere else an optional
      // field is missing (docs/realworld-essence-checklist.md's bio/avatar
      // correction: these are real fields, but a name that never set one
      // through Settings simply has none yet).
      props.avatarUrl
        ? React.createElement("img", {
            className: "avatar",
            src: props.avatarUrl,
            alt: props.authorName,
          })
        : null,
      React.createElement("span", { className: "author" }, props.authorName),
      props.bio ? React.createElement("p", { className: "bio" }, props.bio) : null,
      // Following yourself isn't a meaningful action -- your own profile
      // offers a way to edit it instead, same swap the real spec makes
      // (docs/spec/pages.md's Profile entry).
      props.isOwnProfile
        ? React.createElement(
            "button",
            { className: "btn", onClick: props.onEditSettingsClick },
            "Edit Profile Settings",
          )
        : React.createElement(
            "button",
            { className: "btn", onClick: props.onFollowClick },
            props.followLabel,
          ),
    ),
    React.createElement("h2", null, "Articles"),
    React.createElement(
      "ul",
      { className: "feed" },
      ...props.articlePreviewProps.map((previewProps) =>
        React.createElement(ArticlePreview, { key: previewProps.title, ...previewProps }),
      ),
    ),
    React.createElement("h2", null, "Favorited Articles"),
    React.createElement(
      "ul",
      { className: "feed" },
      ...props.favoritedArticlePreviewProps.map((previewProps) =>
        React.createElement(ArticlePreview, { key: previewProps.title, ...previewProps }),
      ),
    ),
  );
}
