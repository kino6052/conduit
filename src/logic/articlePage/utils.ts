import { TArticleProps } from "../../components/Article/types";
import { EPage, TAppProps } from "../../types";
import { AppState } from "../data/app";
import { DefaultData as DefaultArticleData } from "../../pages/ArticlePage/data";
import { provideNavbarProps } from "../utils/utils";

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
          AppState.currentUserId === currentArticle.userInfoProps?.username,
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
