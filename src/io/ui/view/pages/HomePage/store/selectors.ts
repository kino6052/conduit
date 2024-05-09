import { HomePage } from "../../../../../../model/pages/ArticlePreviewPage/HomePage";
import { EPage } from "../../../../../../model/pages/types";
import { IAppState } from "../../../../../../model/types";
import { ETabVariant } from "../../../components/Tab/types";
import { TAppProps } from "../../../types";
import { getAsyncRefresh } from "../../../utils/utils";
import { generateNavBarProps } from "../../selectors";

export const generateHomePageProps = (
  state: IAppState,
  refresh?: () => void,
): TAppProps<EPage.Home> => {
  const page = state.currentPage as HomePage;
  return {
    navbarProps: generateNavBarProps(page, refresh),
    page: EPage.Home,
    pageProps: {
      onMount: getAsyncRefresh(page.initialize.bind(page), refresh),
      paginationBarProps: {
        numberOfPages: (state.currentPage as HomePage).pagination.numberOfPages,
        selected: (state.currentPage as HomePage).pagination.currentPageNumber,
        onClick: () => {
          console.warn("Click");
        },
      },
      isLoading: page.state.isLoading,
      posts: page.articles.map((article) => ({
        ...article.articleData,
        comments: [],
        tags: article.articleData.tags.map((tag) => ({
          id: tag,
          onClick: getAsyncRefresh(() => page.selectTag(tag), refresh),
        })),
        hasLiked: article.articleData.likers.includes(state.currentUsername),
        likeButtonProps: {
          onClick: getAsyncRefresh(article.toggleLike.bind(article), refresh),
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
        onClick: async () => {
          article.read();
          refresh?.();
        },
      })),
      sidebarProps: {
        tags: page.tags.map((tag) => ({
          id: tag,
          onClick: getAsyncRefresh(() => page.selectTag(tag), refresh),
        })),
        title: "Popular tags",
      },
      tabs: page.tabs.map((tab) => ({
        id: tab.id,
        isActive: tab.isSelected,
        onClick: getAsyncRefresh(tab.open, refresh),
        text: tab.name,
        variant: ETabVariant.Default,
      })),
    } as TAppProps<EPage.Home>["pageProps"],
  };
};
