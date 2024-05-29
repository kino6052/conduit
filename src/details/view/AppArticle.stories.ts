import { SimpleArticleDao } from "../data/SimpleArticleDao";
import { SimpleUserDao } from "../data/SimpleUserDao";
import { withLogic } from "../../utils/withLogic";
import { ViewModel } from "../../app/view-model";
import { defaultComposeApp } from "..";
import { App } from "./App";

const userDao = new SimpleUserDao();
const articleDao = new SimpleArticleDao();
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
  component: withLogic(ui.onPropsChange.bind(ui))(App),
};

export const Default = {
  args: {},
};
