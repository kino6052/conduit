import {
  IUserAuth,
  IUserCRUD,
  TResponse,
} from "../../../app/interfaces/data/UserDAO/types";
import { EStatus } from "../../constants";

export class UserAuth implements IUserAuth {
  private userCRUD: IUserCRUD;

  constructor(userCRUD: IUserCRUD) {
    this.userCRUD = userCRUD;
  }

  public async registerNewUser(
    username: string,
    password: string,
  ): Promise<TResponse> {
    const alreadyRegisteredUser = await this.userCRUD.findUserByName(username);
    if (alreadyRegisteredUser) {
      return {
        status: EStatus.Failure,
        errors: { username: "Username already taken" },
      };
    }

    this.userCRUD.users.push({
      username,
      password,
      articleIds: [],
      bio: "",
      date: "",
      favoriteArticleIds: [],
      followers: [],
      imageSrc: "https://m.media-amazon.com/images/I/61f4m+gKf1L.jpg",
    });

    return { status: EStatus.Success };
  }

  public async login(username: string, password: string): Promise<TResponse> {
    const user = await this.userCRUD.findUserByName(username);
    if (!user || user.password !== password) {
      return {
        status: EStatus.Failure,
        errors: { password: "Wrong username or password" },
      };
    }
    return { status: EStatus.Success };
  }
}
