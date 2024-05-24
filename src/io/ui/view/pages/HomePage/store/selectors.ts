import { HomePage } from "../../../../../../model/pages/ArticlePreviewPage/HomePage";
import { EPage } from "../../../../../../model/pages/types";
import { INavigationService } from "../../../../../../model/services/NavigationService/types";
import { generatePostsProps } from "../../../components/Article/selectors";
import { ETabVariant } from "../../../components/Tab/types";
import { TAppProps } from "../../../types";
import { getAsyncRefresh } from "../../../utils/utils";
import { generateNavBarProps } from "../../selectors";

export const generateHomePageProps = (
  navigationService: INavigationService,
  refresh?: () => void,
): TAppProps<EPage.Home> => {
  const page = navigationService.currentPage as HomePage;

  return {
    navbarProps: generateNavBarProps(page, refresh),
    page: EPage.Home,
    pageProps: {
      onMount: getAsyncRefresh(page.initialize.bind(page), refresh),
      paginationBarProps: {
        pages:
          page.pagination?.items.map((paginationPage, i) => ({
            isSelected: paginationPage.isSelected,
            onClick: getAsyncRefresh(paginationPage.select, refresh),
            text: `${i + 1}`,
          })) ?? [],
      },
      isLoading: page.isLoading,
      posts: generatePostsProps(navigationService, refresh),
      sidebarProps: {
        tags: page.tags.items.map((tag) => ({
          id: tag.id,
          onClick: getAsyncRefresh(tag.select.bind(tag), refresh),
        })),
        title: "Popular tags",
      },
      tabs: page.tabs.items.map((tab) => ({
        id: tab.id,
        isActive: tab.isSelected,
        onClick: getAsyncRefresh(tab.select, refresh),
        text: tab.name,
        variant: ETabVariant.Default,
      })),
    } as TAppProps<EPage.Home>["pageProps"],
  };
};
