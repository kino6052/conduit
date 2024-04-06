import { combineLatest, filter, map, tap, switchMap, merge } from "rxjs";
import { ETagConstant } from "../../components/Tag/constants";
import { EPage } from "../../types";
import {
  IncomingEventSubject,
  RefreshSubject,
  refresh,
  propagateState,
} from "../common.logic";
import { AppState } from "../data/app";
import { HomePageLogic } from "./logic";
import { EPaginationButtonConstant } from "../../components/PaginationButton/constants";

const HomePageIncomingEventSubject = IncomingEventSubject.pipe(
  filter(() => AppState.currentPage === EPage.Home),
);

merge(
  HomePageIncomingEventSubject.pipe(
    filter((event) => event.slug === ETagConstant.Slug),
    tap(HomePageLogic.selectTag),
  ),
  HomePageIncomingEventSubject.pipe(
    filter((event) => event.slug === EPaginationButtonConstant.Slug),
    tap(HomePageLogic.paginate),
  ),
)
  .pipe(tap(refresh))
  .subscribe();

RefreshSubject.pipe(
  filter(() => AppState.currentPage === EPage.Home),
  map(HomePageLogic.update),
  tap(propagateState),
).subscribe();
