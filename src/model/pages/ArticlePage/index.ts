import { Article } from "../../components/Article";
import { IArticle } from "../../components/Article/types";
import { Control } from "../../components/Control";
import { Field } from "../../components/Field";
import { changePage, getNavigationTabs } from "../../components/Navigation";
import { ITab } from "../../components/Tab/types";
import { IArticleDAO } from "../../data/ArticleDAO/types";
import { IUserDAO } from "../../data/UserDAO/types";
import { IAppState } from "../../types";
import { HomePage } from "../ArticlePreviewPage/HomePage";
import { EditArticlePage } from "../EditArticlePage";
import { NewArticlePage } from "../NewArticlePage";
import { SignInPage } from "../SignInPage";
import { EPage, IPage } from "../types";

export class ArticlePage implements IPage {
  public pageType: EPage = EPage.Article;
  public article: IArticle | undefined;
  public navigationTabs: ITab[];
  public comment = new Field<string>("");
  public submitCommentControl = new Control("Submit");

  constructor(
    private articleId: string,
    public state: IAppState,
    private articlesDao: IArticleDAO,
    private userDao: IUserDAO,
  ) {
    this.navigationTabs = getNavigationTabs(
      this.state,
      this.articlesDao,
      this.userDao,
    );
  }

  public async publishComment() {
    try {
      this.comment.isDisabled = true;

      if (!this.state.currentUsername) {
        await changePage(
          new SignInPage(this.state, this.articlesDao, this.userDao),
          this.state,
        );
        return;
      }

      const article = this.article;

      if (!article) {
        await changePage(
          new HomePage(this.state, this.articlesDao, this.userDao),
          this.state,
        );
        return;
      }

      if (!this.comment.value) {
        return;
      }

      await this.articlesDao.addCommentById(
        article.articleData.id,
        this.comment.value,
        this.state.currentUsername,
      );

      await this.initialize();
    } catch (e) {
      console.error(e);
      this.comment.errorMessage = "Something went wrong";
    } finally {
      this.comment.isDisabled = false;
    }
  }

  public async edit() {
    await changePage(
      new EditArticlePage(
        this.state,
        this.articlesDao,
        this.userDao,
        this.article?.articleData,
      ),
      this.state,
    );
  }

  public async deleteArticle() {
    try {
      if (!this.article) return;
      await this.articlesDao.removeArticleById(this.article?.articleData.id);
    } catch (e) {
      console.error(e);
    } finally {
      await changePage(
        new HomePage(this.state, this.articlesDao, this.userDao),
        this.state,
      );
    }
  }

  public async initialize(): Promise<void> {
    this.submitCommentControl.isDisabled = true;
    this.comment = new Field<string>("", async () => {
      this.submitCommentControl.isDisabled = !this.comment.value;
    });
    this.articlesDao.getArticleById(this.articleId).then(async (article) => {
      if (!article) return;
      this.article = new Article(
        article,
        this.state,
        this.articlesDao,
        this.userDao,
      );
      await this.article.getAuthor();
    });
  }
}
