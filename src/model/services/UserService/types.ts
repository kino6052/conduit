import { IUser } from "../../components/User/types";
import { TResponse } from "../../data/UserDAO/types";

export interface IUserService {
  currentUser: string | undefined;
  signIn(value: string, value1: string): Promise<TResponse>;
  toggleFollow(username: string): Promise<boolean | undefined>;
  getUserProfile(username: string): Promise<IUser | undefined>;
}
