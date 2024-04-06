import { filter, tap } from "rxjs";
import { EUserInfoConstant } from "../../components/UserInfo/constants";
import { IncomingEventSubject } from "../common.logic";
import { UserInfoLogic } from "./logic";

IncomingEventSubject.pipe(
  filter((e) => e.slug === EUserInfoConstant.UserInfoSlug),
  tap(UserInfoLogic.handleUserInfoClick),
).subscribe();

IncomingEventSubject.pipe(
  filter((e) => e.slug === EUserInfoConstant.FollowUserButtonSlug),
  tap(UserInfoLogic.handleFollowClick),
).subscribe();
