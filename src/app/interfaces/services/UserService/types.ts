import { IUser } from "../../components/User/types";
import { TResponse } from "../../data/UserDAO/types";

export interface IUserService {
  updateUser(
    username: string,
    password: string,
    imageUrl: string,
    bio: string,
  ): Promise<void>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<IUser | undefined>;
  currentUser: string | undefined;
  signUp(username: string, password: string): Promise<TResponse>;
  signIn(value: string, value1: string): Promise<TResponse>;
  toggleFollow(username: string): Promise<boolean | undefined>;
  getUserProfile(username: string): Promise<IUser | undefined>;
}
