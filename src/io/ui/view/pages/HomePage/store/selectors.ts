import { HomePage } from "../../../../../../model/pages/ArticlePreviewPage/HomePage";
import { EPage } from "../../../../../../model/pages/types";
import { IAppState } from "../../../../../../model/types";
import { TAppProps } from "../../../types";
import { generateNavBarProps } from "../../selectors";

export const generateHomePageProps = (
  state: IAppState,
  refresh?: () => void,
): TAppProps<EPage.Home> => {
  return {
    navbarProps: generateNavBarProps(state, refresh),
    page: EPage.Home,
    pageProps: {
      paginationBarProps: {
        numberOfPages: (state.currentPage as HomePage).pagination.numberOfPages,
        selected: (state.currentPage as HomePage).pagination.currentPageNumber,
        onClick: () => {
          console.warn("Click");
        },
      },
      isLoading: state.isLoading,
      posts: [],
      sidebarProps: {
        tags: [],
        title: "Popular tags",
      },
      tabs: [],
    } as TAppProps<EPage.Home>["pageProps"],
  };
};
