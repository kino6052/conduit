import { EPage, TAppProps } from "../../types";
import { IEvent } from "../../utils/events";
import { ResultingStateSubject } from "../common.logic";
import { AppState } from "../data/app";
import { ArticleDatabase } from "../data/article";
import { processArticle } from "../data/article/utils";
import { provideNavbarProps, updatePage } from "../utils/utils";

export class HomePageLogic {
  static handleArticleClick(event: IEvent) {
    // TODO: Move into "article handlers"
    const id = event.id;

    if (!id) {
      console.error("Item doesn't have an id");
      return;
    }

    AppState.selectedArticleId = id;
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

  static update() {
    const nextState: TAppProps<EPage.Home> = {
      page: EPage.Home,
      pageProps: {
        posts: ArticleDatabase.getArticles()
          .map(processArticle)
          .filter((post) => {
            const selectedTag = ArticleDatabase.getAllTags().find(
              (t) => t === AppState.selectedTagId,
            );

            if (!selectedTag) return true;

            const tag = post.tags.find(({ id }) => id === selectedTag);
            return !!tag;
          }),
        paginationBarProps: {
          numberOfPages: 1,
          selected: 0,
        },
        sidebarProps: {
          tags: ArticleDatabase.getAllTags().map((id) => ({ id })),
          title: "Popular Tags",
        },
        tabs: [],
      },
      navbarProps: provideNavbarProps(),
    };

    ResultingStateSubject.next(nextState);
  }
}
