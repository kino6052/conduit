import { filter, tap } from "rxjs";
import { EPage } from "../../types";
import { RefreshSubject } from "../common.logic";
import { AppState } from "../data/app";
import { ProfileLogic } from "./logic";

RefreshSubject.pipe(
  filter(() => AppState.currentPage === EPage.Profile),
  tap(ProfileLogic.update),
).subscribe();
