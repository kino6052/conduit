import { filter, tap } from "rxjs";
import { ETabConstant } from "../../io/ui/view/components/Tab/constants";
import { EPage } from "../../types";
import { IncomingEventSubject } from "../common.logic";
import { AppState } from "../data/app";
import { UserDatabase } from "../data/user";
import { updatePage } from "../utils/utils";

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

      AppState.selectedUserId = userInfo?.username;
    }

    updatePage(event.id as EPage);
  }),
).subscribe();
