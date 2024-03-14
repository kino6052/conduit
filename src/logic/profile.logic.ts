import { filter, tap } from "rxjs";
import { DefaultData } from "../pages/ProfilePage/data";
import { EPage, TAppProps } from "../types";
import { CurrentPageSubject, ResultingStateSubject } from "./common.logic";

CurrentPageSubject.pipe(
  filter((page) => page === EPage.Profile),
  tap((page) => {
    const nextState: TAppProps<EPage.Profile> = {
      page: EPage.Profile,
      pageProps: DefaultData,
    };
    ResultingStateSubject.next(nextState);
  }),
).subscribe();
