import { defaultComposeApp } from "../../..";
import { ArticleDAOTestDouble } from "../../../app/data/ArticleDAO";
import { UserDAOTestDouble } from "../../../app/data/UserDAO";
import { ArticlePage } from "../../../app/pages/ArticlePage";
import { withLogic } from "../../../utils/withLogic";
import { ViewModel } from "../../../app/view-model";
import { App as AppComponent } from "./App";

const userDao = new UserDAOTestDouble();
const articleDao = new ArticleDAOTestDouble();
const state = defaultComposeApp(articleDao, userDao);
userDao.registerNewUser("username", "password");
const ui = new ViewModel(state);

export default {
  title: "Logic/App/NewArticles",
  component: withLogic(ui.onPropsChange.bind(ui))(AppComponent),
};

export const Default = {
  args: {},
};

new Promise(async (res) => {
  state.currentUsername = "username";
  state.selectedArticleId = "test-post-1";
  const article = await articleDao.publishArticle({
    title: "Test",
    description: "Test",
    tags: ["test"],
    username: "username",
  });
  state.currentPage = new ArticlePage(article.id, state, articleDao, userDao);
  ui.refresh();
});
