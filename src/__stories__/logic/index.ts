import { EPage, TAppProps } from "../../types";
import { IEvent } from "../../utils/events";
import { IncomingEventSubject, ResultingStateSubject } from "./common.logic";

import "./new-article.logic";
import "./home.logic";
import "./navbar.logic";
import "./post.logic";
import "./settings-page.logic";
import "./profile.logic";

export const logic = async (
  event: IEvent,
  state: TAppProps<EPage>,
): Promise<TAppProps<EPage>> => {
  IncomingEventSubject.next(event);
  const nextState = ResultingStateSubject.getValue();
  return nextState;
};
