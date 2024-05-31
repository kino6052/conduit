import {
  IUserCRUD,
  IUserFollowers,
} from "../../../app/interfaces/data/UserDAO/types";

export class UserFollowers implements IUserFollowers {
  private userCRUD: IUserCRUD;

  constructor(userCRUD: IUserCRUD) {
    this.userCRUD = userCRUD;
  }

  public async getFollowers(username: string) {
    const user = await this.userCRUD.findUserByName(username);
    return user ? user.followers : [];
  }

  public async updateFollowers(username: string, followers: string[]) {
    const user = await this.userCRUD.findUserByName(username);
    if (user) {
      await this.userCRUD.updateUserByName(username, { followers });
    }
  }

  public async followUserById(id: string, username: string) {
    const user = await this.userCRUD.findUserByName(id);
    if (!user) return;

    const followers = await this.getFollowers(user.username);
    const hasFollowed = followers.includes(username);

    const nextFollowers = hasFollowed
      ? followers.filter((follower) => follower !== username)
      : [...followers, username];

    await this.updateFollowers(id, nextFollowers);
  }
}
