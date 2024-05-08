import { Field } from "../../components/Field";
import { changePage, getNavigationTabs } from "../../components/Navigation";
import { ITab } from "../../components/Tab/types";
import { IArticleDAO } from "../../data/ArticleDAO/types";
import { IUserDAO } from "../../data/UserDAO/types";
import { IAppState } from "../../types";
import { HomePage } from "../ArticlePreviewPage/HomePage";
import { EPage, IPage } from "../types";

export class SignInPage implements IPage {
  public pageType: EPage = EPage.SignIn;
  public username: Field<string> = new Field("");
  public password: Field<string> = new Field("");
  public navigationTabs: ITab[] = [];

  constructor(
    public state: IAppState,
    private articleDao: IArticleDAO,
    private userDao: IUserDAO,
  ) {
    this.navigationTabs = getNavigationTabs(
      this.state,
      this.articleDao,
      this.userDao,
    );
  }

  public async initialize(): Promise<void> {
    return;
  }

  public async signIn() {
    await this.userDao.login(this.username.value, this.password.value);

    this.state.currentUsername = this.username.value;

    await changePage(
      new HomePage(this.state, this.articleDao, this.userDao),
      this.state,
    );
  }
}
