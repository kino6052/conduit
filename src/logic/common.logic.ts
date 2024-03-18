import { BehaviorSubject, Subject, tap } from "rxjs";
import { TTagContentProps } from "../components/Tag/types";
import { DefaultAppProps } from "../data";
import { EPage, TAppProps } from "../types";
import { IEvent } from "../utils/events";
import { TUserInfo } from "./types";

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

export const PostInputValueSubject = new BehaviorSubject<string>("");

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
