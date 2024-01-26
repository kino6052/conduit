import { BehaviorSubject, Subject, combineLatest, map, tap } from "rxjs";
import { TBannerProps } from "../../components/Banner/Banner";
import { TPostProps } from "../../components/Post/Post";
import { TUserInfo } from "../../components/UserInfo/UserInfo";
import { EPage, TAppProps } from "../../types";
import { IEvent } from "../../utils/events";
import { DefaultAppProps } from "../data";

export const hasPressedEnter = (event: IEvent) => {
  const _event = event.event as KeyboardEvent;
  return event.type === "onKeyDown" && _event.key === "Enter";
};

// States
export const UserInfoSubject = new BehaviorSubject<TUserInfo>({
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
    date: "01 January 2024",
    username: "Jane Lobster",
    description: "A good article, a really really good one",
    likes: 24,
    tags: ["first", "second", "third"],
    title: "A good thing",
  },
});
export const LikesSubject = new BehaviorSubject<{
  [id: string]: boolean;
}>({});

// Messengers
export const IncomingEventSubject = new Subject<IEvent>();
export const ResultingStateSubject = new BehaviorSubject<TAppProps>(
  DefaultAppProps,
);

combineLatest({
  CurrentPageSubject,
  PostsSubject,
  LikesSubject,
  PostInputValueSubject,
  CurrentArticleId,
})
  .pipe(
    map((result) => {
      const page = result.CurrentPageSubject;
      return {
        page: result.CurrentPageSubject,
        pageProps: {
          input: result.PostInputValueSubject,
          bannerProps: [
            page === EPage.Home && {
              variant: "default",
            },
            page === EPage.Article &&
              result.CurrentArticleId &&
              result.PostsSubject[result.CurrentArticleId] && {
                variant: "article",
                heading: result.PostsSubject[result.CurrentArticleId].title,
                userInfo: {
                  date: result.PostsSubject[result.CurrentArticleId].date,
                  username:
                    result.PostsSubject[result.CurrentArticleId].username,
                },
              },
          ].find(Boolean) as TBannerProps | undefined,
          posts: Object.values(result.PostsSubject),
          username: "eni9mu5",
          sidebarProps: {
            title: "Tags",
            tags: ["test"],
          },
          tabs: [{}],
        },
      } as TAppProps;
    }),
    tap((nextState) => {
      ResultingStateSubject.next(nextState);
    }),
  )
  .subscribe();
