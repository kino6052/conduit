import { ProfilePage } from "../../../../../../model/pages/ArticlePreviewPage/ProfilePage";
import { EPage } from "../../../../../../model/pages/types";
import { INavigationService } from "../../../../../../model/services/NavigationService/types";
import { generatePostsProps } from "../../../components/Article/selectors";
import { TAppProps } from "../../../types";
import { getAsyncRefresh } from "../../../utils/utils";
import { generateNavBarProps } from "../../selectors";

export const generateProfilePageProps = (
  navigationService: INavigationService,
  refresh?: () => void,
): TAppProps<EPage.Profile> => {
  const page = navigationService.currentPage as ProfilePage;
  return {
    navbarProps: generateNavBarProps(page, refresh),
    page: EPage.Profile,
    pageProps: {
      isLoading: page.isLoading,
      onMount: async () => {},
      bannerProps: {
        userInfoProps: {
          username: page.user?.userInfo.username ?? "",
          date: page.user?.userInfo.date ?? "",
          imageSrc: page.user?.userInfo.imageSrc ?? "",
        },
        followButtonProps: {
          onClick: getAsyncRefresh(
            async () => {}, // NOTE: Needs a control
            refresh,
          ),
          text: "Needs control",
          disabled: true,
        },
      },
      paginationBarProps: {
        pages:
          page.pagination?.items.map((paginationPage, i) => ({
            isSelected: paginationPage.isSelected,
            onClick: getAsyncRefresh(
              paginationPage.select.bind(paginationPage),
              refresh,
            ),
            text: `${i + 1}`,
          })) ?? [],
      },
      posts: generatePostsProps(page.articles, refresh),
      sidebarProps: {
        tags: [],
        title: "Popular",
      },
      tabs: [],
    },
  };
};
