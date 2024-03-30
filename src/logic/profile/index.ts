import { filter, tap } from "rxjs";
import { EPage } from "../../types";
import { IncomingEventSubject, RefreshSubject } from "../common.logic";
import { AppState } from "../data/app";
import { ProfileLogic } from "./logic";
import { EProfileBannerConstant } from "../../components/Banner/ProfileBanner/constants";

RefreshSubject.pipe(
  filter(() => AppState.currentPage === EPage.Profile),
  tap(ProfileLogic.update),
).subscribe();
