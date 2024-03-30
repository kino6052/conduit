import { filter, tap } from "rxjs";
import { EArticleConstant } from "../../components/Article/constants";
import { ETagConstant } from "../../components/Tag/constants";
import { EPage } from "../../types";
import { IncomingEventSubject } from "../common.logic";
import { AppState } from "../data/app";
import { HomePageLogic } from "./logic";

const HomePageIncomingEventSubject = IncomingEventSubject.pipe(
  filter(() => AppState.currentPage === EPage.Home),
);

HomePageIncomingEventSubject.pipe(
  filter((event) => event.slug === EArticleConstant.Slug),
  tap(HomePageLogic.handleArticleClick),
).subscribe();

HomePageIncomingEventSubject.pipe(
  filter((event) => event.slug === EArticleConstant.LikeButtonSlug),
  tap(HomePageLogic.handleArticleLike),
).subscribe();

HomePageIncomingEventSubject.pipe(
  filter((event) => event.slug === ETagConstant.Slug),
  tap(HomePageLogic.selectTag),
).subscribe();

HomePageIncomingEventSubject.pipe(
  filter(() => AppState.currentPage === EPage.Home),
  tap(HomePageLogic.update),
).subscribe();
