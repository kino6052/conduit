import { EPage } from "../../io/ui/view/types";
import { IArticleSource } from "../data/article/types";
import { ArticlePage, HomePage } from "../home/logic";
import { IAppState } from "../types";

export type TPageMap = {
  [EPage.Home]: HomePage;
};

// export const providePagesMapWithDependencies = (dependencies: {
//   state: IAppState;
//   articleSource: IArticleSource;
// }): TPageMap => ({
//   [EPage.Home]: new HomePage(dependencies.state, dependencies.articleSource),
//   [EPage.Article]: new ArticlePage(
//     dependencies.state,
//     dependencies.articleSource,
//   ),
// });
