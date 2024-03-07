import { ArticlePage } from "../pages/ArticlePage";
import { HomePage } from "../pages/HomePage";
import { NewPostPage } from "../pages/NewPostPage";
import { EPage, TAppProps, TPagePropsMap } from "../types";

export type TPageMap = {
  [key in EPage]: React.FC<TPagePropsMap[key]>;
};

export const pagesMap = {} as TPageMap;

pagesMap[EPage.Home] = HomePage;
pagesMap[EPage.Article] = ArticlePage;
pagesMap[EPage.NewPostPage] = NewPostPage;

export function getPropsFromStateSafely<T extends EPage>(
  page: T,
  state: TAppProps<EPage>,
): TAppProps<T> | undefined {
  if (state.page === page) return state as TAppProps<T>;

  return;
}
