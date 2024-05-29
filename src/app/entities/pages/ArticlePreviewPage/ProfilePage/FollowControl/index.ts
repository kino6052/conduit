import { Control } from "../../../../components/Control";
import { IUser } from "../../../../components/User/types";
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
      ? EFollowControlText.Follow
      : EFollowControlText.Unfollow;
  }
}
