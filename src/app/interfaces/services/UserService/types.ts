import { IUser } from "../../../entities/components/User/types";
import { TResponse } from "../../data/UserDAO/types";

export interface IUserProfileService {
  updateUser(
    username: string,
    password: string,
    imageUrl: string,
    bio: string,
  ): Promise<void>;
  getUserProfile(username: string): Promise<IUser | undefined>;
}

export interface IUserAuthService {
  signUp(username: string, password: string): Promise<TResponse>;
  signIn(username: string, password: string): Promise<TResponse>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<IUser | undefined>;
  currentUser: string | undefined;
}

export interface IUserFollowService {
  toggleFollow(username: string): Promise<boolean | undefined>;
}

export type IUserService = IUserProfileService &
  IUserAuthService &
  IUserFollowService;
