import { IUser } from "../../components/User/types";

export interface IUserService {
  toggleFollow(username: string): Promise<boolean | undefined>;
  currentUser: string | undefined;

  getUserProfile(username: string): Promise<IUser | undefined>;
}
