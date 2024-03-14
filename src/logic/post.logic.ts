import { filter, tap } from "rxjs";
import {
  CurrentArticleId,
  CurrentPageSubject,
  IncomingEventSubject,
  PostsSubject,
  ResultingStateSubject,
  UserInfoSubject,
} from "./common.logic";
import { EPage, TAppProps } from "../types";
import { DefaultData as DefaultArticleData } from "../pages/ArticlePage/data";
import { EButtonConstants } from "../components/Button/constants";
import { EArticleBannerConstant } from "../components/Banner/ArticleBanner/constants";

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
    CurrentPageSubject.next(EPage.NewPostPage);
  }),
).subscribe();
