import { BehaviorSubject, tap } from "rxjs";
import { TAppProps } from "../view/types";
import { IUI } from "./types";
import { generateHomePageProps } from "../view/pages/HomePage/store/selectors";
import { generateArticlePageProps } from "../view/pages/ArticlePage/store/selectors";
import { EPage } from "../../../model/pages/types";
import { generateNewArticlePageProps } from "../view/pages/EditArticlePage/store/selectors";
import { IAppState } from "../../../model/types";
import { generateProfilePageProps } from "../view/pages/ProfilePage/store/selectors";

const propsMap = {
  [EPage.Home]: generateHomePageProps,
  [EPage.Article]: generateArticlePageProps,
  [EPage.NewArticle]: generateNewArticlePageProps,
  [EPage.Profile]: generateProfilePageProps,
  [EPage.Settings]: 
};

export class UI implements IUI {
  private PropsSubject = new BehaviorSubject<TAppProps<EPage> | undefined>(
    undefined,
  );

  constructor(private state: IAppState) {
    this.refresh();
  }

  /**
   * This method allows to subscribe to changes (required for the view to pick up the changes)
   */
  public onPropsChange(cb: (props: TAppProps<EPage> | undefined) => void) {
    this.PropsSubject.pipe(tap(cb)).subscribe();
  }

  /**
   * This is the pure function that generates props from the store.
   * This is what is required for testing
   */
  public static generateProps(
    state: IAppState,
    refresh?: () => void,
  ): TAppProps<EPage> {
    const page = state.currentPage?.pageType || EPage.Home;
    return propsMap[page](state, refresh);
  }

  refresh() {
    const nextProps = UI.generateProps(this.state, this.refresh.bind(this));

    this.PropsSubject.next(nextProps);
  }
}
