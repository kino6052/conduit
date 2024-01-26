import { TAppProps } from "../../types";
import { IEvent } from "../../utils/events";
import { IncomingEventSubject, ResultingStateSubject } from "./common.logic";

import "./article.logic";
import "./home.logic";
import "./navbar.logic";

export const logic = async (
  event: IEvent,
  state: TAppProps,
): Promise<TAppProps> => {
  IncomingEventSubject.next(event);
  const nextState = ResultingStateSubject.getValue();
  return nextState;
};
