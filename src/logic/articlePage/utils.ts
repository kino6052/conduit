import { TArticleProps } from "../../components/Article/types";
import { DefaultData as DefaultArticleData } from "../../pages/ArticlePage/data";
import { EPage, TAppProps } from "../../types";
import { AppState } from "../data/app";
import { ArticleDatabase } from "../data/article";
import { UserDatabase } from "../data/user";
import { provideNavbarProps } from "../navbar/utils";

export const provideArticleAppProps = (
  currentArticle: TArticleProps,
): TAppProps<EPage.Article> => {
  return {
    page: EPage.Article,
    pageProps: {
      id: currentArticle.id,
      bannerProps: {
        title: currentArticle.title,
        userInfoProps: currentArticle.userInfoProps,
        canEdit:
          AppState.currentUserId === currentArticle.userInfoProps?.username,
      },
      commentBoxProps: DefaultArticleData["commentBoxProps"],
      comments: currentArticle.comments, // TODO: Add comments,
      content: currentArticle.description,
      favoriteButtonProps: {
        ...DefaultArticleData["favoriteButtonProps"],
        text:
          !!AppState.currentUserId &&
          ArticleDatabase.getLikers(currentArticle.id).includes(
            AppState.currentUserId,
          )
            ? "Unfavorite"
            : "Favorite",
      },
      followButtonProps: {
        ...DefaultArticleData["followButtonProps"],
        text:
          !!AppState.currentUserId &&
          UserDatabase.getFollowers(
            currentArticle.userInfoProps.username,
          ).includes(AppState.currentUserId)
            ? "Unfollow"
            : "Follow",
      },
      tags: currentArticle.tags,
      userInfoProps: currentArticle.userInfoProps,
    },
    navbarProps: provideNavbarProps(),
  };
};
