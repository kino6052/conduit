import { Article } from "../../../components/Article";
import { ExclusiveSelector } from "../../../components/Selector/ExclusiveSelector";
import { ContentTab } from "../../../components/Tab";
import { ITab } from "../../../components/Tab/types";
import { EAppConstant } from "../../../constants";
import { IArticleDAO } from "../../../data/ArticleDAO/types";
import { ETab } from "../../../pages/ArticlePreviewPage/constants";
import { EPage } from "../../../pages/types";
import { INavigationService } from "../../NavigationService/types";
import { IUserService } from "../../UserService/types";
import { IArticleService } from "../types";

export class SimpleArticleService implements IArticleService {
  constructor(
    private articleDao: IArticleDAO,
    private navigationService: INavigationService,
    private userService: IUserService,
  ) {}

  async getDataForPagination(
    pageIndex?: number,
    tag?: string,
    username?: string,
  ) {
    return Promise.all([
      this.articleDao.getAllTags(),
      this.articleDao.getArticlePaginationTotal({
        articlesPerPage: EAppConstant.ArticlesPerPage,
        tag,
        username,
      }),
      this.articleDao.getArticlesByPagination({
        tag,
        index: pageIndex,
        username,
      }),
    ]).then(([tags, numberOfPages, articles]) => ({
      tags: this.mapTags(tags),
      pagination: new ExclusiveSelector(
        new Array(numberOfPages).fill(0).map((_, index) => ({
          isSelected: index === pageIndex,
          select: async () => {
            await this.getDataForPagination(index, tag, username);
          },
          id: `${index}`,
        })),
      ),
      articles: articles.map((articleData) => new Article(articleData, this)),
      tabs: this.mapTabs(tag),
    }));
  }

  private mapTags(tag: string, tags: string[]) {
    return new ExclusiveSelector(
      tags.map((_tag) => ({
        isSelected: _tag === tag,
        select: async () => {
          this.getDataForPagination(0, _tag);
        },
        id: _tag,
      })),
    );
  }

  private mapTabs(tag?: string) {
    return new ExclusiveSelector(
      [
        new ContentTab(
          "Global Feed",
          ETab.GlobalFeed,
          this.selectTab.bind(this),
          true,
        ),

        this.userService.currentUser &&
          new ContentTab("Your Feed", ETab.YourFeed, this.selectTab.bind(this)),

        tag && new ContentTab(tag, ETab.Tag, async () => {}),
      ].filter(Boolean) as ITab[],
    );
  }

  public async examineAuthor(username: string) {
    this.navigationService.navigateToUserProfile(username);
  }

  public async likeArticleById(id: string) {
    const username = this.userService.currentUser;

    if (!username) {
      await this.navigationService.navigate(EPage.SignIn);
      return;
    }

    await this.articleDao.likeArticleById(id, username);
  }

  public async readArticle(articleId: string) {
    await this.navigationService.navigateToArticle(articleId);
  }

  public async selectTab(tabId: ETab) {
    if (tabId === ETab.YourFeed)
      return this.getDataForPagination(
        0,
        undefined,
        this.userService.currentUser,
      );
    this.getDataForPagination();
  }

  public async selectTag(tag: string) {
    return this.getDataForPagination(0, tag);
  }
}
