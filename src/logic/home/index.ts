import { filter, tap } from "rxjs";
import { EPostConstant as EPostConstant } from "../../components/Post/constants";
import {
  CurrentArticleId,
  CurrentPageSubject,
  IncomingEventSubject,
  PostsSubject,
  ResultingStateSubject,
  SelectedTagSubject,
  TagsSubject,
} from "../common.logic";
import { EPage, TAppProps } from "../../types";
import { EButtonConstants } from "../../components/Button/constants";
import { getArticlesByTagText, getCurrentArticleId, likeArticleById } from "../utils/article-crud";
import { ETagConstant } from "../../components/Tag/constants";

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
    };

    ResultingStateSubject.next(nextState);
  }),
).subscribe();
