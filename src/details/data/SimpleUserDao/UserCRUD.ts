import { wait } from "../../../utils/time";
import { EStatus } from "../../constants";
import {
  IUserAuth,
  IUserCRUD,
  IUserDAO,
  IUserFollowers,
  TResponse,
  TUserInfo,
} from "../../../app/interfaces/data/UserDAO/types";
import { createProxy } from "../../../utils/oop";
import { users } from "./data";

export class UserCRUD implements IUserCRUD {
  public users: TUserInfo[];

  constructor(users: TUserInfo[]) {
    this.users = users;
  }

  public async findUserByName(username: string) {
    await wait(1000);
    return this.users.find((user) => user.username === username);
  }

  public async updateUserByName(
    username: string,
    partialUser: Partial<TUserInfo>,
  ) {
    this.users = this.users.map((user) => {
      if (user.username === username) {
        return {
          ...user,
          ...partialUser,
        };
      }
      return user;
    });
  }
}
