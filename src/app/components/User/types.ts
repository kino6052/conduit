import { TUserInfo } from "../../data/UserDAO/types";

export interface IUser {
  isFollowedByUs: boolean;
  userInfo: TUserInfo;
  toggleFollowBy: () => Promise<void>;
  examine: () => Promise<void>;
}
