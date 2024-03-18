import { filter, tap } from "rxjs";
import { EArticleConstant } from "../../components/Article/constants";
import { ETagConstant } from "../../components/Tag/constants";
import { EPage, TAppProps } from "../../types";
import {
  CurrentPageSubject,
  IncomingEventSubject,
  ResultingStateSubject,
  SelectedTagSubject,
  SelectedUserInfoSubject,
  TagsSubject,
} from "../common.logic";
import { ArticleDatabase } from "../data/article";
import { UserDatabase } from "../data/user";
import { provideNavbarProps } from "../utils/utils";

// TODO: Rewrite as handler registry
IncomingEventSubject.pipe(
  filter((event) => event.slug === EArticleConstant.Slug),
  tap((event) => {
    const id = event.id;

    if (!id) {
      console.error("Item doesn't have an id");
      return;
    }

    ArticleDatabase.setCurrentArticleId(id);
    CurrentPageSubject.next(EPage.Article);
  }),
).subscribe();

IncomingEventSubject.pipe(
  filter((event) => event.slug === EArticleConstant.LikeButtonSlug),
  tap((event) => {
    const id = event.id;

    if (!id) return;

    ArticleDatabase.likeArticleById(id);

    CurrentPageSubject.next(EPage.Home);
  }),
).subscribe();

IncomingEventSubject.pipe(
  filter((event) => event.slug === ETagConstant.Slug),
  tap((event) => {
    const id = event.id;

    if (!id) return;

    SelectedTagSubject.next(id);

    CurrentPageSubject.next(EPage.Home);
  }),
).subscribe();

IncomingEventSubject.pipe(
  filter((event) => event.slug === EArticleConstant.UserInfoSlug),
  tap((event) => {
    const id = event.id;

    if (!id) return;

    const article = ArticleDatabase.getArticleById(id);

    const { userInfoProps } = article;

    const userInfo = UserDatabase.findUserByName(userInfoProps.username);

    SelectedUserInfoSubject.next(userInfo);
    CurrentPageSubject.next(EPage.Profile);
  }),
).subscribe();

CurrentPageSubject.pipe(
  filter((page) => page === EPage.Home),
  tap(() => {
    const nextState: TAppProps<EPage.Home> = {
      page: EPage.Home,
      pageProps: {
        posts: ArticleDatabase.getArticles().filter((post) => {
          const selectedTag = SelectedTagSubject.getValue();

          if (!selectedTag) return true;

          const tag = post.tags.find(({ id }) => id === selectedTag);
          return !!tag;
        }),
        paginationBarProps: {
          numberOfPages: 1,
          selected: 0,
        },
        sidebarProps: {
          tags: TagsSubject.getValue(),
          title: "Popular Tags",
        },
        tabs: [],
      },
      navbarProps: provideNavbarProps(),
    };

    ResultingStateSubject.next(nextState);
  }),
).subscribe();
