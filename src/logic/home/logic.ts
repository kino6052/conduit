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
import { wait } from "../utils/utils";

export class HomePageLogic {
  static selectTag(event: IEvent) {
    const id = event.id;

    if (!id) return;

    AppState.selectedTagId = id;
    AppState.currentPage = EPage.Home;
  }

  static async update() {
    const username = AppState.currentUserId;
    const tag = AppState.selectedTagId;

    const posts = (
      findFirst([
        !!tag && ArticleDatabase.getArticlesByTag(tag),
        AppState.currentTab === ETabType.Global &&
          ArticleDatabase.getArticles(),
        AppState.currentTab === ETabType.Personal &&
          !!username &&
          ArticleDatabase.getArticlesByUsername(username),
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
          numberOfPages: 1,
          selected: 0,
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
