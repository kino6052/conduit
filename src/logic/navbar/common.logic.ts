import { BehaviorSubject, Subject } from "rxjs";
import { DefaultAppProps } from "../../data";
import { EPage, TAppProps } from "../../types";
import { IEvent } from "../../utils/events";

export const RefreshSubject = new BehaviorSubject<unknown>({});
export const IncomingEventSubject = new Subject<IEvent>();
export const ResultingStateSubject = new BehaviorSubject<TAppProps<EPage>>(
  DefaultAppProps,
);
