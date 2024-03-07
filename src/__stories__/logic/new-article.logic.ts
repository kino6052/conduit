import { filter, tap } from "rxjs";
import { DefaultData } from "../../pages/NewPostPage/data";
import { EPage, TAppProps } from "../../types";
import { CurrentPageSubject, ResultingStateSubject } from "./common.logic";

CurrentPageSubject.pipe(
  filter((page) => page === EPage.NewPostPage),
  tap((page) => {
    const nextState: TAppProps<EPage.NewPostPage> = {
      page: EPage.NewPostPage,
      pageProps: DefaultData,
    };
    ResultingStateSubject.next(nextState);
  }),
).subscribe();
