import { filter, tap } from "rxjs";
import { ETabConstant } from "../components/Tab/constants";
import { EPage } from "../types";
import {
  CurrentPageSubject,
  IncomingEventSubject,
} from "./common.logic";
import { AppState } from "./data/app";
import { UserDatabase } from "./data/user";

IncomingEventSubject.pipe(
  filter((event) => {
    return (
      event.slug === ETabConstant.Slug &&
      !!event.id &&
      !!EPage[event.id as EPage]
    );
  }),
  tap((event) => {
    const username = AppState.currentUserId;

    
    if (event.id === EPage.Profile && username) {
      const userInfo = UserDatabase.findUserByName(username);
      
      AppState.currentUserId = userInfo?.username;
    }

    CurrentPageSubject.next(event.id as EPage);
  }),
).subscribe();
