import { ProfilePage } from "../../../../../../model/pages/ArticlePreviewPage/ProfilePage";
import { EPage } from "../../../../../../model/pages/types";
import { IAppState } from "../../../../../../model/types";
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
      onMount: async () => {
        const result = page.initialize().then(() => {
          refresh?.();
        });

        refresh?.();

        return result;
      },
      bannerProps: {
        userInfoProps: {
          username: page.user?.userInfo.username ?? "",
          date: page.user?.userInfo.date ?? "",
        },
        followButtonProps: {
          onClick: async () => {
            await page.user?.toggleFollowBy(page.state.currentUsername);
            refresh?.();
          },
          text: page.isFollowing ? "Unfollow" : "Follow",
        },
      },
      paginationBarProps: {
        pages:
          page.pagination?.pages.map((paginationPage, i) => ({
            isSelected: paginationPage.isSelected,
            onClick: getAsyncRefresh(paginationPage.select, refresh),
            text: `${i + 1}`,
          })) ?? [],
      },
      posts: [], // TODO: Create common selector for posts
      sidebarProps: {
        tags: [],
        title: "Popular",
      },
      tabs: [],
    },
  };
};
