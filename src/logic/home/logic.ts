import { TArticleProps } from "../../components/Article/types";
import { EPage, TAppProps } from "../../types";
import { IEvent } from "../../utils/events";
import { ResultingStateSubject } from "../common.logic";
import { AppState } from "../data/app";
import { ArticleDatabase } from "../data/article";
import { processArticle } from "../data/article/utils";
import { provideNavbarProps, updatePage } from "../utils/utils";

export class HomePageLogic {
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
          .filter(Boolean)
          .filter((post) => {
            const selectedTag = ArticleDatabase.getAllTags().find(
              (t) => t === AppState.selectedTagId,
            );

            if (!selectedTag) return true;

            const tag = post?.tags.find(({ id }) => id === selectedTag);
            return !!tag;
          }) as TArticleProps[],
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
