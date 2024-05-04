import { filter, map, merge, tap } from "rxjs";
import { EPaginationButtonConstant } from "../../io/ui/view/components/PaginationButton/constants";
import { ETagConstant } from "../../io/ui/view/components/Tag/constants";
import { EPage } from "../../io/ui/view/types";
import {
  IncomingEventSubject,
  RefreshSubject,
  propagateState,
  refresh,
} from "../common.logic";
import { AppState } from "../data/app";
import { HomePage } from "./logic";

const HomePageIncomingEventSubject = IncomingEventSubject.pipe(
  filter(() => AppState.currentPage === EPage.Home),
);

merge(
  HomePageIncomingEventSubject.pipe(
    filter((event) => event.slug === ETagConstant.Slug),
    tap(HomePage.selectTag),
  ),
  HomePageIncomingEventSubject.pipe(
    filter((event) => event.slug === EPaginationButtonConstant.Slug),
    tap(HomePage.paginate),
  ),
)
  .pipe(tap(refresh))
  .subscribe();

RefreshSubject.pipe(
  filter(() => AppState.currentPage === EPage.Home),
  map(HomePage.update),
  tap(propagateState),
).subscribe();
