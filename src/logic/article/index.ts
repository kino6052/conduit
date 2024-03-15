import { BehaviorSubject, filter, tap } from "rxjs";
import { EArticleBannerConstant } from "../../components/Banner/ArticleBanner/constants";
import { EButtonConstants } from "../../components/Button/constants";
import { DefaultData as DefaultArticleData } from "../../pages/ArticlePage/data";
import { EPage, TAppProps } from "../../types";
import {
  CurrentArticleId,
  CurrentPageSubject,
  IncomingEventSubject,
  PostsSubject,
  ResultingStateSubject,
  UserInfoSubject,
} from "../common.logic";
import { EInputConstants } from "../../components/Input/Input/constants";
import { EArticlePageConstants } from "../../pages/ArticlePage/constants";

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

    const currentArticle = PostsSubject.getValue()[currentArticleId];

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
        comments: [], // TODO: Add comments,
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
      event.slug === EInputConstants.Slug &&
      event.id === EArticlePageConstants.InputId,
  ),
  tap((event) => {
    const value = getEventTargetValue(event);
  }),
).subscribe();
