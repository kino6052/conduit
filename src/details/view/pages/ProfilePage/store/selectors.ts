import { ProfilePage } from "../../../../../app/entities/pages/ArticlePreviewPage/ProfilePage";
import { EPage, IPage } from "../../../../../app/entities/pages/types";
import { generatePostsProps } from "../../../components/Article/selectors";
import { TAppProps } from "../../../types";
import { getAsyncRefresh } from "../../../utils/utils";
import { generateNavBarProps } from "../../selectors";

export const generateProfilePageProps = (
  page: IPage,
  refresh?: () => void,
): TAppProps<EPage.Profile> => {
  const _page = page as ProfilePage;
  return {
    navbarProps: generateNavBarProps(_page, refresh),
    page: EPage.Profile,
    pageProps: {
      isLoading: _page.isLoading,
      onMount: async () => {},
      bannerProps: {
        userInfoProps: {
          username: _page.user?.userInfo.username ?? "",
          date: _page.user?.userInfo.date ?? "",
          imageSrc: _page.user?.userInfo.imageSrc ?? "",
        },
        followButtonProps: {
          onClick: getAsyncRefresh(
            async () => _page.followControl?.onActivate?.(),
            refresh,
          ),
          text: _page.followControl?.text ?? "",
          disabled: _page.followControl?.isDisabled,
        },
      },
      paginationBarProps: {
        pages:
          _page.pagination?.items.map((paginationPage, i) => ({
            isSelected: paginationPage.isSelected,
            onClick: getAsyncRefresh(
              paginationPage.select.bind(paginationPage),
              refresh,
            ),
            text: `${i + 1}`,
          })) ?? [],
      },
      posts: generatePostsProps(_page.articles, refresh),
      sidebarProps: {
        tags: [],
        title: "Popular",
      },
      tabs: [],
    },
  };
};
