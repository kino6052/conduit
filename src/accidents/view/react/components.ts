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
import { TArticlePreviewProps, TFeedViewModel, TEditorProps } from "./view-model";
import { TArticleDetailViewModel, TCommentProps } from "./article-view-model";

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
      React.createElement("span", { className: "author" }, props.authorName),
      React.createElement("button", { className: "btn", onClick: props.onFollowClick }, props.followLabel),
      React.createElement("span", { className: "date" }, props.createdAt),
    ),
    TagList(props.tags),
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
    React.createElement("span", { className: "author" }, props.authorName),
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
      React.createElement("span", { className: "author" }, props.authorName),
      React.createElement("button", { className: "btn", onClick: props.onFollowClick }, props.followLabel),
    ),
    React.createElement("p", { className: "body" }, props.body),
    TagList(props.tags),
    React.createElement(
      "div",
      { className: "actions" },
      React.createElement(
        "button",
        { className: "btn btn-accent", onClick: props.onFavoriteClick },
        props.favoriteLabel,
      ),
      props.isOwnArticle
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
    React.createElement("input", { name: "title", placeholder: "Article Title" }),
    React.createElement("input", { name: "summary", placeholder: "What's this article about?" }),
    React.createElement("textarea", {
      name: "body",
      placeholder: "Write your article (in markdown)",
    }),
    React.createElement("input", { name: "tags", placeholder: "Enter tags" }),
    React.createElement("button", { className: "btn btn-accent", type: "submit" }, "Publish Article"),
  );
}

export function Feed(props: TFeedViewModel) {
  return React.createElement(
    "ul",
    { className: "feed" },
    ...props.articlePreviewProps.map((previewProps) =>
      React.createElement(ArticlePreview, { key: previewProps.title, ...previewProps }),
    ),
  );
}
