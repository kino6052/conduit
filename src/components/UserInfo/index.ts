import { withLink } from "../Link/withLink";
import { UserInfo as _UserInfo } from "./UserInfo";
import { EUserInfoConstant } from "./constants";

export const UserInfo = withLink(EUserInfoConstant.UserInfoSlug)(_UserInfo);