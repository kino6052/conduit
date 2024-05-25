import { wait } from "../../../utils/time";
import { EStatus } from "../../constants";
import { IUserDAO, TResponse, TUserInfo } from "./types";

export class UserDAOTestDouble implements IUserDAO {
  constructor() {}

  private users: TUserInfo[] = [
    {
      username: "jane-lobster",
      password: "123456",
      articleIds: ["post-1"],
      date: "",
      favoriteArticleIds: [],
      followers: [],
      bio: "",
      imageSrc: "https://c.tenor.com/lhuFqfMRxvEAAAAd/tenor.gif",
    },
  ];

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
    const alreadyRegisteredUser = await this.findUserByName(username);

    if (alreadyRegisteredUser) {
      return {
        status: EStatus.Failure,
        errors: [
          {
            field: "username",
            message: "Username already taken",
          },
        ],
      };
    }

    this.users.push({
      username,
      password,
      articleIds: [],
      bio: "",
      date: "",
      favoriteArticleIds: [],
      followers: [],
      imageSrc: "https://m.media-amazon.com/images/I/61f4m+gKf1L.jpg",
    });

    return {
      status: EStatus.Success,
    };
  }

  public async login(username: string, password: string): Promise<TResponse> {
    const user = await this.findUserByName(username);

    if (!user || user.password !== password)
      return {
        status: EStatus.Failure,
        errors: [
          {
            field: "password",
            message: "Wrong username or password", // TODO: Use content
          },
        ],
      };

    return {
      status: EStatus.Success,
    };
  }
}
