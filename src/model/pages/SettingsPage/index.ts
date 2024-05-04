import { Field } from "../../components/Field";
import { changePage } from "../../components/Navigation";
import { IArticleDAO } from "../../data/ArticleDAO/types";
import { IUserDAO } from "../../data/UserDAO/types";
import { IAppState } from "../../types";
import { HomePage } from "../ArticlePreviewPage/HomePage";
import { EPage, IPage } from "../types";

export class SettingsPage implements IPage {
  public pageType: EPage = EPage.Settings;
  public username: Field<string> = new Field("");
  public password: Field<string> = new Field("");
  public imageSrc: Field<string> = new Field("");
  public bio: Field<string> = new Field("");

  constructor(
    public state: IAppState,
    private articleDao: IArticleDAO,
    private userDao: IUserDAO,
  ) {}

  public async initialize(): Promise<void> {
    const user = await this.userDao.findUserByName(this.state.currentUsername);

    if (!user) return;

    this.username = new Field(user.username);
    this.password = new Field(user.password ?? "");
    this.imageSrc = new Field(user.imageSrc ?? "");
    this.bio = new Field(user.bio ?? "");

    return;
  }

  public async saveChanges() {
    await this.userDao.updateUserByName(this.state.currentUsername, {
      username: this.username.value,
      password: this.password.value,
      imageSrc: this.imageSrc.value,
      bio: this.bio.value,
    });

    await changePage(new HomePage(this.state, this.articleDao), this.state);
  }
}
