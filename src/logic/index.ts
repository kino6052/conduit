import { EPage, TAppProps } from "../types";
import { IEvent } from "../utils/events";
import { IncomingEventSubject, ResultingStateSubject } from "./common.logic";

import "./editArticle";
import "./home";
import "./navbar.logic";
import "./article";
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
