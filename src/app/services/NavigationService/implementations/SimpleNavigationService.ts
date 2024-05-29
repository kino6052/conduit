import { OverrideProps } from "../../../../utils/types";
import { EPage, IPage } from "../../../pages/types";
import { IUserContext } from "../../UserContext/types";
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
    private userContext: IUserContext,
  ) {}

  async navigate(page: Exclude<EPage, EPage.Article | EPage.Profile>) {
    const _constructor = this.constructors[page];
    if (!_constructor) throw new Error(`No constructor for ${page}`);
    this.currentPage = { pageType: EPage.Loading };
    console.warn({ page, _constructor });
    this.currentPage = await _constructor();
  }

  async navigateToArticle(articleId: string, isEditing?: boolean) {
    this.currentPage = { pageType: EPage.Loading };

    if (isEditing) {
      this.currentPage = await this.constructors.EditArticle?.(articleId);
      return;
    }

    this.currentPage = await this.constructors.Article?.(articleId);
  }

  async navigateToUserProfile(username: string) {
    this.currentPage = { pageType: EPage.Loading };
    this.currentPage = await this.constructors.Profile?.(username);
  }

  getNavigationTabs() {
    const isLoggedIn = !!this.userContext.currentUsername;

    return [
      EPage.Home,
      isLoggedIn && EPage.NewArticle,
      isLoggedIn && EPage.Settings,
      !isLoggedIn && EPage.SignIn,
      !isLoggedIn && EPage.SignUp,
    ].filter(Boolean) as EPage[];
  }
}
