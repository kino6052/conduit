import { EPage, TAppProps } from "../../types";
import { ResultingStateSubject } from "../common.logic";
import { AppState } from "../data/app";
import { ArticleDatabase } from "../data/article";
import { processArticle } from "../data/article/utils";
import { UserDatabase } from "../data/user";
import { provideNavbarProps, updatePage } from "../utils/utils";

export class ProfileLogic {
  public static update() {
    const username = AppState.selectedUserId;

    if (!username) return;

    const userInfoProps = UserDatabase.findUserByName(username);

    if (!userInfoProps) {
      updatePage(EPage.Home);
      return;
    }

    const posts = ArticleDatabase.getArticlesByUsername(
      userInfoProps.username,
    ).map((p) => processArticle(p));
    const tags = posts.map((post) => post.tags).flat();

    const nextState: TAppProps<EPage.Profile> = {
      page: EPage.Profile,
      pageProps: {
        bannerProps: {
          userInfoProps,
        },
        paginationBarProps: {
          numberOfPages: 1,
          selected: 0,
        },
        posts,
        sidebarProps: {
          tags,
          title: "Related tags",
        },
        tabs: [],
      },
      navbarProps: provideNavbarProps(),
    };

    ResultingStateSubject.next(nextState);
  }
}
