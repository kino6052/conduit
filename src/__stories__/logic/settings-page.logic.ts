import { filter, tap } from "rxjs";
import { DefaultData } from "../../pages/SettingsPage/data";
import { EPage, TAppProps } from "../../types";
import { CurrentPageSubject, ResultingStateSubject } from "./common.logic";

CurrentPageSubject.pipe(
  filter((page) => page === EPage.Settings),
  tap((page) => {
    const nextState: TAppProps<EPage.Settings> = {
      page: EPage.Settings,
      pageProps: DefaultData,
    };
    ResultingStateSubject.next(nextState);
  }),
).subscribe();
