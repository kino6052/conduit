import { Subject } from "rxjs";

export type IEvent = {
  type: string;
  slug: string;
  id?: string;
  event?: Event;
};

export const EventSubject = new Subject<IEvent>();
