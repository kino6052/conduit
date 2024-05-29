import { SimpleArticleDao } from "../../data/SimpleArticleDao";
import { SimpleUserDao } from "../../data/SimpleUserDao";
import { withLogic } from "../../../utils/withLogic";
import { ViewModel } from "../../../app/view-model";
import { App as AppComponent } from "./App";
import { defaultComposeApp } from "../..";

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
  component: withLogic(ui.onPropsChange.bind(ui))(AppComponent),
};

export const Default = {
  args: {},
};
