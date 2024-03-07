import { BehaviorSubject, Subject, filter, tap } from "rxjs";
import { EConstant as EPostConstant } from "../../components/Post/constants";
import { TPostProps } from "../../components/Post/types";
import { TUserInfoContentProps } from "../../components/UserInfo/types";
import { DefaultData as DefaultArticleData } from "../../pages/ArticlePage/data";
import { EPage, TAppProps } from "../../types";
import { IEvent } from "../../utils/events";
import { DefaultAppProps } from "../data";

export const hasPressedEnter = (event: IEvent) => {
  const _event = event.event as KeyboardEvent;
  return event.type === "onKeyDown" && _event.key === "Enter";
};

// States
export const UserInfoSubject = new BehaviorSubject<TUserInfoContentProps>({
  date: "01 April 1990",
  username: "Test",
});

export const CurrentPageSubject = new BehaviorSubject<EPage>(EPage.Home);

export const CurrentArticleId = new BehaviorSubject<string | undefined>(
  undefined,
);

export const PostInputValueSubject = new BehaviorSubject<string>("");

export const PostsSubject = new BehaviorSubject<{ [id: string]: TPostProps }>({
  "post-1": {
    id: "post-1",
    userInfoProps: {
      date: "01 January 2024",
      username: "Jane Lobster",
    },
    description: "A good article, a really really good one",
    likes: 24,
    tags: [
      {
        text: "first",
        id: "1",
      },
      {
        text: "second",
        id: "2",
      },
      {
        text: "third",
        id: "3",
      },
    ],
    title: "A good thing",
  },
});

export const LikesSubject = new BehaviorSubject<{
  [id: string]: boolean;
}>({});

// Messengers
export const IncomingEventSubject = new Subject<IEvent>();
export const ResultingStateSubject = new BehaviorSubject<TAppProps<EPage>>(
  DefaultAppProps,
);

IncomingEventSubject.pipe(
  filter((event) => event.slug === EPostConstant.Slug),
  tap((event) => {
    alert("Click!");
    CurrentArticleId.next(event.id);
    CurrentPageSubject.next(EPage.Article);
  }),
).subscribe();

CurrentPageSubject.pipe(
  filter((page) => page === EPage.Article),
  tap((page) => {
    alert("Article!");
    const currentArticleId = CurrentArticleId.getValue();

    if (!currentArticleId) {
      console.error("Article not found");
      CurrentPageSubject.next(EPage.Home);
      return;
    }

    const currentArticle = PostsSubject.getValue()[currentArticleId];

    if (!currentArticle) {
      console.error("Article not found");
      CurrentPageSubject.next(EPage.Home);
      return;
    }

    const nextState: TAppProps<EPage.Article> = {
      page: EPage.Article,
      pageProps: {
        bannerProps: {
          title: currentArticle.title,
          userInfoProps: currentArticle.userInfoProps,
        },
        commentBoxProps: DefaultArticleData["commentBoxProps"],
        comments: [], // TODO: Add comments,
        content: currentArticle.description,
        favoriteButtonProps: DefaultArticleData["favoriteButtonProps"],
        followButtonProps: DefaultArticleData["followButtonProps"],
        tags: currentArticle.tags,
        userInfoProps: currentArticle.userInfoProps,
      },
    };
    ResultingStateSubject.next(nextState);
  }),
).subscribe();

CurrentPageSubject.pipe(
  filter((page) => page === EPage.Home),
  tap((page) => {
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
          tags: [],
          title: "Popular Tags",
        },
        tabs: [],
      },
    };
    ResultingStateSubject.next(nextState);
  }),
).subscribe();

// combineLatest({
//   CurrentPageSubject,
//   PostsSubject,
//   LikesSubject,
//   PostInputValueSubject,
//   CurrentArticleId,
// })
//   .pipe(
//     map((result) => {
//       const page = result.CurrentPageSubject;
//       return {
//         page: result.CurrentPageSubject,
//         pageProps: {
//           input: result.PostInputValueSubject,
//           bannerProps: findFirst([
//             page === EPage.Home && {
//               variant: "default",
//             },
//             page === EPage.Article &&
//               result.CurrentArticleId &&
//               result.PostsSubject[result.CurrentArticleId] && {
//                 variant: "article",
//                 heading: result.PostsSubject[result.CurrentArticleId].title,
//                 userInfo: {
//                   date: result.PostsSubject[result.CurrentArticleId]
//                     .userInfoProps.date,
//                   username:
//                     result.PostsSubject[result.CurrentArticleId].userInfoProps
//                       .username,
//                 },
//               },
//           ]),
//           posts: Object.values(result.PostsSubject),
//           username: "eni9mu5",
//           sidebarProps: {
//             title: "Tags",
//             tags: ["test"],
//           },
//           tabs: [{}],
//         },
//       };
//     }),
//     tap((nextState) => {
//       ResultingStateSubject.next(nextState);
//     }),
//   )
//   .subscribe();
