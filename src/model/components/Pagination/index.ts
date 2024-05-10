import { EAppConstant } from "../../constants";
import { IArticleDAO } from "../../data/ArticleDAO/types";

export class Pagination {
  public pages: {
    select: () => Promise<void>;
    isSelected: boolean;
  }[] = [];

  public get currentPageNumber() {
    return this.pages.findIndex((page) => page.isSelected) ?? 0;
  }

  public async initialize(tag?: string, username?: string, index?: number) {
    const numberOfPages = await this.articleDao.getArticlePaginationTotal({
      articlesPerPage: EAppConstant.ArticlesPerPage,
      tag,
      username,
    });

    this.pages = new Array(numberOfPages).fill(null).map((_page, i) => {
      const page = {
        isSelected: i === index,
        select: async () => {
          await this.onSelect(i);
          this.pages = this.pages.map((page, _i) => {
            return {
              ...page,
              isSelected: index === _i,
            };
          });
        },
      };

      return page;
    });
  }

  constructor(
    private onSelect: (index: number) => Promise<void>,
    private articleDao: IArticleDAO,
  ) {}
}
