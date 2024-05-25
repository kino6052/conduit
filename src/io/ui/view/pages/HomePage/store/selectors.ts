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

  const next = {
    navbarProps: generateNavBarProps(page, refresh),
    page: EPage.Home,
    pageProps: {
      onMount: async () => {},
      paginationBarProps: {
        pages:
          page.pagination?.items.map((paginationPage, i) => ({
            isSelected: paginationPage.isSelected,
            onClick: getAsyncRefresh(paginationPage.select, refresh),
            text: `${i + 1}`,
          })) ?? [],
      },
      isLoading: page.isLoading,
      posts: generatePostsProps(page.articles, refresh),
      sidebarProps: {
        tags: page.tags?.items.map((tag) => {
          return {
            id: tag.id,
            onClick: getAsyncRefresh(tag.select, refresh),
          };
        }),
        title: "Popular tags",
      },
      tabs: page.tabs?.items.map((tab) => ({
        id: tab.id,
        isActive: tab.isSelected,
        onClick: getAsyncRefresh(tab.select, refresh),
        text: tab.text,
        variant: ETabVariant.Default,
      })),
    } as TAppProps<EPage.Home>["pageProps"],
  };

  return next;
};
