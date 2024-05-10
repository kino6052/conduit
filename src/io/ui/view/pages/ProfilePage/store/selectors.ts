import { ProfilePage } from "../../../../../../model/pages/ArticlePreviewPage/ProfilePage";
import { EPage } from "../../../../../../model/pages/types";
import { IAppState } from "../../../../../../model/types";
import { generatePostsProps } from "../../../components/Article/selectors";
import { TAppProps } from "../../../types";
import { getAsyncRefresh } from "../../../utils/utils";
import { generateNavBarProps } from "../../selectors";

export const generateProfilePageProps = (
  state: IAppState,
  refresh?: () => void,
): TAppProps<EPage.Profile> => {
  const page = state.currentPage as ProfilePage;
  return {
    navbarProps: generateNavBarProps(page, refresh),
    page: EPage.Profile,
    pageProps: {
      isLoading: state.isLoading,
      onMount: getAsyncRefresh(page.initialize.bind(page), refresh),
      bannerProps: {
        userInfoProps: {
          username: page.user?.userInfo.username ?? "",
          date: page.user?.userInfo.date ?? "",
          imageSrc: page.user?.userInfo.imageSrc ?? "",
        },
        followButtonProps: {
          onClick: getAsyncRefresh(
            async () =>
              page.user?.toggleFollowBy.bind(page.user)(
                page.state.currentUsername,
              ),
            refresh,
          ),
          text: page.user?.isFollowing ? "Unfollow" : "Follow",
          disabled: state.isLoading,
        },
      },
      paginationBarProps: {
        pages:
          page.pagination?.pages.map((paginationPage, i) => ({
            isSelected: paginationPage.isSelected,
            onClick: getAsyncRefresh(
              paginationPage.select.bind(paginationPage),
              refresh,
            ),
            text: `${i + 1}`,
          })) ?? [],
      },
      posts: generatePostsProps(state, refresh),
      sidebarProps: {
        tags: [],
        title: "Popular",
      },
      tabs: [],
    },
  };
};
