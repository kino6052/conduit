import { IUserDAO, TUserInfo } from "./types";

export class UserDAOTestDouble implements IUserDAO {
  private users: TUserInfo[] = [
    {
      username: "jane-lobster",
      password: "123456",
      articleIds: ["post-1"],
      date: "",
      favoriteArticleIds: [],
      followers: [],
      bio: "",
    },
  ];

  public async findUserByName(username: string) {
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

    return;
  }

  public async getFollowers(username: string) {
    const user = await this.findUserByName(username);

    if (!user) return [];

    return user.followers;
  }

  public async updateFollowers(username: string, followers: string[]) {
    const user = await this.findUserByName(username);

    if (!user) return;

    user.followers = followers;

    await this.updateUserByName(username, { followers });
  }

  public async followUserById(id: string, username: string) {
    const user = await this.findUserByName(id);

    if (!user) return;

    const followers = await this.getFollowers(user?.username);

    const hasFollowed = followers.find((id) => id === username);

    const nextLikers = [
      ...followers.filter((id) => id !== username),
      !hasFollowed && username,
    ].filter(Boolean) as string[];

    this.updateFollowers(id, nextLikers);
  }

  public async registerNewUser(username: string, password: string) {
    const alreadyRegisteredUser = this.users.find((_user) => {
      return _user.username === username;
    });

    if (alreadyRegisteredUser) throw new Error("User already exists");

    this.users.push({
      username,
      password,
      articleIds: [],
      bio: "",
      date: "",
      favoriteArticleIds: [],
      followers: [],
    });
  }

  public async login(username: string, password: string): Promise<boolean> {
    return !!this.users.find((_user) => {
      return _user.username === username;
    });
  }
}
