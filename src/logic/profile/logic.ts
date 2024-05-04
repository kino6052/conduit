import { TArticleProps } from "../../io/ui/view/components/Article/types";
import { EPage, TAppProps } from "../../io/ui/view/types";
import { ResultingStateSubject } from "../common.logic";
import { AppState } from "../data/app";
import { ArticleDatabase } from "../data/article";
import { processArticle } from "../data/article/utils";
import { UserDatabase } from "../data/user";
import { provideNavbarProps } from "../navbar/utils";
import { updatePage } from "../utils/utils";

export class ProfileLogic {
  public static update() {
    const username = AppState.selectedUserId;

    if (!username) return;

    const userInfoProps = UserDatabase.findUserByName(username);

    if (!userInfoProps) {
      updatePage(EPage.Home);
      return;
    }

    const posts = ArticleDatabase.getArticlesByUsername(userInfoProps.username)
      .map((p) => processArticle(p))
      .filter(Boolean) as TArticleProps[];
    const tags = posts.map((post) => post?.tags ?? []).flat();

    const nextState: TAppProps<EPage.Profile> = {
      page: EPage.Profile,
      pageProps: {
        bannerProps: {
          userInfoProps,
          followButtonProps: {
            id: "",
            text: userInfoProps.followers.find(
              (id) => id === AppState.currentUserId,
            )
              ? "Unfollow"
              : "Follow",
          },
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
