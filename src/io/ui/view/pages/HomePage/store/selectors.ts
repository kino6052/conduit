import { HomePage } from "../../../../../../model/pages/ArticlePreviewPage/HomePage";
import { EPage } from "../../../../../../model/pages/types";
import { IAppState } from "../../../../../../model/types";
import { generatePostsProps } from "../../../components/Article/selectors";
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
        pages:
          page.pagination?.pages.map((paginationPage, i) => ({
            isSelected: paginationPage.isSelected,
            onClick: getAsyncRefresh(paginationPage.select, refresh),
            text: `${i + 1}`,
          })) ?? [],
      },
      isLoading: page.state.isLoading,
      posts: generatePostsProps(state, refresh),
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
