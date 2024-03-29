import { BehaviorSubject, Subject, tap } from "rxjs";
import { DefaultAppProps } from "../data";
import { EPage, TAppProps } from "../types";
import { IEvent } from "../utils/events";

// Messengers
export const CurrentPageSubject = new BehaviorSubject<EPage>(EPage.Home);
export const IncomingEventSubject = new Subject<IEvent>();
export const ResultingStateSubject = new BehaviorSubject<TAppProps<EPage>>(
  DefaultAppProps,
  );
CurrentPageSubject.pipe(tap((page) => console.warn({ page }))).subscribe();
