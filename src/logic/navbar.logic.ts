import { filter, tap } from "rxjs";
import { Tab } from "../components/Tab";
import { EPage } from "../types";
import { CurrentPageSubject, IncomingEventSubject } from "./common.logic";

IncomingEventSubject.pipe(
  filter((event) => {
    return event.slug === Tab.displayName && !!event.id;
  }),
  tap((event) => {
    if (event.id && EPage[event.id as EPage])
      CurrentPageSubject.next(event.id as EPage);
  }),
).subscribe();
