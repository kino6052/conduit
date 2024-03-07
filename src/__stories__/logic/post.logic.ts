import { filter, tap } from "rxjs";
import {
  CurrentArticleId,
  CurrentPageSubject,
  PostsSubject,
  ResultingStateSubject,
} from "./common.logic";
import { EPage, TAppProps } from "../../types";
import { DefaultData as DefaultArticleData } from "../../pages/ArticlePage/data";

CurrentPageSubject.pipe(
  filter((page) => page === EPage.Article),
  tap((page) => {
    alert("Article!");
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
