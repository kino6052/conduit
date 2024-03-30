import { filter, tap } from "rxjs";
import { ETagConstant } from "../../components/Tag/constants";
import { EPage } from "../../types";
import { IncomingEventSubject, RefreshSubject } from "../common.logic";
import { AppState } from "../data/app";
import { HomePageLogic } from "./logic";

const HomePageIncomingEventSubject = IncomingEventSubject.pipe(
  filter(() => AppState.currentPage === EPage.Home),
);

HomePageIncomingEventSubject.pipe(
  filter((event) => event.slug === ETagConstant.Slug),
  tap(HomePageLogic.selectTag),
).subscribe();

RefreshSubject.pipe(
  filter(() => AppState.currentPage === EPage.Home),
  tap(HomePageLogic.update),
).subscribe();
