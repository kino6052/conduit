import { combineLatest, filter, map, tap } from "rxjs";
import { ETagConstant } from "../../components/Tag/constants";
import { EPage } from "../../types";
import {
  IncomingEventSubject,
  RefreshSubject,
  ResultingStateSubject,
} from "../navbar/common.logic";
import { AppState } from "../data/app";
import { HomePageLogic } from "./logic";

const HomePageIncomingEventSubject = IncomingEventSubject.pipe(
  filter(() => AppState.currentPage === EPage.Home),
);

combineLatest([
  HomePageIncomingEventSubject.pipe(
    filter((event) => event.slug === ETagConstant.Slug),
    tap(HomePageLogic.selectTag),
  ),
])
  .pipe(
    tap(() => {
      RefreshSubject.next({});
    }),
  )
  .subscribe();

RefreshSubject.pipe(
  filter(() => AppState.currentPage === EPage.Home),
  map(HomePageLogic.update),
  tap((nextState) => ResultingStateSubject.next(nextState)),
).subscribe();
