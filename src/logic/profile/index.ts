import { filter, tap } from "rxjs";
import { EPage, TAppProps } from "../../types";
import {
  CurrentPageSubject,
  ResultingStateSubject,
  SelectedUserInfoSubject,
} from "../common.logic";
import { ArticleDatabase } from "../data/article";
import { provideNavbarProps } from "../utils/utils";

CurrentPageSubject.pipe(
  filter((page) => page === EPage.Profile),
  tap((page) => {
    const userInfoProps = SelectedUserInfoSubject.getValue();

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
