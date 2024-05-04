import { IArticle } from "../../components/Article/types";
import { Pagination } from "../../components/Pagination";
import { ITab } from "../../components/Tab/types";
import { IArticleDAO, IArticleData } from "../../data/ArticleDAO/types";
import { IAppState } from "../../types";
import { ArticlePage } from "../ArticlePage";
import { HomePage } from "./HomePage";

/**
 * This class is needed because there are multiple pages that can preview articles
 */
export class ArticlePreviewPage {
  public tags: string[] = [];
  public tabs: ITab[] = [];
  public pagination = new Pagination();
  public articles: IArticle[] = [];

  constructor(
    public state: IAppState,
    private articlesSource: IArticleDAO,
  ) {}

  public async initialize() {
    this.state.isLoading = true;

    return Promise.all([
      this.articlesSource.getArticles(),
      this.articlesSource.getAllTags(),
    ]).then(([articles, tags]) => {
      this.articles = articles.map(this.processArticleData.bind(this));
      this.tags = tags;
      this.state.isLoading = false;
    });
  }

  private processArticleData(articleData: IArticleData): IArticle {
    return {
      ...articleData,
      read: () => {
        this.state.selectedArticleId = articleData.id;
        this.state.currentPage = new ArticlePage(
          articleData.id,
          this.state,
          this.articlesSource,
        );
      },
      examineAuthor: () => {
        this.state.currentUsername = articleData.username;
        this.state.currentPage = new HomePage(this.state, this.articlesSource);
      },
      toggleLike: async () => {
        await this.articlesSource.likeArticleById(
          articleData.id,
          this.state.currentUsername,
        );
      },
    };
  }
}
