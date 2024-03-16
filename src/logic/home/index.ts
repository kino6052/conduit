import { filter, tap } from "rxjs";
import { EPostConstant } from "../../components/Post/constants";
import { ETagConstant } from "../../components/Tag/constants";
import { EPage, TAppProps } from "../../types";
import {
  CurrentArticleId,
  CurrentPageSubject,
  IncomingEventSubject,
  PostsSubject,
  ResultingStateSubject,
  SelectedTagSubject,
  SelectedUserInfoSubject,
  TagsSubject,
  UserDatabase,
  provideNavbarProps,
} from "../common.logic";
import { getArticleById, likeArticleById } from "../utils/article-crud";

IncomingEventSubject.pipe(
  filter((event) => event.slug === EPostConstant.Slug),
  tap((event) => {
    CurrentArticleId.next(event.id);
    CurrentPageSubject.next(EPage.Article);
  }),
).subscribe();

IncomingEventSubject.pipe(
  filter((event) => event.slug === EPostConstant.LikeButtonSlug),
  tap((event) => {
    const id = event.id;

    if (!id) return;

    likeArticleById(id);

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
  filter((event) => event.slug === EPostConstant.UserInfoSlug),
  tap((event) => {
    const id = event.id;

    if (!id) return;

    const article = getArticleById(id);

    if (!article) return;

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
        posts: Object.values(PostsSubject.getValue()).filter((post) => {
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
