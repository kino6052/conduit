import { filter, tap } from "rxjs";
import { EArticleConstant } from "../../components/Article/constants";
import { ETagConstant } from "../../components/Tag/constants";
import { EPage } from "../../types";
import {
  CurrentPageSubject,
  IncomingEventSubject
} from "../common.logic";
import { HomePage } from "./logic";
import { EUserInfoConstant } from "../../components/UserInfo/constants";

IncomingEventSubject.pipe(
  filter((event) => event.slug === EArticleConstant.Slug),
  tap(HomePage.handleArticleClick),
).subscribe();

IncomingEventSubject.pipe(
  filter((event) => event.slug === EArticleConstant.LikeButtonSlug),
  tap(HomePage.handleArticleLike),
).subscribe();

IncomingEventSubject.pipe(
  filter((event) => event.slug === ETagConstant.Slug),
  tap(HomePage.selectTag),
).subscribe();

IncomingEventSubject.pipe(
  filter((event) => event.slug === EUserInfoConstant.UserInfoSlug),
  tap(HomePage.handleUserInfoClick),
).subscribe();

CurrentPageSubject.pipe(
  filter((page) => page === EPage.Home),
  tap(HomePage.update),
).subscribe();
