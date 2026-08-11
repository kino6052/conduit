// Pure presentational view components -- docs/code-example.md's shape:
// React.createElement, no JSX (no build-step transform to depend on),
// no logic, just props -> markup. Not unit-tested, same as
// code-example.md's Square/Board/Game -- verified by looking, not
// asserting (see vitest.config.mts's coverage exclude for why).

import React from "react";
import { TArticlePreviewProps, TFeedViewModel } from "./view-model";

export function ArticlePreview(props: TArticlePreviewProps) {
  return React.createElement(
    "li",
    null,
    React.createElement("h2", null, props.title),
    React.createElement("p", null, props.summary),
    React.createElement("span", null, props.authorName),
    React.createElement("button", { onClick: props.onFollowClick }, props.followLabel),
    React.createElement("span", null, props.createdAt),
    React.createElement(
      "ul",
      null,
      ...props.tags.map((tag) => React.createElement("li", { key: tag }, tag)),
    ),
    React.createElement("button", { onClick: props.onFavoriteClick }, props.favoriteLabel),
  );
}

export function Feed(props: TFeedViewModel) {
  return React.createElement(
    "ul",
    null,
    ...props.articlePreviewProps.map((previewProps) =>
      React.createElement(ArticlePreview, { key: previewProps.title, ...previewProps }),
    ),
  );
}
