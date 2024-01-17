import { Subject } from "rxjs";

export type Id = { slug: string; id?: string };
export type IEvent = { type: string; id: Id; payload?: string };
export const EventSubject = new Subject<IEvent>();
