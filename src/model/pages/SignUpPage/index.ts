import { Field } from "../../components/Field";
import { changePage } from "../../components/Navigation";
import { IArticleDAO } from "../../data/ArticleDAO/types";
import { IUserDAO } from "../../data/UserDAO/types";
import { IAppState } from "../../types";
import { HomePage } from "../ArticlePreviewPage/HomePage";
import { EPage, IPage } from "../types";

export class SignUpPage implements IPage {
  public pageType: EPage = EPage.SignUp;
  public username: Field<string> = new Field("");
  public password: Field<string> = new Field("");

  constructor(
    public state: IAppState,
    private articleDao: IArticleDAO,
    private userDao: IUserDAO,
  ) {}

  public async initialize(): Promise<void> {
    return;
  }

  public async signUp() {
    await this.userDao.registerNewUser(
      this.username.value,
      this.password.value,
    );

    this.state.currentUsername = this.username.value;

    await changePage(new HomePage(this.state, this.articleDao), this.state);
  }
}
