import { Subject } from 'rxjs';

export type Id = { id: string; uuid?: string };
export type IEvent = { type: string; id: Id; payload?: string };
export const EventSubject = new Subject<IEvent>();