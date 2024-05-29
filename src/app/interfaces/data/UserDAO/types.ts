import { EStatus } from "../../../../details/constants";

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

export interface IUserDAO {
  findUserByName(username: string): Promise<TUserInfo | undefined>;

  updateUserByName(
    username: string,
    partialUser: Partial<TUserInfo>,
  ): Promise<void>;

  getFollowers(username: string): Promise<string[]>;

  updateFollowers(username: string, followers: string[]): Promise<void>;

  followUserById(id: string, username: string): Promise<void>;

  registerNewUser(username: string, password: string): Promise<TResponse>;

  login(username: string, password: string): Promise<TResponse>;
}
