import { HomePage } from "../../../../../../app/pages/ArticlePreviewPage/HomePage";
import { EPage, IPage } from "../../../../../../app/pages/types";
import { generatePostsProps } from "../../../components/Article/selectors";
import { ETabVariant } from "../../../components/Tab/types";
import { TAppProps } from "../../../types";
import { getAsyncRefresh } from "../../../utils/utils";
import { generateNavBarProps } from "../../selectors";

export const generateHomePageProps = (
  page: IPage,
  refresh?: () => void,
): TAppProps<EPage.Home> => {
  const _page = page as HomePage
  return {
    navbarProps: generateNavBarProps(_page, refresh),
    page: EPage.Home,
    pageProps: {
      paginationBarProps: {
        pages:
          _page.pagination?.items.map((paginationPage, i) => ({
            isSelected: paginationPage.isSelected,
            onClick: getAsyncRefresh(paginationPage.select, refresh),
            text: `${i + 1}`,
          })) ?? [],
      },
      isLoading: _page.isLoading,
      posts: generatePostsProps(_page.articles, refresh),
      sidebarProps: {
        tags: _page.tags?.items.map((tag) => {
          return {
            id: tag.id,
            onClick: getAsyncRefresh(tag.select, refresh),
          };
        }),
        title: "Popular tags",
      },
      tabs: _page.tabs?.items.map((tab) => ({
        id: tab.id,
        isActive: tab.isSelected,
        onClick: getAsyncRefresh(tab.select, refresh),
        text: tab.text,
        variant: ETabVariant.Default,
      })),
    } as TAppProps<EPage.Home>["pageProps"],
  };
};
