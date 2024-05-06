import { IArticleDAO, IArticleData } from "../../data/ArticleDAO/types";
import { IUserDAO } from "../../data/UserDAO/types";
import { ArticlePage } from "../../pages/ArticlePage";
import { IAppState } from "../../types";
import { User } from "../User";
import { IArticle } from "./types";

export class Article implements IArticle {
  constructor(
    public articleData: IArticleData,
    private appState: IAppState,
    private articleDao: IArticleDAO,
    private userDao: IUserDAO,
  ) {}

  async read() {
    this.appState.selectedArticleId = this.articleData.id;
    this.appState.currentPage = new ArticlePage(
      this.articleData.id,
      this.appState,
      this.articleDao,
    );
  }

  async getAuthor() {
    const userData = await this.userDao.findUserByName(
      this.articleData.username,
    );

    if (!userData) return;

    const user = new User(
      userData,
      this.appState,
      this.articleDao,
      this.userDao,
    );

    return user;
  }

  async toggleLike() {
    await this.articleDao.likeArticleById(
      this.articleData.id,
      this.appState.currentUsername,
    );

    const articleData = await this.articleDao.getArticleById(
      this.articleData.id,
    );

    if (!articleData) return;

    this.articleData = articleData;
  }
}
