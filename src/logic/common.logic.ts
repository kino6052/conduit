import { BehaviorSubject, Subject, tap } from "rxjs";
import { TPostProps } from "../components/Post/types";
import { TUserInfoContentProps } from "../components/UserInfo/types";
import { EPage, TAppProps } from "../types";
import { IEvent } from "../utils/events";
import { DefaultAppProps } from "../data";
import { TTagContentProps } from "../components/Tag/types";

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

CurrentPageSubject.pipe(tap((page) => console.warn({ page }))).subscribe();

export const CurrentArticleId = new BehaviorSubject<string | undefined>(
  undefined,
);

export const getCurrentArticle = () => {
  const id = CurrentArticleId.getValue();
  if (!id) return undefined;
  const article = PostsSubject.getValue()[id];
  return article;
};

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
    comments: [],
  },
});

export const TagsSubject = new BehaviorSubject<TTagContentProps[]>([
  {
    text: "one",
    id: "one",
    slug: "one",
  },
  {
    text: "two",
    id: "two",
    slug: "two",
  },
  {
    text: "three",
    id: "three",
    slug: "three",
  },
]);

export const LikesSubject = new BehaviorSubject<{
  [id: string]: boolean;
}>({});

// Messengers
export const IncomingEventSubject = new Subject<IEvent>();
export const ResultingStateSubject = new BehaviorSubject<TAppProps<EPage>>(
  DefaultAppProps,
);
