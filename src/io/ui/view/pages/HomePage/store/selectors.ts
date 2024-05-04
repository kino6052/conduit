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
      onMount: () => {
        page.initialize().then(() => {
          refresh?.();
        });

        refresh?.();
      },
      paginationBarProps: {
        numberOfPages: (state.currentPage as HomePage).pagination.numberOfPages,
        selected: (state.currentPage as HomePage).pagination.currentPageNumber,
        onClick: () => {
          console.warn("Click");
        },
      },
      isLoading: false,
      posts: page.articles.map(({ read, examineAuthor, tags, ...article }) => ({
        ...article,
        comments: [],
        tags: [],
        hasLiked: article.likers.includes(state.currentUsername),
        likeButtonProps: {
          onClick: () => {
            article.toggleLike();
            refresh?.();
          },
          text: "Like",
        },
        linkProps: {
          onClick: async () => {
            read();
            refresh?.();
          },
        },
        userInfoProps: {
          date: article.date,
          username: article.username,
          onClick: async () => {
            examineAuthor();
            refresh?.();
          },
        },
        onClick: () => {
          read();
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
