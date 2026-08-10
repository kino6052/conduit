import { Control } from "../Control";
import { IUser } from "../User/types";
import { EFollowControlText } from "./constants";

export class FollowControl extends Control {
  constructor(user: IUser) {
    super("", async () => {
      await user.toggleFollowBy();
      this.setText(user.isFollowedByUs);
    });

    this.setText(user.isFollowedByUs);
  }

  private setText(isFollowing: boolean) {
    this.text = isFollowing
      ? EFollowControlText.Unfollow
      : EFollowControlText.Follow;
  }
}
