import { filter, tap } from "rxjs";
import { EArticleConstant } from "../../components/Article/constants";
import { ETagConstant } from "../../components/Tag/constants";
import { EPage, TAppProps } from "../../types";
import {
  CurrentPageSubject,
  IncomingEventSubject,
  ResultingStateSubject,
} from "../common.logic";
import { ArticleDatabase } from "../data/article";
import { UserDatabase } from "../data/user";
import { provideNavbarProps } from "../utils/utils";
import { AppState } from "../data/app";

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

    AppState.selectedTagId = id;

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

    AppState.selectedUserId = userInfo?.username;

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
          const selectedTag = ArticleDatabase.getAllTags().find(t => t.id === AppState.selectedTagId);

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
  }),
).subscribe();
