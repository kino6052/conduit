import { EStatus } from "../../../../details/constants";
import { IUser } from "../../../entities/components/User/types";

export type TUserInfo = {
  date: string;
  username: string;
  bio: string;
  password?: string;
  imageSrc?: string;
  articleIds: string[];
  favoriteArticleIds: string[];
  followers: string[];
};

export type TResponse = {
  status: EStatus;
  errors?: {
    [field: string]: string;
  };
};

// User CRUD Operations
export interface IUserCRUD {
  users: TUserInfo[];
  findUserByName(username: string): Promise<TUserInfo | undefined>;
  updateUserByName(
    username: string,
    partialUser: Partial<TUserInfo>,
  ): Promise<void>;
}

// User Follower Operations
export interface IUserFollowers {
  getFollowers(username: string): Promise<string[]>;
  updateFollowers(username: string, followers: string[]): Promise<void>;
  followUserById(id: string, username: string): Promise<void>;
}

// User Authentication Operations
export interface IUserAuth {
  registerNewUser(username: string, password: string): Promise<TResponse>;
  login(username: string, password: string): Promise<TResponse>;
}

// Combining all interfaces into a single type for convenience
export type IUserDAO = IUserCRUD & IUserFollowers & IUserAuth;
