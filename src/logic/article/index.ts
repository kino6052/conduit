import { BehaviorSubject, filter, tap } from "rxjs";
import { TArticleProps } from "../../components/Article/types";
import { EArticleBannerConstant } from "../../components/Banner/ArticleBanner/constants";
import { EButtonConstants } from "../../components/Button/constants";
import { EInputConstants } from "../../components/Input/Input/constants";
import { EArticlePageConstants } from "../../pages/ArticlePage/constants";
import { DefaultData as DefaultArticleData } from "../../pages/ArticlePage/data";
import { EPage, TAppProps } from "../../types";
import { getEventTargetValue } from "../../utils/events";
import {
  CurrentPageSubject,
  IncomingEventSubject,
  ResultingStateSubject,
} from "../common.logic";
import { ArticleDatabase } from "../data/article";
import { getIsLoggedIn } from "../utils/user";
import { provideNavbarProps } from "../utils/utils";
import { AppState } from "../data/app";

const CommentInputSubject = new BehaviorSubject("");

export const provideArticleAppProps = (
  currentArticle: TArticleProps,
): TAppProps<EPage.Article> => {
  return {
    page: EPage.Article,
    pageProps: {
      bannerProps: {
        title: currentArticle.title,
        userInfoProps: currentArticle.userInfoProps,
        canEdit:
          AppState.currentUserId ===
          currentArticle.userInfoProps.username,
      },
      commentBoxProps: DefaultArticleData["commentBoxProps"],
      comments: currentArticle.comments, // TODO: Add comments,
      content: currentArticle.description,
      favoriteButtonProps: DefaultArticleData["favoriteButtonProps"],
      followButtonProps: DefaultArticleData["followButtonProps"],
      tags: currentArticle.tags,
      userInfoProps: currentArticle.userInfoProps,
    },
    navbarProps: provideNavbarProps(),
  };
};

CurrentPageSubject.pipe(
  filter((page) => page === EPage.Article),
  tap(() => {
    try {
      const currentArticle = ArticleDatabase.getCurrentArticle();

      const nextState: TAppProps<EPage.Article> =
        provideArticleAppProps(currentArticle);

      ResultingStateSubject.next(nextState);
    } catch (e) {
      console.error(e);
      CurrentPageSubject.next(EPage.Home);
    }
  }),
).subscribe();

IncomingEventSubject.pipe(
  filter(
    (event) =>
      event.slug === EButtonConstants.Slug &&
      event.id === EArticleBannerConstant.EditButtonId,
  ),
  tap(() => {
    CurrentPageSubject.next(EPage.EditArticle);
  }),
).subscribe();

IncomingEventSubject.pipe(
  filter(
    (event) =>
      event.slug === EButtonConstants.Slug &&
      event.id === EArticlePageConstants.SubmitButtonId,
  ),
  tap(() => {
    try {
      const id = ArticleDatabase.getCurrentArticleId();

      if (!id) throw new Error("No article is selected");

      const isLoggedIn = getIsLoggedIn(); // TODO: Move to UserDatabase

      if (!isLoggedIn) {
        CurrentPageSubject.next(EPage.SignIn);
        return;
      }

      const value = CommentInputSubject.getValue();

      CommentInputSubject.next("");

      if (!value) return;

      const prevState =
        ResultingStateSubject.getValue() as TAppProps<EPage.Article>;

      const nextPost = ArticleDatabase.addCommentById(id, value);

      const nextState: TAppProps<EPage.Article> = {
        page: EPage.Article,
        pageProps: {
          ...prevState.pageProps,
          comments: nextPost?.comments || [],
          commentBoxProps: {
            ...prevState.pageProps.commentBoxProps,
            inputProps: {
              ...prevState.pageProps.commentBoxProps.inputProps,
              value: CommentInputSubject.getValue(),
            },
          },
        },
        navbarProps: provideNavbarProps(),
      };

      ResultingStateSubject.next(nextState);
    } catch (e) {
      console.error(e);
      CurrentPageSubject.next(EPage.Home);
    }
  }),
).subscribe();

IncomingEventSubject.pipe(
  filter(
    (event) =>
      event.slug === EInputConstants.Slug &&
      event.id === EArticlePageConstants.InputId,
  ),
  tap((event) => {
    const value = getEventTargetValue(event);
    const prevValue = CommentInputSubject.getValue();
    const currentArticle = ArticleDatabase.getCurrentArticle();

    if (!currentArticle) return;

    CommentInputSubject.next(value ?? prevValue);
  }),
  tap(() => {
    const value = CommentInputSubject.getValue();
    const prevState =
      ResultingStateSubject.getValue() as TAppProps<EPage.Article>;

    const nextState: TAppProps<EPage.Article> = {
      page: EPage.Article,
      pageProps: {
        ...prevState.pageProps,
        commentBoxProps: {
          ...prevState.pageProps.commentBoxProps,
          inputProps: {
            ...prevState.pageProps.commentBoxProps.inputProps,
            value,
          },
        },
      },
      navbarProps: provideNavbarProps(),
    };

    ResultingStateSubject.next(nextState);
  }),
).subscribe();

IncomingEventSubject.pipe(
  filter(
    (event) =>
      event.slug === EButtonConstants.Slug &&
      event.id === EArticleBannerConstant.RemoveButtonId,
  ),
  tap(() => {
    const id = ArticleDatabase.getCurrentArticleId();

    if (!id) return;

    ArticleDatabase.removeArticleById(id);

    CurrentPageSubject.next(EPage.Home);
  }),
).subscribe();
