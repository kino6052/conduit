import { Subject } from "rxjs";

export type IEvent = {
  type: string;
  slug: string;
  id?: string;
  payload?: string;
};

export const EventSubject = new Subject<IEvent>();
