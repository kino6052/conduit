import { filter, tap } from "rxjs";
import { EConstant as EPostConstant } from "../components/Post/constants";
import {
  CurrentArticleId,
  CurrentPageSubject,
  IncomingEventSubject,
  PostsSubject,
  ResultingStateSubject,
  TagsSubject,
} from "./common.logic";
import { EPage, TAppProps } from "../types";

IncomingEventSubject.pipe(
  filter((event) => event.slug === EPostConstant.Slug),
  tap((event) => {
    CurrentArticleId.next(event.id);
    CurrentPageSubject.next(EPage.Article);
  }),
).subscribe();

CurrentPageSubject.pipe(
  filter((page) => page === EPage.Home),
  tap(() => {
    const nextState: TAppProps<EPage.Home> = {
      page: EPage.Home,
      pageProps: {
        posts: Object.values(PostsSubject.getValue()).map((post) => ({
          ...post,
        })),
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
