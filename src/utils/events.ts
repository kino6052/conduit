import { ChangeEvent } from "react";
import { Subject } from "rxjs";

export type IEvent = {
  type: string;
  slug: string;
  id?: string;
  event?: Omit<Partial<Event>, "target"> & { target: { value?: string } };
};

export const EventSubject = new Subject<IEvent>();

export const getEventTargetValue = (event: IEvent): string | undefined => {
  const _event = event.event as unknown as ChangeEvent<HTMLInputElement>;
  return _event?.target?.value;
};
