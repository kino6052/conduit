import { BehaviorSubject, filter, tap } from "rxjs";
import { EArticleBannerConstant } from "../../components/Banner/ArticleBanner/constants";
import { EButtonConstants } from "../../components/Button/constants";
import { EInputConstants } from "../../components/Input/Input/constants";
import { EArticlePageConstants } from "../../pages/ArticlePage/constants";
import { DefaultData as DefaultArticleData } from "../../pages/ArticlePage/data";
import { EPage, TAppProps } from "../../types";
import { getEventTargetValue } from "../../utils/events";
import {
  CurrentArticleId,
  CurrentPageSubject,
  IncomingEventSubject,
  ResultingStateSubject,
  UserInfoSubject,
} from "../common.logic";
import {
  addCommentToArticle,
  getCurrentArticle,
  getCurrentArticleId,
  removeArticleById,
} from "../utils/article-crud";

const CommentInputSubject = new BehaviorSubject("");

CurrentPageSubject.pipe(
  filter((page) => page === EPage.Article),
  tap(() => {
    const currentArticleId = CurrentArticleId.getValue();

    if (!currentArticleId) {
      console.error("Article not found");
      CurrentPageSubject.next(EPage.Home);
      return;
    }

    const currentArticle = getCurrentArticle();

    if (!currentArticle) {
      console.error("Article not found");
      CurrentPageSubject.next(EPage.Home);
      return;
    }

    const nextState: TAppProps<EPage.Article> = {
      page: EPage.Article,
      pageProps: {
        bannerProps: {
          title: currentArticle.title,
          userInfoProps: currentArticle.userInfoProps,
          canEdit:
            UserInfoSubject.getValue().username ===
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
    };

    ResultingStateSubject.next(nextState);
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
    const id = getCurrentArticleId();

    if (!id) return;

    const value = CommentInputSubject.getValue();

    CommentInputSubject.next("");

    if (!value) return;

    const prevState =
      ResultingStateSubject.getValue() as TAppProps<EPage.Article>;

    const nextPost = addCommentToArticle(id, value);

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
    };

    ResultingStateSubject.next(nextState);
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
    const currentArticle = getCurrentArticle();

    if (!currentArticle) return;

    CommentInputSubject.next(value ?? prevValue);

    console.warn({ value: value ?? prevValue });
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
    const id = getCurrentArticleId();

    if (!id) return;

    removeArticleById(id);

    CurrentPageSubject.next(EPage.Home);
  }),
).subscribe();
