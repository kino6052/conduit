import { TUserInfo } from "../types";

export class UserDatabase {
  private static users: TUserInfo[] = [
    {
      username: "jane-lobster",
      password: "123456",
      articleIds: ["post-1"],
      date: "",
      favoriteArticleIds: [],
    },
  ];

  public static findUserByName(username: string) {
    return this.users.find((user) => user.username === username);
  }

  public static updateUserByName(
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

    return this.findUserByName(partialUser.username || username);
  }

  public static registerNewUser(user: TUserInfo) {
    const alreadyRegisteredUser = this.users.find((_user) => {
      return _user.username === user.username;
    });

    if (alreadyRegisteredUser) throw new Error("User already exists");

    this.users.push(user);
  }
}
