import { filter, tap } from "rxjs";
import { EPage, TAppProps } from "../../types";
import {
  CurrentPageSubject,
  ResultingStateSubject,
} from "../common.logic";
import { ArticleDatabase } from "../data/article";
import { provideNavbarProps } from "../utils/utils";
import { AppState } from "../data/app";
import { UserDatabase } from "../data/user";

CurrentPageSubject.pipe(
  filter((page) => page === EPage.Profile),
  tap((page) => {
    const username = AppState.selectedUserId;

    if (!username) return;

    const userInfoProps = UserDatabase.findUserByName(username);

    if (!userInfoProps) {
      CurrentPageSubject.next(EPage.Home);
      return;
    }

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
        posts: ArticleDatabase.getArticlesByUsername(userInfoProps.username),
        sidebarProps: {
          tags: [], // FIXME
          title: "Popular tags",
        },
        tabs: [],
      },
      navbarProps: provideNavbarProps(),
    };
    ResultingStateSubject.next(nextState);
  }),
).subscribe();
