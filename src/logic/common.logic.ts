import { BehaviorSubject, Subject, tap } from "rxjs";
import { TNavbarProps } from "../components/Navbar/types";
import { TPostProps } from "../components/Post/types";
import { ETabVariant, TTabProps } from "../components/Tab/types";
import { TTagContentProps } from "../components/Tag/types";
import { DefaultAppProps } from "../data";
import { EPage, TAppProps } from "../types";
import { IEvent } from "../utils/events";
import { TUserInfo } from "./types";

export const hasPressedEnter = (event: IEvent) => {
  const _event = event.event as KeyboardEvent;
  return event.type === "onKeyDown" && _event.key === "Enter";
};

export class UserDatabase {
  private static users: TUserInfo[] = [
    {
      username: "jane-lobster",
      password: "123456",
      articleIds: ["post-1"],
      date: "",
      favoriteArticleIds: [],
    },
  ];

  public static findUserByName(username: string) {
    return this.users.find((user) => user.username === username);
  }

  public static registerNewUser(user: TUserInfo) {
    const alreadyRegisteredUser = this.users.find((_user) => {
      return _user.username === user.username;
    });

    if (alreadyRegisteredUser) throw new Error("User already exists");

    this.users.push(user);
  }
}

export const provideNavbarProps = (): TNavbarProps => {
  const username = UserInfoSubject.getValue()?.username;

  const isLogedIn = !!username;

  return {
    tabs: [
      {
        id: EPage.Home,
        text: "Home",
        variant: ETabVariant.Menu,
      },
      isLogedIn && {
        id: EPage.NewArticle,
        icon: "edit",
        text: "New Post",
        variant: ETabVariant.Menu,
      },
      isLogedIn && {
        id: EPage.Settings,
        icon: "settings",
        text: "Settings",
        variant: ETabVariant.Menu,
      },
      isLogedIn && {
        id: EPage.Profile,
        icon: "person",
        text: username,
        variant: ETabVariant.Menu,
      },
      !isLogedIn && {
        id: EPage.SignIn,
        text: "Sign In",
        variant: ETabVariant.Menu,
      },
      !isLogedIn && {
        id: EPage.SignUp,
        text: "Sign Up",
        variant: ETabVariant.Menu,
      },
    ].filter(Boolean) as TTabProps[],
  };
};

// States
export const UserInfoSubject = new BehaviorSubject<TUserInfo | undefined>(
  undefined,
);

export const SelectedUserInfoSubject = new BehaviorSubject<
  TUserInfo | undefined
>(undefined);

export const SelectedTagSubject = new BehaviorSubject<string | undefined>(
  undefined,
);

export const CurrentPageSubject = new BehaviorSubject<EPage>(EPage.Home);

CurrentPageSubject.pipe(tap((page) => console.warn({ page }))).subscribe();

export const CurrentArticleId = new BehaviorSubject<string | undefined>(
  undefined,
);

export const PostInputValueSubject = new BehaviorSubject<string>("");

export const PostsSubject = new BehaviorSubject<{ [id: string]: TPostProps }>({
  "post-1": {
    id: "post-1",
    userInfoProps: {
      date: "01 January 2024",
      username: "jane-lobster",
    },
    description: "A good article, a really really good one",
    hasLiked: false,
    likes: 24,
    tags: [
      {
        id: "1",
      },
      {
        id: "2",
      },
      {
        id: "3",
      },
    ],
    title: "A good thing",
    comments: [],
  },
});

export const TagsSubject = new BehaviorSubject<TTagContentProps[]>([
  {
    id: "1",
  },
  {
    id: "2",
  },
  {
    id: "3",
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
