import { combineLatest, filter, tap } from "rxjs";
import { ETabsPanelConstant } from "../../components/Tabs/constants";
import { IncomingEventSubject, RefreshSubject, refresh } from "../common.logic";
import { TabsLogic } from "./logic";

combineLatest([
  IncomingEventSubject.pipe(
    filter((e) =>
      [
        ETabsPanelConstant.GeneralTabId,
        ETabsPanelConstant.PersonalTabId,
      ].includes(e.id as ETabsPanelConstant),
    ),
    tap(TabsLogic.handleTabClick),
  ),
])
  .pipe(tap(refresh))
  .subscribe();
