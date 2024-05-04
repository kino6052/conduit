import { ArticlePage } from "../../../../../../model/pages/ArticlePage";
import { EPage } from "../../../../../../model/pages/types";
import { IAppState } from "../../../../../../model/types";
import { TAppProps } from "../../../types";
import { generateNavBarProps } from "../../selectors";

export const generateArticlePageProps = (
  state: IAppState,
  refresh?: () => void,
): TAppProps<EPage.Article> => {
  const page = state.currentPage as ArticlePage;

  return {
    navbarProps: generateNavBarProps(state, refresh),
    page: EPage.Article,
    pageProps: {
      onMount: () => {
        const result = page.initialize().then(() => {
          refresh?.();
        });

        refresh?.();

        return result;
      },
      bannerProps: {
        title: page.article?.title || "",
        canEdit: page.article?.username === state.currentUsername,
        userInfoProps: {
          date: page.article?.date ?? "",
          onClick: () => {
            alert("Click on the author");
          },
          username: page.article?.username ?? "",
        },
      },
      tags: [],
      commentBoxProps: {
        iconProps: {
          icon: "favorite",
        },
        inputProps: {
          onChange: () => {
            alert("Change");
          },
          placeholder: "Input",
          value: "",
        },
      },
      comments: [],
      content: page.article?.description ?? "",
      favoriteButtonProps: {
        onClick: () => {
          alert("Favorite");
        },
        text: "Like",
      },
      followButtonProps: {
        onClick: () => {
          alert("Follow");
        },
        text: "Follow",
      },
    },
  };
};
