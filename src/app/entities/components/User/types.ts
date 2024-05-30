import { TUserInfo } from "../../../interfaces/data/UserDAO/types";

export interface IUser {
  isFollowedByUs: boolean;
  userInfo: TUserInfo;
  toggleFollowBy: () => Promise<void>;
  examine: () => Promise<void>;
}
