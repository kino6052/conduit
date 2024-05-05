import { HomePage } from "../../../../../../model/pages/ArticlePreviewPage/HomePage";
import { EPage } from "../../../../../../model/pages/types";
import { IAppState } from "../../../../../../model/types";
import { TAppProps } from "../../../types";
import { generateNavBarProps } from "../../selectors";

export const generateHomePageProps = (
  state: IAppState,
  refresh?: () => void,
): TAppProps<EPage.Home> => {
  const page = state.currentPage as HomePage;
  return {
    navbarProps: generateNavBarProps(state, refresh),
    page: EPage.Home,
    pageProps: {
      onMount: async () => {
        const result = page.initialize().then(() => {
          refresh?.();
        });

        refresh?.();

        return result;
      },
      paginationBarProps: {
        numberOfPages: (state.currentPage as HomePage).pagination.numberOfPages,
        selected: (state.currentPage as HomePage).pagination.currentPageNumber,
        onClick: () => {
          console.warn("Click");
        },
      },
      isLoading: false,
      posts: page.articles.map((article) => ({
        ...article.articleData,
        comments: [],
        tags: [],
        hasLiked: article.articleData.likers.includes(state.currentUsername),
        likeButtonProps: {
          onClick: async () => {
            await article.toggleLike();
            refresh?.();
          },
          text: `${article.articleData.likers.length}`,
        },
        linkProps: {
          onClick: async () => {
            await article.read();
            refresh?.();
          },
        },
        userInfoProps: {
          date: article.articleData.date,
          username: article.articleData.username,
          onClick: async () => {
            const author = await article.getAuthor();
            await author?.examine();
            refresh?.();
          },
        },
        onClick: () => {
          article.read();
          refresh?.();
        },
      })),
      sidebarProps: {
        tags: page.tags.map((tag) => ({
          id: tag,
          onClick: () => {},
        })),
        title: "Popular tags",
      },
      tabs: [],
    } as TAppProps<EPage.Home>["pageProps"],
  };
};
