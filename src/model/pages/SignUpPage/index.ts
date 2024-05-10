import { Field } from "../../components/Field";
import { changePage, getNavigationTabs } from "../../components/Navigation";
import { ITab } from "../../components/Tab/types";
import { EStatus } from "../../constants";
import { IArticleDAO } from "../../data/ArticleDAO/types";
import { IUserDAO } from "../../data/UserDAO/types";
import { IAppState } from "../../types";
import { HomePage } from "../ArticlePreviewPage/HomePage";
import { EPage, IPage } from "../types";

export class SignUpPage implements IPage {
  public pageType: EPage = EPage.SignUp;
  public username: Field<string> = new Field("");
  public password: Field<string> = new Field("");
  public navigationTabs: ITab[] = [];

  constructor(
    public state: IAppState,
    private articleDao: IArticleDAO,
    private userDao: IUserDAO,
  ) {
    this.navigationTabs = getNavigationTabs(state, articleDao, userDao);
  }

  public async initialize(): Promise<void> {
    return;
  }

  public async signUp() {
    try {
      this.state.isLoading = true;
      const result = await this.userDao.registerNewUser(
        this.username.value,
        this.password.value,
      );

      if (result.status === EStatus.Failure) {
        result.errors?.forEach((error) => {
          switch (error.field) {
            case "username":
              this.username.errorMessage = error.message;
              break;
            case "password":
              this.password.errorMessage = error.message;
              break;
          }
        });

        return;
      }

      this.state.currentUsername = this.username.value;

      await changePage(
        new HomePage(this.state, this.articleDao, this.userDao),
        this.state,
      );
    } catch (e) {
      console.error(e);
    } finally {
      this.state.isLoading = false;
    }
  }
}
