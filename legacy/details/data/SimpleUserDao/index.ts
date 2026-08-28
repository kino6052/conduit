import { IUserDAO } from "../../../app/interfaces/data/UserDAO/types";
import { createProxy } from "../../../utils/oop";
import { UserAuth } from "./UserAuth";
import { UserCRUD } from "./UserCRUD";
import { UserFollowers } from "./UserFollowers";
import { users } from "./data";

export class SimpleUserDAO {
  protected constructor() {}

  static create() {
    const userCRUD = new UserCRUD(users);
    const userFollowers = new UserFollowers(userCRUD);
    const userAuth = new UserAuth(userCRUD);

    return createProxy<IUserDAO>([userCRUD, userFollowers, userAuth]);
  }
}
