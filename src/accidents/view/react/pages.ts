// Pages, same status as components.ts: pure prop-to-markup composition,
// not unit-tested (see vitest.config.mts's coverage exclude).
//
// A page is itself accident, not essence
// (docs/realworld-essence-checklist.md's "Pages" section): which screens
// exist as separate, reachable places, versus everything on one
// always-visible screen, doesn't change what the app *is* -- essence-view
// (src/accidents/view/essence) never grew this concept, because a bare
// grounding tool showing every state at once doesn't need visual
// separation between them. This app's pages exist purely so a real user
// isn't looking at a sign-in form, an always-blank editor, and someone
// else's open article all in one scroll -- nicer delivery, not a
// different app.

import React from "react";
import { THeaderProps } from "./header-view-model";
import { TSignInViewModel } from "./sign-in-view-model";
import { TEditorProps, TFeedViewModel, TTagProps } from "./view-model";
import { TArticleDetailViewModel } from "./article-view-model";
import { Header, SignIn, Editor, PopularTags, Feed, ArticleDetail } from "./components";

export function LoginPage(props: {
  headerViewModel: THeaderProps;
  signInViewModel: TSignInViewModel;
}) {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Header, props.headerViewModel),
    React.createElement(
      "div",
      { className: "page" },
      React.createElement(SignIn, props.signInViewModel),
    ),
  );
}

export function HomePage(props: {
  headerViewModel: THeaderProps;
  popularTagsProps: TTagProps[];
  feedViewModel: TFeedViewModel;
}) {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Header, props.headerViewModel),
    React.createElement(
      "div",
      { className: "page" },
      PopularTags(props.popularTagsProps),
      React.createElement(Feed, props.feedViewModel),
    ),
  );
}

export function EditorPage(props: {
  headerViewModel: THeaderProps;
  // Writing requires a signed-in name -- a guest doesn't get an Editor at
  // all, not a disabled one (docs/realworld-essence-checklist.md: "article
  // is only available when name is present"). undefined here means
  // exactly what it means everywhere else in this session: a guest.
  editorProps: TEditorProps | undefined;
  // React's own remount key -- kept separate from editorProps rather than
  // folded into it, since "key" isn't part of what Editor's contract
  // exposes (TEditorProps), only how the composition root tells React
  // this is a different form instance (new vs. editing which article).
  editorKey: string;
}) {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Header, props.headerViewModel),
    React.createElement(
      "div",
      { className: "page" },
      props.editorProps
        ? React.createElement(Editor, { key: props.editorKey, ...props.editorProps })
        : React.createElement("p", null, "Sign in to write an article."),
    ),
  );
}

export function ArticlePage(props: {
  headerViewModel: THeaderProps;
  // Same rule as editorProps above: reading an article's full detail also
  // requires a signed-in name. Needed here (unlike editorProps, where
  // absence alone was enough) because there are two different reasons
  // articleViewModel can be missing -- a guest, or simply no article by
  // that title -- and they read as different messages on screen.
  signedInName: string | undefined;
  articleViewModel: TArticleDetailViewModel | undefined;
}) {
  const emptyMessage = props.signedInName
    ? "No such article."
    : "Sign in to read this article.";

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Header, props.headerViewModel),
    React.createElement(
      "div",
      { className: "page" },
      props.articleViewModel
        ? React.createElement(ArticleDetail, props.articleViewModel)
        : React.createElement("p", null, emptyMessage),
    ),
  );
}
