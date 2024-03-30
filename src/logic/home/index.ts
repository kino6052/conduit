import { filter, tap } from "rxjs";
import { EArticleConstant } from "../../components/Article/constants";
import { ETagConstant } from "../../components/Tag/constants";
import { EPage } from "../../types";
import { IncomingEventSubject, RefreshSubject } from "../common.logic";
import { HomePageLogic } from "./logic";
import { EUserInfoConstant } from "../../components/UserInfo/constants";
import { AppState } from "../data/app";

IncomingEventSubject.pipe(
  filter((event) => event.slug === EArticleConstant.Slug),
  tap(HomePageLogic.handleArticleClick),
).subscribe();

IncomingEventSubject.pipe(
  filter((event) => event.slug === EArticleConstant.LikeButtonSlug),
  tap(HomePageLogic.handleArticleLike),
).subscribe();

IncomingEventSubject.pipe(
  filter((event) => event.slug === ETagConstant.Slug),
  tap(HomePageLogic.selectTag),
).subscribe();

RefreshSubject.pipe(
  filter(() => AppState.currentPage === EPage.Home),
  tap(HomePageLogic.update),
).subscribe();
