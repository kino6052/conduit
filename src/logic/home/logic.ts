import { EPage, TAppProps } from "../../types";
import { IEvent } from "../../utils/events";
import { RefreshSubject, ResultingStateSubject } from "../common.logic";
import { AppState } from "../data/app";
import { ArticleDatabase } from "../data/article";
import { UserDatabase } from "../data/user";
import { provideNavbarProps, updatePage } from "../utils/utils";

export class HomePage {
  static handleArticleClick(event: IEvent) {
    // TODO: Move into "article handlers"
    const id = event.id;

    if (!id) {
      console.error("Item doesn't have an id");
      return;
    }

    ArticleDatabase.setCurrentArticleId(id);
    updatePage(EPage.Article); // TODO: Change AppState instead
  }

  static handleArticleLike(event: IEvent) {
    const id = event.id;

    if (!id) return;

    ArticleDatabase.likeArticleById(id);
    updatePage(EPage.Home);
  }

  static selectTag(event: IEvent) {
    const id = event.id;

    if (!id) return;

    AppState.selectedTagId = id;

    updatePage(EPage.Home);
  }

  static handleUserInfoClick(event: IEvent) {
    const id = event.id;

    if (!id) return;

    const article = ArticleDatabase.getArticleById(id);

    const { userInfoProps } = article;

    const userInfo = UserDatabase.findUserByName(userInfoProps.username);

    AppState.selectedUserId = userInfo?.username;

    updatePage(EPage.Profile);
  }

  static update() {
    const nextState: TAppProps<EPage.Home> = {
      page: EPage.Home,
      pageProps: {
        posts: ArticleDatabase.getArticles().filter((post) => {
          const selectedTag = ArticleDatabase.getAllTags().find(
            (t) => t.id === AppState.selectedTagId,
          );

          if (!selectedTag) return true;

          const tag = post.tags.find(({ id }) => id === selectedTag.id);
          return !!tag;
        }),
        paginationBarProps: {
          numberOfPages: 1,
          selected: 0,
        },
        sidebarProps: {
          tags: ArticleDatabase.getAllTags(),
          title: "Popular Tags",
        },
        tabs: [],
      },
      navbarProps: provideNavbarProps(),
    };

    ResultingStateSubject.next(nextState);
  }
}
