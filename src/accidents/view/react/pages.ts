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
//
// Prop types are exported so src/accidents/view/react/compose-app.ts can
// depend on the shape without depending on React -- the same reason
// components.ts's prop types live next to view-model.ts, not here.

import React from "react";
import { THeaderProps } from "./header-view-model";
import { TSignInViewModel } from "./sign-in-view-model";
import { TEditorProps, TFeedViewModel, TTagProps } from "./view-model";
import { TArticleDetailViewModel } from "./article-view-model";
import { TProfileViewModel } from "./profile-view-model";
import { TSettingsViewModel } from "./settings-view-model";
import {
  Header,
  Footer,
  SignIn,
  Editor,
  PopularTags,
  Feed,
  ArticleDetail,
  Profile,
  Settings,
} from "./components";

export type TLoginPageProps = {
  headerViewModel: THeaderProps;
  signInViewModel: TSignInViewModel;
};

export function LoginPage(props: TLoginPageProps) {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Header, props.headerViewModel),
    React.createElement(
      "div",
      { className: "page" },
      React.createElement(SignIn, props.signInViewModel),
    ),
    React.createElement(Footer),
  );
}

export type THomePageProps = {
  headerViewModel: THeaderProps;
  popularTagsProps: TTagProps[];
  feedViewModel: TFeedViewModel;
};

export function HomePage(props: THomePageProps) {
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
    React.createElement(Footer),
  );
}

export type TEditorPageProps = {
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
};

export function EditorPage(props: TEditorPageProps) {
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
    React.createElement(Footer),
  );
}

export type TArticlePageProps = {
  headerViewModel: THeaderProps;
  // Same rule as editorProps above: reading an article's full detail also
  // requires a signed-in name. Needed here (unlike editorProps, where
  // absence alone was enough) because there are two different reasons
  // articleViewModel can be missing -- a guest, or simply no article by
  // that title -- and they read as different messages on screen.
  signedInName: string | undefined;
  articleViewModel: TArticleDetailViewModel | undefined;
};

export function ArticlePage(props: TArticlePageProps) {
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
    React.createElement(Footer),
  );
}

export type TProfilePageProps = {
  headerViewModel: THeaderProps;
  // Same rule as ArticlePageProps.articleViewModel: viewing a profile is
  // a detail page, gated the same way Article is (a deliberate,
  // stricter-than-RealWorld choice for this exercise -- see the
  // checklist's "What a guest can and can't do"). Unlike Article, there's
  // no second reason this can be undefined: an author isn't an entity
  // that can fail to exist the way an article can (any name is a valid
  // thing to view, even with zero articles) -- undefined here means
  // exactly one thing, a guest.
  profileViewModel: TProfileViewModel | undefined;
};

export function ProfilePage(props: TProfilePageProps) {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Header, props.headerViewModel),
    React.createElement(
      "div",
      { className: "page" },
      props.profileViewModel
        ? Profile(props.profileViewModel)
        : React.createElement("p", null, "Sign in to view this profile."),
    ),
    React.createElement(Footer),
  );
}

export type TSettingsPageProps = {
  headerViewModel: THeaderProps;
  // Same rule as EditorPageProps.editorProps: editing your own bio/avatar
  // requires a signed-in name -- there's no "your" bio to edit as a guest.
  settingsViewModel: TSettingsViewModel | undefined;
};

export function SettingsPage(props: TSettingsPageProps) {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Header, props.headerViewModel),
    React.createElement(
      "div",
      { className: "page" },
      props.settingsViewModel
        ? React.createElement(Settings, props.settingsViewModel)
        : React.createElement("p", null, "Sign in to edit your settings."),
    ),
    React.createElement(Footer),
  );
}
