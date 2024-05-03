import { EPage } from "../../types";
import { IArticleSource } from "../data/article/types";
import { HomePage } from "../home/logic";
import { INavbar } from "../types";

export type TPageMap = {
  [EPage.Home]: HomePage;
};

export const providePagesMapWithDependencies = (dependencies: {
  navbar: INavbar;
  articleSource: IArticleSource;
}): TPageMap => ({
  [EPage.Home]: new HomePage(dependencies.navbar, dependencies.articleSource),
});
