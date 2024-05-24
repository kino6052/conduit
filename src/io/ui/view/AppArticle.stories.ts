import { defaultComposeApp } from "../../../model";
import { ArticleDAOTestDouble } from "../../../model/data/ArticleDAO";
import { UserDAOTestDouble } from "../../../model/data/UserDAO";
import { ArticlePage } from "../../../model/pages/ArticlePage";
import { withLogic } from "../../../utils/withLogic";
import { ViewModel } from "../view-model";
import { App as AppComponent } from "./App";

const userDao = new UserDAOTestDouble();
const articleDao = new ArticleDAOTestDouble();
const state = defaultComposeApp(articleDao, userDao);
userDao.registerNewUser("username", "password");
state.currentUsername = "username";
state.selectedArticleId = "test-post-1";
state.currentPage = new ArticlePage(
  state.selectedArticleId,
  state,
  articleDao,
  userDao,
);
const ui = new ViewModel(state);

export default {
  title: "Logic/App/Articles",
  component: withLogic(ui.onPropsChange.bind(ui))(AppComponent),
};

export const Default = {
  args: {},
};
