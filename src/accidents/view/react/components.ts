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
              { className: "nav-tab", onClick: props.onSignOutClick },
              `Sign Out (${props.signedInName})`,
            )
          : React.createElement(
              "button",
              {
                className: props.isLogin ? "nav-tab active" : "nav-tab",
                onClick: props.onLoginClick,
              },
              "Login",
            ),
      ),
    ),
  );
}

// The author name shown next to an article/comment, clickable through to
// that author's profile -- same button-styled-as-text approach as
// card-title above (a real click target, not a decorative label).
function AuthorLink(authorName: string, onClick: () => void) {
  return React.createElement(
    "button",
    { className: "author link-button", onClick },
    authorName,
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
      AuthorLink(props.authorName, props.onAuthorClick),
      React.createElement("button", { className: "btn", onClick: props.onFollowClick }, props.followLabel),
      React.createElement("span", { className: "date" }, props.createdAt),
    ),
    TagList(props.tags, props.onTagClick),
    React.createElement(
      "div",
      { className: "actions" },
      React.createElement(
        "button",
        { className: "btn btn-accent", onClick: props.onFavoriteClick },
        props.favoriteLabel,
      ),
    ),
  );
}

function Comment(props: TCommentProps) {
  return React.createElement(
    "li",
    { className: "comment" },
    React.createElement("p", null, props.body),
    AuthorLink(props.authorName, props.onAuthorClick),
    props.onDeleteClick
      ? React.createElement(
          "button",
          { className: "btn btn-danger", onClick: props.onDeleteClick },
          "Delete Comment",
        )
      : null,
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
      AuthorLink(props.authorName, props.onAuthorClick),
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
      React.createElement(
        "button",
        { className: "btn btn-accent", onClick: props.onFavoriteClick },
        props.favoriteLabel,
      ),
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
    CommentForm(props.onCommentClick),
    React.createElement(
      "ul",
      { className: "feed" },
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
export function SignIn(props: TSignInViewModel) {
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
    React.createElement("input", { name: "name", placeholder: "Name" }),
    React.createElement("input", { name: "password", type: "password", placeholder: "Password" }),
    React.createElement("button", { className: "btn btn-accent", type: "submit" }, "Sign In"),
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
        React.createElement("button", { className: "tag", onClick: props.onClick }, props.label),
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

export function Feed(props: TFeedViewModel) {
  return React.createElement(
    React.Fragment,
    null,
    FeedLensToggle(props),
    React.createElement(
      "ul",
      { className: "feed" },
      ...props.articlePreviewProps.map((previewProps) =>
        React.createElement(ArticlePreview, { key: previewProps.title, ...previewProps }),
      ),
    ),
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
      { className: "meta" },
      React.createElement("span", { className: "author" }, props.authorName),
      React.createElement("button", { className: "btn", onClick: props.onFollowClick }, props.followLabel),
    ),
    React.createElement(
      "ul",
      { className: "feed" },
      ...props.articlePreviewProps.map((previewProps) =>
        React.createElement(ArticlePreview, { key: previewProps.title, ...previewProps }),
      ),
    ),
  );
}
