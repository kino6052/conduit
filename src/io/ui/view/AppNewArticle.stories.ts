import { initializeAppState } from "../../../model";
import { ArticleDAOTestDouble } from "../../../model/data/ArticleDAO";
import { UserDAOTestDouble } from "../../../model/data/UserDAO";
import { ArticlePage } from "../../../model/pages/ArticlePage";
import { withLogic } from "../../../utils/withLogic";
import { UI } from "../store";
import { App as AppComponent } from "./App";

const userDao = new UserDAOTestDouble();
const articleDao = new ArticleDAOTestDouble();
const state = initializeAppState(articleDao, userDao);
userDao.registerNewUser("username", "password");
const ui = new UI(state);

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
