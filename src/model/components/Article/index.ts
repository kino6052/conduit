import { IArticleDAO, IArticleData } from "../../data/ArticleDAO/types";
import { IUserDAO } from "../../data/UserDAO/types";
import { ArticlePage } from "../../pages/ArticlePage";
import { SignInPage } from "../../pages/SignInPage";
import { IAppState } from "../../types";
import { User } from "../User";
import { IArticle } from "./types";

export class Article implements IArticle {
  public hasLiked: boolean;
  public author: User;

  constructor(
    public articleData: IArticleData,
    private appState: IAppState,
    private articleDao: IArticleDAO,
    private userDao: IUserDAO,
  ) {
    this.author = new User(
      {
        articleIds: [],
        bio: "",
        date: "",
        favoriteArticleIds: [],
        followers: [],
        username: articleData.username,
      },
      this.appState,
      this.articleDao,
      this.userDao,
    );
    this.hasLiked = articleData.likers.includes(this.appState.currentUsername);
  }

  async read() {
    this.appState.selectedArticleId = this.articleData.id;
    this.appState.currentPage = new ArticlePage(
      this.articleData.id,
      this.appState,
      this.articleDao,
      this.userDao,
    );
  }

  async getAuthor() {
    try {
      this.appState.isLoading = true;
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

      this.author = user;
      return user;
    } catch (e) {
      console.error(e);
    } finally {
      this.appState.isLoading = true;
    }
  }

  async toggleLike() {
    if (!this.appState.currentUsername) {
      this.appState.currentPage = new SignInPage(
        this.appState,
        this.articleDao,
        this.userDao,
      );
      console.warn("Not logged in");
      return;
    }

    await this.articleDao.likeArticleById(
      this.articleData.id,
      this.appState.currentUsername,
    );

    const articleData = await this.articleDao.getArticleById(
      this.articleData.id,
    );

    if (!articleData) {
      console.warn(`No article data for id ${this.articleData.id}`);
      return;
    }

    this.articleData = articleData;
    this.hasLiked = articleData.likers.includes(this.appState.currentUsername);
  }
}
