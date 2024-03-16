import { filter, tap } from "rxjs";
import { ETabConstant } from "../components/Tab/constants";
import { EPage } from "../types";
import {
  CurrentPageSubject,
  IncomingEventSubject,
  SelectedUserInfoSubject,
  UserInfoSubject,
} from "./common.logic";

IncomingEventSubject.pipe(
  filter((event) => {
    return (
      event.slug === ETabConstant.Slug &&
      !!event.id &&
      !!EPage[event.id as EPage]
    );
  }),
  tap((event) => {
    const userInfo = UserInfoSubject.getValue();

    if (event.id === EPage.Profile && userInfo) {
      SelectedUserInfoSubject.next(userInfo);
    }

    if (event) CurrentPageSubject.next(event.id as EPage);
  }),
).subscribe();
