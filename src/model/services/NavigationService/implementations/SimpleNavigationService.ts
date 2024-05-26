import { OverrideProps } from "../../../../utils/types";
import { EPage, IPage } from "../../../pages/types";
import { INavigationService } from "../types";

export class SimpleNavigationService implements INavigationService {
  currentPage: IPage | undefined = {
    pageType: EPage.Loading,
  };

  constructor(
    public constructors: OverrideProps<
      Partial<{
        [K in EPage]: () => Promise<IPage>;
      }>,
      Partial<{
        [EPage.Article]: (articleId: string) => Promise<IPage>;
        [EPage.EditArticle]: (articleId: string) => Promise<IPage>;
        [EPage.Profile]: (username: string) => Promise<IPage>;
      }>
    >,
  ) {}

  async navigate(page: Exclude<EPage, EPage.Article | EPage.Profile>) {
    const _constructor = this.constructors[page];
    if (!_constructor) throw new Error(`No constructor for ${page}`);
    this.currentPage = { pageType: EPage.Loading };
    this.currentPage = await _constructor();
  }

  async navigateToArticle(articleId: string) {
    this.currentPage = { pageType: EPage.Loading };
    this.currentPage = await this.constructors.Article?.(articleId);
  }

  async navigateToUserProfile(username: string) {
    this.currentPage = { pageType: EPage.Loading };
    this.currentPage = await this.constructors.Profile?.(username);
  }
}
