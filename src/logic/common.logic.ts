import { BehaviorSubject, Subject, tap } from "rxjs";
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

// Messengers
export const IncomingEventSubject = new Subject<IEvent>();
export const ResultingStateSubject = new BehaviorSubject<TAppProps<EPage>>(
  DefaultAppProps,
);
