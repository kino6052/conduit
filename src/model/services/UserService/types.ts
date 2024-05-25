import { IUser } from "../../components/User/types";

export interface IUserService {
  currentUser: string | undefined;

  getUserProfile(username: string): Promise<IUser | undefined>;
}
