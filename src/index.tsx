import { render } from "./details/ui/view";
import { defaultComposeApp } from "./app";
import { EPage } from "./app/pages/types";
import { generateHomePageProps } from "./details/ui/view/pages/HomePage/store/selectors";
import { generateLoadingPageProps } from "./details/ui/view/selectors";
import { generateProfilePageProps } from "./details/ui/view/pages/ProfilePage/store/selectors";
import { generateArticlePageProps } from "./details/ui/view/pages/ArticlePage/store/selectors";

export const propsMap = {
  [EPage.Home]: generateHomePageProps,
  [EPage.Loading]: generateLoadingPageProps,
  [EPage.Profile]: generateProfilePageProps,
  [EPage.Article]: generateArticlePageProps,
};

const viewModel = defaultComposeApp(propsMap);

render(viewModel.onPropsChange.bind(viewModel));
