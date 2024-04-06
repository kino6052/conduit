import { TArticleProps } from "../../components/Article/types";
import { ETabType } from "../../components/Tabs/constants";
import { EPage, TAppProps } from "../../types";
import { findFirst } from "../../utils/array";
import { IEvent } from "../../utils/events";
import { AppState } from "../data/app";
import { ArticleDatabase } from "../data/article";
import { processArticle } from "../data/article/utils";
import { provideNavbarProps } from "../navbar/utils";
import { provideTabsProps } from "../tabs/utils";
import { getIsLoggedIn } from "../utils/user";
import { wait } from "../utils/utils";

export class HomePageLogic {
  static selectTag(event: IEvent) {
    const id = event.id;

    if (!id) return;

    AppState.selectedTagId = id;
    AppState.currentPage = EPage.Home;
    AppState.currentPaginationTabIndex = 0;
  }

  static paginate(event: IEvent) {
    const id = event.id;

    if (!id) return;

    AppState.currentPaginationTabIndex = Number(id);
  }

  static update() {
    const username = AppState.currentUserId;
    const tag = AppState.selectedTagId;

    console.warn({ AppState });

    const posts = (
      findFirst([
        AppState.currentTab === ETabType.Personal &&
          !!username &&
          ArticleDatabase.getArticlesByUsername(username),
        ArticleDatabase.getArticlesByPagination({
          index: AppState.currentPaginationTabIndex,
          tag,
        }),
      ]) ?? []
    )
      .filter(Boolean)
      .map(processArticle) as TArticleProps[];

    const nextState: TAppProps<EPage.Home> = {
      page: EPage.Home,
      pageProps: {
        isLoading: false,
        posts,
        paginationBarProps: {
          numberOfPages: ArticleDatabase.getArticlePaginationTotal({
            tag,
            username:
              AppState.currentTab === ETabType.Personal
                ? AppState.currentUserId
                : undefined,
          }),
          selected: AppState.currentPaginationTabIndex,
        },
        sidebarProps: {
          tags: ArticleDatabase.getAllTags().map((id) => ({ id })),
          title: "Popular Tags",
        },
        tabs: provideTabsProps(),
      },
      navbarProps: provideNavbarProps(),
    };

    return nextState;
  }
}
